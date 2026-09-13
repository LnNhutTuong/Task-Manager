export type JwtPayload = {
  sub: number;
  email: string;
};

export type LoginResponse = {
  accessToken: string;
  email: string;
};

export type AuthUser = {
  id: number;
  email: string;
};
