import { RoleName } from '../../generated/prisma/enums.js';

export type JwtPayload = {
  sub: string;
  email: string;
  role: RoleName;
};

export type LoginResponse = {
  accessToken: string;
  email: string;
};

export type AuthUser = {
  id: string;
  email: string;
  role: RoleName;
};
