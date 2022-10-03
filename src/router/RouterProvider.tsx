import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';
import { OutletType, RouterOutlet } from './RouteOutlet';
import { HomePage } from '../pages/home/HomePage';
import { SignInPage } from '../pages/signin/SignInPage';
import { SignUpPage } from '../pages/signup/SignUpPage';
import { PlacesPage } from '../pages/places/PlacesPage';
import { PostsPage } from '../pages/posts/PostsPage';
import { CategoriesPage } from '../pages/categories/CategoriesPage';
import { ChatPage } from '../pages/chat/ChatPage';
import { FriendsPage } from '../pages/friends/FriendsPage';
import { GroupsPage } from '../pages/groups/GroupsPage';
import { ProfilePage } from '../pages/profile/ProfilePage';

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
        <Route path={AppRoutes.Categories} element={<RouterOutlet type={OutletType.Auth} />}>
          <Route index element={<CategoriesPage />} />
        </Route>
        <Route path={AppRoutes.Posts} element={<RouterOutlet type={OutletType.Auth} />}>
          <Route index element={<PostsPage />} />
        </Route>
        <Route path={AppRoutes.Places} element={<RouterOutlet type={OutletType.Auth} />}>
          <Route index element={<PlacesPage />} />
        </Route>
        <Route path={AppRoutes.Groups} element={<RouterOutlet type={OutletType.Auth} />}>
          <Route index element={<GroupsPage />} />
        </Route>
        <Route path={AppRoutes.Friends} element={<RouterOutlet type={OutletType.Auth} />}>
          <Route index element={<FriendsPage />} />
        </Route>
        <Route path={AppRoutes.Profile} element={<RouterOutlet type={OutletType.Auth} />}>
          <Route index element={<ProfilePage />} />
        </Route>
        <Route path={AppRoutes.Chat} element={<RouterOutlet type={OutletType.Auth} />}>
          <Route index element={<ChatPage />} />
          <Route path={'new'} element={<ChatPage />} />
          <Route path={':conversationKey'} element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
