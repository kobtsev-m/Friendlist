import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';
import { OutletType, RouterOutlet } from './RouteOutlet';
import { HomePage } from '../pages/home/HomePage';
import { SignInPage } from '../pages/signin/SignInPage';
import { SignUpPage } from '../pages/signup/SignUpPage';

export const RouterProvider: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Home} element={<RouterOutlet type={OutletType.Guest} />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path={AppRoutes.SingUp} element={<RouterOutlet type={OutletType.Guest} />}>
          <Route index element={<SignUpPage />} />
        </Route>
        <Route path={AppRoutes.SingIn} element={<RouterOutlet type={OutletType.Guest} />}>
          <Route index element={<SignInPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
