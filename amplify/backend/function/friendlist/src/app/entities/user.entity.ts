import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from './role.entity';

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

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [Role])
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'user', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role', referencedColumnName: 'id' },
  })
  roles: Role[];
}
