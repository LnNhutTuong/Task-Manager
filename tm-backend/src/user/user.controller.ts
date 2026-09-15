import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { RoleName } from '../generated/prisma/enums.js';
import { Roles } from '../auth/decorations/roles.decorator.js';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(RoleName.ADMIN)
  @Post('create')
  @ApiOperation({
    summary: 'Create a user',
    description: 'Create a user account. This endpoint requires ADMIN role.',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    schema: {
      example: {
        id: 1,
        email: 'user@example.com',
        name: 'Nguyen Van A',
        role: 'USER',
        createdAt: '2026-09-15T00:00:00.000Z',
        updatedAt: '2026-09-15T00:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid user data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Admin role is required' })
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }
}
