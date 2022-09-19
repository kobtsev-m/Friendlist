import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleInput } from './inputs/CreateRoleInput';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}

  getAll() {
    return this.roleRepository.find();
  }

  async create(input: CreateRoleInput) {
    const role = this.roleRepository.create(input);
    await this.roleRepository.save(role);
    return role;
  }

  getRoleByValue(value: string) {
    return this.roleRepository.findOne({ where: { value } });
  }
}
