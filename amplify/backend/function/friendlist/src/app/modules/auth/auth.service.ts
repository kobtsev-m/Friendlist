import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserInput } from '../users/inputs/CreateUserInput';
import { User } from '../../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from '../users/inputs/LoginUserInput';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UsersService) {}

  async login(input: LoginUserInput) {
    const user = await this.verifyUser(input);
    return this.generateToken(user);
  }

  async register(input: CreateUserInput) {
    const existingUser = await this.userService.getUserByEmail(input.email);
    if (existingUser) {
      throw new HttpException('User with such email already exists', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userService.create(input);
    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { id: user.id, roles: user.roles.map((role) => role.value) };
    return this.jwtService.sign(payload);
  }

  private async verifyUser(input: LoginUserInput) {
    const user = await this.userService.getUserByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException({ message: 'Incorrect email or password' });
    }
    const isPasswordCorrect = input.password === user.password;
    if (!isPasswordCorrect) {
      throw new UnauthorizedException({ message: 'Incorrect email or password' });
    }
    return user;
  }
}
