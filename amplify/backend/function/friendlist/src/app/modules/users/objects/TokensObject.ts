import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokensObject {
  @Field() accessToken: string;
  @Field() refreshToken: string;
}
