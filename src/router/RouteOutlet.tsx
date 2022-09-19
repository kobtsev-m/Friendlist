import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '../store/user.store';
import { AppRoutes } from './routes';
import shallow from 'zustand/shallow';
import { useLazyQuery } from '@apollo/client';
import { User } from '../types/api';
import { GET_USER_QUERY } from '../api/user.api';
import { Backdrop, CircularProgress } from '@mui/material';
import { Layout } from '../components/Layout/Layout';
import { getTokenFromLocalStorage } from '../utils/token.utils';

export enum OutletType {
  Guest = 'guest',
  Auth = 'auth',
  Admin = 'admin'
}

interface Props {
  type: OutletType;
}

const authorizationRoutes: string[] = [AppRoutes.SingIn, AppRoutes.SingUp];

export const RouterOutlet: React.FC<Props> = ({ type }) => {
  const { pathname: path } = useLocation();

  const [getUser, getUserQuery] = useLazyQuery<{ getUser: User }>(GET_USER_QUERY);

  const [user, setUser, isAdmin] = useUserStore(
    (state) => [state.user, state.setUser, state.isAdmin],
    shallow
  );

  useEffect(() => {
    if (user || !getTokenFromLocalStorage()) {
      return;
    }
    (async () => {
      const { data } = await getUser();
      if (!data) {
        return;
      }
      const user = data.getUser;
      setUser(user);
    })();
  }, [user]);

  if (getUserQuery.loading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color='inherit' />
      </Backdrop>
    );
  }
  if (
    (type === OutletType.Admin && isAdmin()) ||
    (type === OutletType.Auth && user) ||
    (type === OutletType.Guest && !authorizationRoutes.includes(path))
  ) {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }
  if (type === OutletType.Admin && !isAdmin()) {
    return <Navigate to={AppRoutes.Home} />;
  }
  if (type === OutletType.Auth && !user) {
    return <Navigate to={AppRoutes.SingUp} />;
  }
  if (type === OutletType.Guest && user && authorizationRoutes.includes(path)) {
    return <Navigate to={AppRoutes.Home} />;
  }
  return <Outlet />;
};
