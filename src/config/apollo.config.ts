import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getTokenFromLocalStorage } from '../utils/token.utils';

const baseUrl =
  process.env.REACT_APP_BACKEND_TYPE === 'local'
    ? process.env.REACT_APP_LOCAL_BACKEND_URL
    : process.env.REACT_APP_AMPLIFY_BACKEND_URL;

const httpLink = createHttpLink({
  uri: baseUrl + '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = getTokenFromLocalStorage();
  return {
    headers: {
      ...headers,
      authorization: token ? `${process.env.REACT_APP_TOKEN_TYPE} ${token}` : ''
    }
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
