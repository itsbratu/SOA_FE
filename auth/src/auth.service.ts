import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { usersData } from './users';
import { User } from './user';

@Injectable()
export class AuthService {
  private users = [...usersData];

  constructor(private readonly jwtService: JwtService) {}
  
  generateErrorResponse(message: string) {
    return { success: false, message }
  }

  getUsers() {
    return this.users
  }

  async validateUser(email: string, password: string) {
    const user = this.users.find(u => u.email === email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(data: User) {
    const user = await this.validateUser(data.email, data.password);
    if (!user) {
      return this.generateErrorResponse("Invalid credentials provided!");
    }
    const payload = { email: user.email };
    return {
      success: true,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(data: User) {
    const existingUser = this.users.find(user => user.email === data.email);
    if (existingUser) {
      return this.generateErrorResponse("User with this email already exists!");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = { email: data.email, password: hashedPassword };
    this.users.push(newUser);
    
    const payload = { email: newUser.email };
    return {
      success: true,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return { userId: payload.sub, username: payload.username };
    } catch (err) {
      return this.generateErrorResponse("Invalid token provided!");
    }
  }
}
