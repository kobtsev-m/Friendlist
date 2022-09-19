import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field() value: string;
  @Field() description: string;
}
