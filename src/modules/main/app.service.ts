import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config';

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}

  root() {
    return {
      message: 'Welcome to Shopping Cart API',
      url: this.config.get('APP_URL'),
    };
  }
}
