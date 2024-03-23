import { Controller, Post } from '@nestjs/common';
import { Supabase } from '../common/supabase/supabase';

@Controller('users')
export class UserController {
  constructor(private readonly supabaseService: Supabase) {}

  @Post('kakao')
  async createKakaoUser() {
    const supabase = this.supabaseService.getClient();
    return await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    });
  }
}
