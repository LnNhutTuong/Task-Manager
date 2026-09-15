import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { PasswordService } from '../common/password/password.service.js';

describe('UserService', () => {
  let service: UserService;
  const prisma = {
    user: {
      create: vi.fn(),
    },
  };
  const passwordService = {
    hashPassword: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prisma },
        { provide: PasswordService, useValue: passwordService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('hashes the password before creating a user', async () => {
    const dto = {
      email: 'user@example.com',
      password: 'password123',
      name: 'Test User',
    };
    passwordService.hashPassword.mockResolvedValue('hashed-password');
    prisma.user.create.mockResolvedValue({
      id: 'user-id',
      email: dto.email,
      password: 'hashed-password',
      name: dto.name,
    });

    await expect(service.createUser(dto)).resolves.toMatchObject({
      id: 'user-id',
      email: dto.email,
    });
    expect(passwordService.hashPassword).toHaveBeenCalledWith(dto.password);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: dto.email,
        password: 'hashed-password',
        name: dto.name,
      },
    });
  });
});
