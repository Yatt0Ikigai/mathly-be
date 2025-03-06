import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule], //import prisma module to use prisma service in your module
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
