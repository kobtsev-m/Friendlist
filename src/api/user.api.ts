import { gql } from '@apollo/client';

export const GET_USER_QUERY = gql`
  query GetUser {
    getUser {
      id
      email
      firstName
      lastName
      roles {
        value
      }
    }
  }
`;
