import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Thu di de lai la vang, em di de lai muon van nho thuong';
  }
}
