import React from 'react';
import { Card } from '@mui/material';
import { ChatSidebar } from './components/ChatSidebar';
import { ChatWindow } from './components/ChatWindow';

export const ChatPage: React.FC = () => {
  return (
    <Card sx={{ height: '72vh', display: 'flex' }}>
      <ChatSidebar />
      <ChatWindow />
    </Card>
  );
};
