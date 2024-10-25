import { Controller, Get, Post,Request, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './Auth/auth.service';
import { LocalAuthGuard } from './Auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService:AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req){
    console.log("Request",req.user);
    return this.authService.login(req.user);
  }
}
