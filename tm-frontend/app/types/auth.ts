export type LoginResponse = {
  message: string;
  data: {
    accessToken: string;
    email: string;
  };
};
