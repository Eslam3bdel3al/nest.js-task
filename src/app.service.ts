import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcome(): string {
    return 'welcome to our app!';
  }
  getHello(): string{
    return "hello";
  }
}
