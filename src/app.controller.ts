import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("welcome")
  getWelcome(): string {
    return this.appService.getWelcome();
  }
  @Get()
  getHello():string {
    return this.appService.getHello();
  }
}
