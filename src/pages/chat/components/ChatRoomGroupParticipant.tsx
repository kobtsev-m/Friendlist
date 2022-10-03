import { styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  Collapse,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText
} from '@mui/material';
import { ChatRoomPopup } from './ChatRoomPopup';
import { UserFull } from '../../../types/model.types';
import { Iconify } from '../../../components/atoms/Iconify';
import React from 'react';
import { Scrollbar } from '../../../components/atoms/Scrollbar';
import { BadgeStatus } from '../../../components/atoms/BadgeStatus';

const HEIGHT = 64;

const CollapseButtonStyle = styled(Button)(({ theme }) => ({
  ...theme.typography.overline,
  height: 40,
  borderRadius: 0,
  padding: theme.spacing(1, 2),
  justifyContent: 'space-between',
  color: theme.palette.text.disabled
}));

interface Props {
  participants: UserFull[];
  selectUserId: string | null;
  onShowPopupUserInfo: (participantId: string | null) => void;
  isCollapse: boolean;
  onCollapse: () => void;
}

export const ChatRoomGroupParticipant: React.FC<Props> = ({
  participants,
  selectUserId,
  onShowPopupUserInfo,
  isCollapse,
  onCollapse
}) => {
  return (
    <>
      <CollapseButtonStyle
        fullWidth
        disableRipple
        color='inherit'
        onClick={onCollapse}
        endIcon={
          <Iconify
            icon={isCollapse ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            width={16}
            height={16}
          />
        }
      >
        In room ({participants.length})
      </CollapseButtonStyle>

      <Box sx={{ height: isCollapse ? HEIGHT * 4 : 0 }}>
        <Scrollbar>
          <Collapse in={isCollapse} sx={{ height: isCollapse ? HEIGHT * 4 : 0 }}>
            <List disablePadding>
              {participants.map((participant) => (
                <Participant
                  key={participant.id}
                  participant={participant}
                  isOpen={selectUserId === participant.id}
                  onShowPopup={() => onShowPopupUserInfo(participant.id)}
                  onClosePopup={() => onShowPopupUserInfo(null)}
                />
              ))}
            </List>
          </Collapse>
        </Scrollbar>
      </Box>
    </>
  );
};

interface ParticipantProps {
  participant: UserFull;
  isOpen: boolean;
  onClosePopup: () => void;
  onShowPopup: () => void;
}

const Participant: React.FC<ParticipantProps> = ({
  participant,
  isOpen,
  onClosePopup,
  onShowPopup
}) => {
  const { firstName, lastName, avatarUrl, status, email } = participant;
  return (
    <>
      <ListItemButton onClick={onShowPopup} sx={{ height: HEIGHT, px: 2.5 }}>
        <ListItemAvatar>
          <Box sx={{ position: 'relative', width: 40, height: 40 }}>
            <Avatar alt={firstName} src={avatarUrl} />
            <BadgeStatus status={status} sx={{ right: 0, bottom: 0, position: 'absolute' }} />
          </Box>
        </ListItemAvatar>
        <ListItemText
          primary={firstName + ' ' + lastName}
          secondary={email}
          primaryTypographyProps={{ variant: 'subtitle2', noWrap: true }}
          secondaryTypographyProps={{ noWrap: true }}
        />
      </ListItemButton>
      <ChatRoomPopup participant={participant} isOpen={isOpen} onClose={onClosePopup} />
    </>
  );
};
