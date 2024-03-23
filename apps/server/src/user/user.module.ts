import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from 'src/common/supabase/supabase.module';

@Module({
  imports: [ConfigModule.forRoot(), SupabaseModule],
  controllers: [UserController],
})
export class UserModule {}
