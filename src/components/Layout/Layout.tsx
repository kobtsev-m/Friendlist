import React from 'react';
import { Header } from '../Header/Header';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

interface Props {
  children: JSX.Element;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Box sx={{ background: 'text.primary' }}>
      <Header />
      <Container sx={{ py: 4 }}>{children}</Container>
    </Box>
  );
};
