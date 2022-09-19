import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
  query ($input: LoginUserInput!) {
    login(user: $input)
  }
`;

export const REGISTER_MUTATION = gql`
  mutation ($input: CreateUserInput!) {
    register(user: $input)
  }
`;
