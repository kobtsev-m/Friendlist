import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeStore } from '../../store/theme.store';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/user.store';
import { AppRoutes } from '../../router/routes';
import shallow from 'zustand/shallow';
import { removeTokenFromLocalStorage } from '../../utils/token.utils';

interface ProfileLinkItem {
  label: string;
  link?: string;
}

const profileLinkItems: ProfileLinkItem[] = [
  { label: 'Profile', link: AppRoutes.Profile },
  { label: 'Account', link: AppRoutes.Account },
  { label: 'Dashboard', link: AppRoutes.Dashboard },
  { label: 'Logout' }
];

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser], shallow);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (item: ProfileLinkItem) => {
    setAnchorElUser(null);
    if (item.label === 'Logout') {
      handleLogout();
    } else if (item.link) {
      navigate(item.link);
    }
  };

  const handleLogout = () => {
    setUser(null);
    removeTokenFromLocalStorage();
  };

  return (
    <AppBar position='static' color='default'>
      <Container>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => navigate(AppRoutes.Home)}
          >
            <PeopleAltIcon sx={{ display: 'flex', mr: 1 }} />
            <Typography
              variant='h6'
              noWrap
              sx={{
                mr: 2,
                display: 'flex',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                userSelect: 'none'
              }}
            >
              Friendlist
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color='primary' onClick={toggleTheme}>
              <DarkModeIcon />
            </IconButton>
            {user && (
              <>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 2 }}>
                    <Avatar sx={{ fontSize: 16 }} variant='rounded'>
                      {user.firstName.slice(0, 1) + user.lastName.slice(0, 1)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: 6 }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={!!anchorElUser}
                  onClose={handleCloseUserMenu}
                >
                  <Box sx={{ width: '300px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, pt: 1 }}>
                      <Avatar sx={{ fontSize: 16, mr: 2 }} variant='rounded'>
                        {user.firstName.slice(0, 1) + user.lastName.slice(0, 1)}
                      </Avatar>
                      <Typography>
                        {user.firstName} {user.lastName}
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 1 }} />
                    {profileLinkItems.map((item) => (
                      <MenuItem key={item.label} onClick={() => handleMenuItemClick(item)}>
                        <Typography textAlign='center'>{item.label}</Typography>
                      </MenuItem>
                    ))}
                  </Box>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
