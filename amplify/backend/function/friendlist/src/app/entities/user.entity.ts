import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum Role {
  Admin = 'Admin',
  User = 'User',
  Moderator = 'Moderator'
}

registerEnumType(Role, { name: 'Role' });

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Role)
  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ type: 'varchar', length: 255, nullable: true })
  refreshToken: string;
}
