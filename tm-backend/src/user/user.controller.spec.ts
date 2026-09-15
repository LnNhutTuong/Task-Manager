import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { AuthModuleOptions } from '@nestjs/passport';

describe('UserController', () => {
  let controller: UserController;
  const userService = {
    createUser: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: JwtAuthGuard, useValue: { canActivate: () => true } },
        { provide: RolesGuard, useValue: { canActivate: () => true } },
        { provide: AuthModuleOptions, useValue: {} },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('creates a user through UserService', async () => {
    const dto = {
      email: 'user@example.com',
      password: 'password123',
      name: 'Test User',
    };
    const createdUser = { id: 1, ...dto };
    userService.createUser.mockResolvedValue(createdUser);

    await expect(controller.createUser(dto)).resolves.toEqual(createdUser);
    expect(userService.createUser).toHaveBeenCalledWith(dto);
  });
});
