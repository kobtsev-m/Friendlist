import { formatDistanceToNowStrict } from 'date-fns';
import { styled } from '@mui/material/styles';
import { Avatar, Box, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { BadgeStatus } from '../../../components/atoms/BadgeStatus';
import { Conversation } from '../../../types/model.types';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../hooks/useStores';

const AVATAR_SIZE = 48;
const AVATAR_SIZE_GROUP = 32;

const RootStyle = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  transition: theme.transitions.create('all')
}));

const AvatarWrapperStyle = styled('div')({
  position: 'relative',
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  '& .MuiAvatar-img': { borderRadius: '50%' },
  '& .MuiAvatar-root': { width: '100%', height: '100%' }
});

const getDetails = (conversation: Conversation, currentUserId: string) => {
  const otherParticipants = conversation.participants.filter(
    (participant) => participant.id !== currentUserId
  );
  const displayNames = otherParticipants
    .reduce((names, participant) => [...names, participant.firstName], [] as string[])
    .join(', ');
  let displayText = '';
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  if (lastMessage) {
    const sender = lastMessage.senderId === currentUserId ? 'You: ' : '';
    const message = lastMessage.contentType === 'image' ? 'Sent a photo' : lastMessage.body;
    displayText = `${sender}${message}`;
  }
  return { otherParticipants, displayNames, displayText };
};

interface Props {
  isSelected: boolean;
  conversation: Conversation;
  isOpenSidebar: boolean;
  onSelectConversation: () => void;
}

export const ChatConversationItem: React.FC<Props> = observer(
  ({ isSelected, conversation, isOpenSidebar, onSelectConversation }) => {
    const { userStore } = useStores();

    const details = getDetails(conversation, userStore.user?.id ?? '');
    const displayLastActivity = conversation.messages[conversation.messages.length - 1].createdAt;
    const isGroup = details.otherParticipants.length > 1;
    const isUnread = conversation.unreadCount > 0;
    const isOnlineGroup =
      isGroup && details.otherParticipants.map((item) => item.status).includes('online');

    return (
      <RootStyle
        onClick={onSelectConversation}
        sx={{
          ...(isSelected && { bgcolor: 'action.selected' })
        }}
      >
        <ListItemAvatar>
          <Box
            sx={{
              ...(isGroup && {
                position: 'relative',
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
                '& .avatarWrapper': {
                  position: 'absolute',
                  width: AVATAR_SIZE_GROUP,
                  height: AVATAR_SIZE_GROUP,
                  '&:nth-of-type(1)': {
                    left: 0,
                    zIndex: 9,
                    bottom: 2,
                    '& .MuiAvatar-root': {
                      border: (theme) => `solid 2px ${theme.palette.background.paper}`
                    }
                  },
                  '&:nth-of-type(2)': { top: 2, right: 0 }
                }
              })
            }}
          >
            {details.otherParticipants.slice(0, 2).map((participant) => (
              <AvatarWrapperStyle className='avatarWrapper' key={participant.id}>
                <Avatar alt={participant.firstName} src={participant.avatarUrl} />
                {!isGroup && (
                  <BadgeStatus
                    status={participant.status}
                    sx={{ right: 2, bottom: 2, position: 'absolute' }}
                  />
                )}
              </AvatarWrapperStyle>
            ))}

            {isOnlineGroup && (
              <BadgeStatus status='online' sx={{ right: 2, bottom: 2, position: 'absolute' }} />
            )}
          </Box>
        </ListItemAvatar>

        {isOpenSidebar && (
          <>
            <ListItemText
              primary={details.displayNames}
              primaryTypographyProps={{
                noWrap: true,
                variant: 'subtitle2'
              }}
              secondary={details.displayText}
              secondaryTypographyProps={{
                noWrap: true,
                variant: isUnread ? 'subtitle2' : 'body2',
                color: isUnread ? 'textPrimary' : 'textSecondary'
              }}
            />

            <Box
              sx={{
                ml: 2,
                height: 44,
                display: 'flex',
                alignItems: 'flex-end',
                flexDirection: 'column'
              }}
            >
              <Box
                sx={{
                  mb: 1.25,
                  fontSize: 12,
                  lineHeight: '22px',
                  whiteSpace: 'nowrap',
                  color: 'text.disabled'
                }}
              >
                {formatDistanceToNowStrict(new Date(displayLastActivity), {
                  addSuffix: false
                })}
              </Box>
              {isUnread && <BadgeStatus status='unread' size='small' />}
            </Box>
          </>
        )}
      </RootStyle>
    );
  }
);
