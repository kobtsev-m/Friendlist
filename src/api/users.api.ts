import { gql } from '@apollo/client';
import { User } from '../types/api.types';

export const GET_USER_QUERY = gql`
  query {
    getUser {
      id
      email
      firstName
      lastName
      role
      createdAt
      updatedAt
    }
  }
`;
export type GetUserQueryResponse = { getUser: User };
