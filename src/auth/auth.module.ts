import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { UserModule } from 'src/prisma/user/user.module';
import { SessionSerializer } from './utils/Serializer';

@Module({
  imports: [ConfigModule.forRoot(), UserModule],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    SessionSerializer,
    AuthService,
  ],
})
export class AuthModule {}
