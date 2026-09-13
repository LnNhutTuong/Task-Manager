import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { PasswordService } from '../common/password/password.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passService: PasswordService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const hashedPassword = await this.passService.hashPassword(dto.password);
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
      },
    });
  }
}
