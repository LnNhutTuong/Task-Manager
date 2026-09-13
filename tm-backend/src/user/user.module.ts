import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { PasswordModule } from '../common/password/password.module.js';
@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [PrismaModule, PasswordModule],
})
export class UserModule {}
