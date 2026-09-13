import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDTO } from './dto/register.dto.js';
import { LoginDTO } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(`register`)
  async register(@Body() dto: RegisterDTO) {
    let user = await this.authService.register(dto);

    return {
      message: 'Register successfully',
      data: user,
    };
  }

  @Post(`login`)
  async login(@Body() dto: LoginDTO) {
    let user = await this.authService.login(dto);

    return {
      message: 'Login successfully',
      data: user,
    };
  }
}
