import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './inputs/CreateUserInput';
import { TokensObject } from './objects/TokensObject';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  getAll() {
    return this.userRepository.find();
  }

  getById(userId: string) {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  getByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(input: CreateUserInput) {
    input.password = await argon2.hash(input.password);
    const user = this.userRepository.create(input);
    await this.userRepository.save(user);
    return user;
  }

  async updateRefreshToken(user: User, tokens: TokensObject) {
    user.refreshToken = await argon2.hash(tokens.refreshToken);
    await this.userRepository.save(user);
  }
}
