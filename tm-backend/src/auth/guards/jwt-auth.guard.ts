//dung passport de kiem tra strategy jwt de kiem tra requyest co hop le khong

import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {}
