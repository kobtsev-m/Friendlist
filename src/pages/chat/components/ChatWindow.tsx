import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Box, Divider, Stack } from '@mui/material';
import { ChatRoom } from './ChatRoom';
import { ChatMessageList } from './ChatMessageList';
import { ChatHeaderDetail } from './ChatHeaderDetail';
import { ChatMessageInput } from './ChatMessageInput';
import { ChatHeaderCompose } from './ChatHeaderCompose';
import { useStores } from '../../../hooks/useStores';
import { observer } from 'mobx-react-lite';
import { UserFull } from '../../../types/model.types';
import { MessageData } from '../../../store/chat.store';
import { AppRoutes } from '../../../router/routes';

export const ChatWindow: React.FC = observer(() => {
  const { pathname } = useLocation();
  const { conversationKey } = useParams();
  const { userStore, chatStore } = useStores();
  const { conversation, contacts, recipients, participants, activeConversationId } = chatStore;

  const mode = conversationKey ? 'DETAIL' : 'COMPOSE';
  const displayParticipants = participants.filter((item) => item.id !== userStore.user?.id);

  useEffect(() => {
    if (conversationKey) {
      chatStore.setConversationId(conversationKey);
    }
  }, [conversationKey]);

  useEffect(() => {
    if (activeConversationId) {
      chatStore.markConversationAsRead(activeConversationId);
    }
  }, [activeConversationId]);

  const handleAddRecipients = (recipients: UserFull[]) => {
    chatStore.setRecipients(recipients);
  };

  const handleSendMessage = (data: MessageData) => {
    chatStore.onSendMessage(data);
  };

  return (
    <Stack sx={{ flexGrow: 1, minWidth: '1px' }}>
      {mode === 'DETAIL' ? (
        <ChatHeaderDetail participants={displayParticipants} />
      ) : (
        <ChatHeaderCompose
          recipients={recipients}
          contacts={Object.values(contacts.byId)}
          onAddRecipients={handleAddRecipients}
        />
      )}

      <Divider />

      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack sx={{ flexGrow: 1 }}>
          <ChatMessageList conversation={conversation} />
          <Divider />
          <ChatMessageInput
            conversationId={activeConversationId}
            onSend={handleSendMessage}
            disabled={pathname === AppRoutes.ChatNew}
          />
        </Stack>

        {mode === 'DETAIL' && (
          <ChatRoom conversation={conversation} participants={displayParticipants} />
        )}
      </Box>
    </Stack>
  );
});
