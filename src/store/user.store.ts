import { RootStore } from './root.store';
import { makeAutoObservable } from 'mobx';
import { CreateUserInput, LoginUserInput, Role, User } from '../types/api.types';
import { apolloClient } from '../config/apollo.config';
import {
  LOGIN_QUERY,
  LoginQueryResponse,
  LoginQueryVariables,
  REGISTER_MUTATION,
  RegisterMutationResponse,
  RegisterMutationVariables
} from '../api/auth.api';
import {
  removeTokensFromLocalStorage,
  setTokensInLocalStorage,
  updateTokenHeader
} from '../utils/token.utils';
import { GET_USER_QUERY, GetUserQueryResponse } from '../api/users.api';

export class UserStore {
  user: User | undefined;

  login = {
    action: this.loginAction.bind(this),
    loading: false,
    error: ''
  };
  register = {
    action: this.registerAction.bind(this),
    loading: false,
    error: ''
  };
  fetchUser = {
    action: this.fetchUserAction.bind(this),
    loading: false,
    error: ''
  };

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  get isAdmin() {
    return this.user?.role === Role.Admin;
  }
  get fullName() {
    return this.user ? this.user.firstName + ' ' + this.user.lastName : '';
  }
  get nameAbbreviation() {
    return this.user ? this.user.firstName.slice(0, 1) + this.user.lastName.slice(0, 1) : '';
  }

  private async fetchUserAction() {
    if (this.fetchUser.loading) {
      return;
    }
    this.fetchUser.loading = true;
    this.fetchUser.error = '';
    try {
      const { data } = await apolloClient.query<GetUserQueryResponse>({ query: GET_USER_QUERY });
      this.user = data.getUser;
    } catch (e) {
      this.fetchUser.error = (<Error>e).message;
      console.log(e);
    } finally {
      this.fetchUser.loading = false;
    }
  }

  private async loginAction(input: LoginUserInput) {
    this.login.loading = true;
    this.login.error = '';
    try {
      const { data } = await apolloClient.query<LoginQueryResponse, LoginQueryVariables>({
        query: LOGIN_QUERY,
        variables: { input }
      });
      const tokens = data.login;
      setTokensInLocalStorage(tokens);
      await updateTokenHeader();
      await this.fetchUserAction();
    } catch (e) {
      this.login.error = (<Error>e).message;
    } finally {
      this.login.loading = false;
    }
  }

  private async registerAction(input: CreateUserInput) {
    this.register.loading = true;
    this.register.error = '';
    try {
      await apolloClient.mutate<RegisterMutationResponse, RegisterMutationVariables>({
        mutation: REGISTER_MUTATION,
        variables: { input }
      });
    } catch (e) {
      this.register.error = (<Error>e).message;
    } finally {
      this.register.loading = false;
    }
  }

  logout() {
    removeTokensFromLocalStorage();
    this.user = undefined;
    this.rootStore.themeStore.closeSidebar();
  }
}
