import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

interface Profile {
  username: string;
  email: string;
  secretFeature: string;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/profile')
  getProfile(): Profile {
    return {
      username: 'rebel',
      email: 'rebal@gmail.com',
      secretFeature: 'this is in the test for now',
    };
  }
}
