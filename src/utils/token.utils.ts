import { apolloClient } from '../config/apollo.config';

const TOKEN_KEY = 'jwttoken';

export const setTokenInLocalStorage = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeTokenFromLocalStorage = () => {
  return localStorage.removeItem(TOKEN_KEY);
};

export const updateTokenHeader = () => apolloClient.resetStore();
