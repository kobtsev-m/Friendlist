import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Backdrop, CircularProgress } from '@mui/material';
import { Layout } from '../components/templates/Layout';
import { getAccessTokenFromLocalStorage } from '../utils/token.utils';
import { useStores } from '../hooks/useStores';
import { observer } from 'mobx-react-lite';
import { useJsApiLoader } from '@react-google-maps/api';
import { googleMapsConfig } from '../config/googlemap.config';

export enum OutletType {
  Guest = 'guest',
  Auth = 'auth',
  Admin = 'admin'
}

interface Props {
  type: OutletType;
}

const authorizationRoutes: string[] = [AppRoutes.SingIn, AppRoutes.SingUp];

export const RouterOutlet: React.FC<Props> = observer(({ type }) => {
  const { pathname: path } = useLocation();
  const { userStore } = useStores();
  const googleMapData = useJsApiLoader(googleMapsConfig);

  useEffect(() => {
    if (!userStore.user && getAccessTokenFromLocalStorage()) {
      userStore.fetchUser.action();
    }
  }, [userStore.user]);

  if (userStore.fetchUser.loading || (!googleMapData.isLoaded && !googleMapData.loadError)) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color='inherit' />
      </Backdrop>
    );
  }
  if (
    (type === OutletType.Admin && userStore.isAdmin) ||
    (type === OutletType.Auth && userStore.user) ||
    (type === OutletType.Guest && !authorizationRoutes.includes(path))
  ) {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }
  if (
    (type === OutletType.Admin && !userStore.isAdmin) ||
    (type === OutletType.Auth && !userStore.user) ||
    (type === OutletType.Guest && userStore.user && authorizationRoutes.includes(path))
  ) {
    return <Navigate to={AppRoutes.Home} />;
  }
  return <Outlet />;
});
