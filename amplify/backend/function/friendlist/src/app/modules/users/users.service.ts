import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './inputs/CreateUserInput';
import { RolesService } from '../roles/roles.service';

const DEFAULT_USER_ROLE_VALUE = 'user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  getAll() {
    return this.userRepository.find();
  }

  async create(input: CreateUserInput) {
    const user = this.userRepository.create(input);
    const defaultRole = await this.rolesService.getRoleByValue(DEFAULT_USER_ROLE_VALUE);
    user.roles = [defaultRole];
    await this.userRepository.save(user);
    return user;
  }

  getUserById(userId: string) {
    return this.userRepository.findOne({ where: { id: userId }, relations: ['roles'] });
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email }, relations: ['roles'] });
  }
}
