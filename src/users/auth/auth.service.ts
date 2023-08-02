import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(payload: any): Promise<User> {
    return null;
  }

  async login(user: User) {
    const payload = { username: user.name, sub: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
