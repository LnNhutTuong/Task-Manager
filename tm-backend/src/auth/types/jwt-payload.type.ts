import { RoleName } from '../../generated/prisma/enums.js';

export type JwtPayload = {
  sub: number;
  email: string;
  role: RoleName;
};

export type LoginResponse = {
  accessToken: string;
  email: string;
};

export type AuthUser = {
  id: number;
  email: string;
  role: RoleName;
};
