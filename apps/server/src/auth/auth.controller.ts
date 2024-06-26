import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthType, CommonType } from '@repo/global-type';
import { JwtAuthGuard } from '../infra/jwt/jwt-auth.guard';
import { AuthPayload } from 'src/types/auth.type';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({
    summary: '회원 가입 및 로그인',
    description: '회원 가입 및 로그인',
  })
  @ApiCreatedResponse({
    description: 'token 발급 완료',
    schema: {
      properties: {
        token: {
          type: 'string',
          description: 'JWT 토큰',
        },
      },
    },
  })
  async sigInUser(
    @Body()
    userData: {
      authType: string;
      authId: string;
      name: string;
      email: string;
    },
  ): Promise<AuthType.ResLogin> {
    let user = await this.authService.getUser({
      auth_type: userData.authType,
      auth_id: userData.authId,
    });
    if (user === null) {
      user = await this.authService.createUser({
        auth_type: userData.authType,
        auth_id: userData.authId,
        name: userData.name,
        email: userData.email,
      });
    }

    return {
      token: await this.authService.signIn({
        id: user.id,
        authId: user.auth_id,
      }),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: '유저 정보 가져오기',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT 토큰',
    example: 'Bearer asdfasdf',
  })
  @ApiOkResponse({
    description: '유저 프로필 조회 및 토큰 재발급',
    schema: {
      properties: {
        id: {
          type: 'number',
          description: '유저 Id',
        },
        email: {
          type: 'string',
          description: '이메일',
        },
        name: {
          type: 'string',
          description: '유저 이름',
        },
        token: {
          type: 'string',
          description: 'JWT 토큰',
        },
      },
    },
  })
  async getUser(@Request() req): Promise<AuthType.Profile> {
    const { id } = req.user as AuthPayload;
    const user = await this.authService.getUser({
      id: id,
    });
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token: await this.authService.signIn({
        id: user.id,
        authId: user.auth_id,
      }),
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT 토큰',
    example: 'Bearer asdfasdf',
  })
  @ApiBody({
    schema: {
      properties: {
        pushToken: {
          type: 'string',
          description: 'push token',
        },
      },
    },
  })
  @ApiOkResponse({
    description: '유저 프로필 조회 및 토큰 재발급',
    schema: {
      properties: {
        success: {
          type: 'boolean',
          description: '성공 여부',
        },
      },
    },
  })
  @Patch('push')
  async patchPushToken(
    @Request() req,
    @Body('pushToken') pushToken: string,
  ): Promise<CommonType.ResOk> {
    const { id } = req.user as AuthPayload;
    await this.authService.patchUser(
      {
        id: id,
      },
      {
        push_token: pushToken,
      },
    );

    return { success: true };
  }
}
