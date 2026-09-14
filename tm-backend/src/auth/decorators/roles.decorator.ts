import { SetMetadata } from '@nestjs/common';
import { RoleName } from '../../generated/prisma/enums.js';

export const Roles = (...roles: RoleName[]) => SetMetadata('roles', roles);
