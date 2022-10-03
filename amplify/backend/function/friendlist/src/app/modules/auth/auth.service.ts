import * as dotenv from 'dotenv';
import * as argon2 from 'argon2';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserInput } from '../users/inputs/CreateUserInput';
import { User } from '../../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from '../users/inputs/LoginUserInput';
import { TokenPayload } from './types/TokenPayload';
import { TokensObject } from '../users/objects/TokensObject';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UsersService) {}

  async login(input: LoginUserInput) {
    const user = await this.verifyUser(input);
    const tokens = await this.generateTokens(user);
    await this.userService.updateRefreshToken(user, tokens);
    return tokens;
  }

  async register(input: CreateUserInput) {
    const existingUser = await this.userService.getByEmail(input.email);
    if (existingUser) {
      throw new HttpException('User with such email already exists', HttpStatus.BAD_REQUEST);
    }
    await this.userService.create(input);
    return true;
  }

  private async verifyUser(input: LoginUserInput) {
    const user = await this.userService.getByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException({ message: 'Incorrect email or password' });
    }
    const isPasswordCorrect = await argon2.verify(user.password, input.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException({ message: 'Incorrect email or password' });
    }
    return user;
  }

  private async generateTokens(user: User): Promise<TokensObject> {
    const payload: TokenPayload = {
      id: user.id,
      role: user.role
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_TIME
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_TIME
      })
    ]);
    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string) {
    const verifyTokenOptions = { secret: process.env.REFRESH_TOKEN_SECRET };
    const tokenPayload = <TokenPayload>this.jwtService.verify(refreshToken, verifyTokenOptions);
    if (!tokenPayload) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    const user = await this.userService.getById(tokenPayload.id);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    const isRefreshTokenCorrect = await argon2.verify(user.refreshToken, refreshToken);
    if (!isRefreshTokenCorrect) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    const tokens = await this.generateTokens(user);
    await this.userService.updateRefreshToken(user, tokens);
    return tokens;
  }
}
