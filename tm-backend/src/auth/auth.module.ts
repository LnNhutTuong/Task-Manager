import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { PasswordModule } from '../common/password/password.module.js';
import { JwtModule } from '@nestjs/jwt';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    PrismaModule,
    PasswordModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
})
export class AuthModule {}
