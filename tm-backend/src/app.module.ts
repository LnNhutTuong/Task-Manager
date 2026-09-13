import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { TaskModule } from './task/task.module.js';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module.js';
import { AuthModule } from './auth/auth.module.js';
import { PasswordModule } from './common/password/password.module.js';

@Module({
  imports: [
    PrismaModule,
    TaskModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    PasswordModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
