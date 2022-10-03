import { apolloClient } from '../config/apollo.config';
import { TokensObject } from '../types/api.types';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const setTokensInLocalStorage = (tokens: TokensObject) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
};

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshTokenFromLocalStorage = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const removeTokensFromLocalStorage = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const updateTokenHeader = () => apolloClient.resetStore();
