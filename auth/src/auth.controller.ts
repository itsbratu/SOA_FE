import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { User } from './user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: User) {
    return this.authService.login(data);
  }

  @Post('register')
  async register(@Body() data: User) {
    return this.authService.register(data);
  }

  @Get('getUsers')
  async getUsers() {
    return this.authService.getUsers()
  }

  @MessagePattern({ cmd: 'verifyToken' })
  async verifyToken(token: string) {
    return this.authService.verifyToken(token);
  }
}

