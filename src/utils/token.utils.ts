import { apolloClient } from '../config/apollo.config';

export const setTokenInLocalStorage = (token: string) => {
  const tokenKey = process.env.REACT_APP_TOKEN_KEY;
  if (!tokenKey) {
    return;
  }
  localStorage.setItem(tokenKey, token);
};

export const getTokenFromLocalStorage = () => {
  const tokenKey = process.env.REACT_APP_TOKEN_KEY;
  if (!tokenKey) {
    return;
  }
  return localStorage.getItem(tokenKey);
};

export const removeTokenFromLocalStorage = () => {
  const tokenKey = process.env.REACT_APP_TOKEN_KEY;
  if (!tokenKey) {
    return;
  }
  return localStorage.removeItem(tokenKey);
};

export const updateTokenHeader = () => apolloClient.resetStore();
