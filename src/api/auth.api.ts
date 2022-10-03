import { gql } from '@apollo/client';
import { CreateUserInput, LoginUserInput, TokensObject } from '../types/api.types';

export const LOGIN_QUERY = gql`
  query ($input: LoginUserInput!) {
    login(user: $input) {
      accessToken
      refreshToken
    }
  }
`;
export type LoginQueryResponse = { login: TokensObject };
export type LoginQueryVariables = { input: LoginUserInput };

export const REGISTER_MUTATION = gql`
  mutation ($input: CreateUserInput!) {
    register(user: $input)
  }
`;
export type RegisterMutationResponse = { register: boolean };
export type RegisterMutationVariables = { input: CreateUserInput };

export const REFRESH_TOKENS_QUERY = gql`
  query ($input: String!) {
    refreshTokens(refreshToken: $input) {
      accessToken
      refreshToken
    }
  }
`;
export type RefreshTokensQueryResponse = { refreshTokens: TokensObject };
export type RefreshTokensQueryVariables = { input: string };
