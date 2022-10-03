import React, { HTMLProps } from 'react';
import { Header } from './Header';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { Sidebar } from './Sidebar';
import { DRAWER_WIDTH } from '../../constants/layout.constants';
import { useStores } from '../../hooks/useStores';
import { observer } from 'mobx-react-lite';

interface Props {
  children: React.ReactNode;
}

interface MainProps extends HTMLProps<HTMLDivElement> {
  isSidebarOpen: boolean;
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'isSidebarOpen' })<MainProps>(
  ({ theme, isSidebarOpen }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(isSidebarOpen && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: DRAWER_WIDTH
    })
  })
);

export const Layout: React.FC<Props> = observer(({ children }) => {
  const { themeStore } = useStores();
  return (
    <Box sx={{ background: 'text.primary' }}>
      <Header />
      <Main isSidebarOpen={themeStore.isSidebarOpen}>
        <Container sx={{ pt: 12, pb: 4 }}>{children}</Container>
      </Main>
      <Sidebar />
    </Box>
  );
});
