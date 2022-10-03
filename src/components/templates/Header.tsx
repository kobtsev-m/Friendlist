import React, { useState } from 'react';
import {
  Avatar,
  Box,
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
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../router/routes';
import { useStores } from '../../hooks/useStores';
import { observer } from 'mobx-react-lite';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { ProfileLinkItem } from '../../types/layout.types';
import { DRAWER_WIDTH, PROFILE_LINKS } from '../../constants/layout.constants';

interface AppBarProps extends MuiAppBarProps {
  isSidebarOpen?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'isSidebarOpen'
})<AppBarProps>(({ theme, isSidebarOpen }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(isSidebarOpen && {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: DRAWER_WIDTH
  })
}));

export const Header: React.FC = observer(() => {
  const navigate = useNavigate();
  const { themeStore, userStore } = useStores();
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
      userStore.logout();
    } else if (item.link) {
      navigate(item.link);
    }
  };

  return (
    <AppBar
      position='fixed'
      color='default'
      sx={{ boxShadow: '0 1px 1px 1px rgb(0 0 0 / 10%)', zIndex: 2000, px: 5 }}
    >
      <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          {userStore.user ? (
            <IconButton color='inherit' onClick={() => themeStore.toggleSidebar()} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
          ) : (
            <PeopleAltIcon
              sx={{ display: 'flex', mr: 1 }}
              onClick={() => navigate(AppRoutes.Home)}
            />
          )}
          <Typography
            variant='h6'
            noWrap
            sx={{
              mr: 2,
              display: 'flex',
              fontWeight: 700,
              textDecoration: 'none',
              userSelect: 'none'
            }}
            onClick={() => navigate(AppRoutes.Home)}
          >
            Friendlist
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color='primary' onClick={() => themeStore.toggleTheme()}>
            <DarkModeIcon />
          </IconButton>
          {userStore.user && (
            <>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 2 }}>
                  <Avatar sx={{ fontSize: 16 }} variant='rounded'>
                    {userStore.nameAbbreviation}
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
                      {userStore.nameAbbreviation}
                    </Avatar>
                    <Typography>{userStore.fullName}</Typography>
                  </Box>
                  <Divider sx={{ mb: 1 }} />
                  {PROFILE_LINKS.map((item) => (
                    <MenuItem
                      key={item.label}
                      disabled={!!item.disabled}
                      onClick={() => handleMenuItemClick(item)}
                    >
                      <Typography textAlign='center'>{item.label}</Typography>
                    </MenuItem>
                  ))}
                </Box>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
});
