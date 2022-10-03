import React from 'react';
import { Paper } from '@mui/material';
import { FriendList } from './components/FriendList';

export const FriendsPage: React.FC = () => {
  return (
    <Paper sx={{ p: 5 }}>
      <FriendList />
    </Paper>
  );
};
