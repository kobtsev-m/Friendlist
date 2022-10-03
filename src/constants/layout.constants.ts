import { AppRoutes } from '../router/routes';
import { ProfileLinkItem, SidebarLinkGroup } from '../types/layout.types';

export const DRAWER_WIDTH = 300;

export const PROFILE_LINKS: ProfileLinkItem[] = [
  { label: 'Profile', link: AppRoutes.Profile },
  { label: 'Settings', link: AppRoutes.Settings, disabled: true },
  { label: 'Logout' }
];

export const SIDEBAR_LINK_GROUPS: SidebarLinkGroup[] = [
  {
    name: 'Home',
    items: [
      {
        label: 'Home',
        icon: 'akar-icons:home',
        link: AppRoutes.Home
      }
    ]
  },
  {
    name: 'General',
    items: [
      {
        label: 'Categories',
        icon: 'carbon:categories',
        link: AppRoutes.Categories
      },
      {
        label: 'Posts',
        icon: 'bi:file-post',
        link: AppRoutes.Posts
      },
      {
        label: 'Places',
        icon: 'ps:facebook-places',
        link: AppRoutes.Places
      }
    ]
  },
  {
    name: 'User',
    items: [
      {
        label: 'Groups',
        icon: 'fa-solid:layer-group',
        link: AppRoutes.Groups
      },
      {
        label: 'Friends',
        icon: 'fa-solid:user-friends',
        link: AppRoutes.Friends
      },
      {
        label: 'Chat',
        icon: 'bi:chat-right',
        link: AppRoutes.Chat
      }
    ]
  }
];
