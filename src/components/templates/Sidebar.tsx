import React, { Fragment } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { DRAWER_WIDTH, SIDEBAR_LINK_GROUPS } from '../../constants/layout.constants';
import { Iconify } from '../atoms/Iconify';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../hooks/useStores';
import { AppRoutes } from '../../router/routes';

export const Sidebar: React.FC = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const { themeStore } = useStores();
  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        backgroundColor: 'primary.main',
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          display: 'flex',
          pt: 9
        }
      }}
      variant='persistent'
      anchor='left'
      color='primary'
      open={themeStore.isSidebarOpen}
    >
      {SIDEBAR_LINK_GROUPS.map((group) => (
        <Fragment key={`sidebarGroup${group.name}`}>
          <List>
            {group.items.map((item) => {
              const isHomeRouteSelected =
                item.link === AppRoutes.Home && location.pathname === item.link;
              const isRouteSelected =
                item.link !== AppRoutes.Home && location.pathname.includes(String(item.link));
              return (
                <ListItem key={`sidebarItem${item.label}`} sx={{ py: 1, px: 3 }}>
                  <ListItemButton
                    selected={isHomeRouteSelected || isRouteSelected}
                    onClick={() => item.link && navigate(item.link)}
                  >
                    <ListItemIcon>
                      <Iconify icon={item.icon} />
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Divider />
        </Fragment>
      ))}
    </Drawer>
  );
});
