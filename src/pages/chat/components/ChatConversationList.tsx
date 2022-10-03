import { useNavigate } from 'react-router-dom';
import { List, Skeleton, Stack, SxProps } from '@mui/material';
import { ChatConversationItem } from './ChatConversationItem';
import { AppRoutes } from '../../../router/routes';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../hooks/useStores';

interface Props {
  isOpenSidebar: boolean;
  sx?: SxProps;
}

export const ChatConversationList: React.FC<Props> = observer(({ isOpenSidebar, sx, ...other }) => {
  const navigate = useNavigate();
  const { chatStore } = useStores();
  const { conversations, activeConversationId } = chatStore;

  const handleSelectConversation = (conversationId: string) => {
    navigate(`${AppRoutes.Chat}/${conversationId}`);
  };

  const loading = !conversations.allIds.length;

  return (
    <List disablePadding sx={sx} {...other}>
      {(loading ? [...Array(12)] : conversations.allIds).map((conversationId, index) =>
        conversationId ? (
          <ChatConversationItem
            key={conversationId}
            isOpenSidebar={isOpenSidebar}
            conversation={conversations.byId[conversationId]}
            isSelected={activeConversationId === conversationId}
            onSelectConversation={() => handleSelectConversation(conversationId)}
          />
        ) : (
          <Stack
            key={`conversationItemSkeleton${index}`}
            spacing={1}
            direction='row'
            alignItems='center'
            sx={{ px: 3, py: 1.5 }}
          >
            <Skeleton variant='circular' width={48} height={48} />
            <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
              <Skeleton variant='text' sx={{ width: 0.5, height: 16 }} />
              <Skeleton variant='text' sx={{ width: 0.25, height: 12 }} />
            </Stack>
          </Stack>
        )
      )}
    </List>
  );
});
