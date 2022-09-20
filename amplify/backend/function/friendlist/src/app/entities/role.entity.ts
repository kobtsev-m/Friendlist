import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
@Entity('roles')
export class Role {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  value: string;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
