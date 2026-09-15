import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password123', format: 'password' })
  password: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Nguyen Van A' })
  name?: string;
}
