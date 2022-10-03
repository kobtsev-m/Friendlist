import { ApolloClient, createHttpLink, from, fromPromise, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  setTokensInLocalStorage
} from '../utils/token.utils';
import {
  REFRESH_TOKENS_QUERY,
  RefreshTokensQueryResponse,
  RefreshTokensQueryVariables
} from '../api/auth.api';
import { GraphQLError } from 'graphql/error';

const baseUrl =
  process.env.REACT_APP_BACKEND_TYPE === 'local'
    ? process.env.REACT_APP_LOCAL_BACKEND_URL
    : process.env.REACT_APP_AMPLIFY_BACKEND_URL;

const httpLink = createHttpLink({
  uri: baseUrl + '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const accessToken = getAccessTokenFromLocalStorage();
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : ''
    }
  };
});

const isUnauthorizedError = (error: GraphQLError) => {
  return error.message === 'User is not authorized';
};

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  const accessToken = getAccessTokenFromLocalStorage();
  const refreshToken = getRefreshTokenFromLocalStorage();
  if (!graphQLErrors?.some(isUnauthorizedError) || !accessToken || !refreshToken) {
    return;
  }
  return fromPromise(
    apolloClient.query<RefreshTokensQueryResponse, RefreshTokensQueryVariables>({
      query: REFRESH_TOKENS_QUERY,
      variables: { input: refreshToken }
    })
  ).flatMap(({ data }) => {
    const tokens = data.refreshTokens;
    setTokensInLocalStorage(tokens);
    operation.setContext({
      headers: {
        ...operation.getContext().headers,
        authorization: `Bearer ${tokens.accessToken}`
      }
    });
    return forward(operation);
  });
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache()
});
