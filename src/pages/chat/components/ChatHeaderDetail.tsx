import { capitalCase } from 'change-case';
import { styled } from '@mui/material/styles';
import { Avatar, AvatarGroup, Box, IconButton, Link, Typography } from '@mui/material';
import { fToNow } from '../../../utils/date.utils';
import { Iconify } from '../../../components/atoms/Iconify';
import { BadgeStatus } from '../../../components/atoms/BadgeStatus';
import { UserFull } from '../../../types/model.types';
import React from 'react';

const RootStyle = styled('div')(({ theme }) => ({
  flexShrink: 0,
  minHeight: 92,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 3)
}));

interface Props {
  participants: UserFull[];
}

export const ChatHeaderDetail: React.FC<Props> = ({ participants }) => {
  const isGroup = participants.length > 1;
  return (
    <RootStyle>
      {isGroup ? (
        <GroupAvatar participants={participants} />
      ) : (
        <OneAvatar participants={participants} />
      )}
      <Box sx={{ flexGrow: 1 }} />
      <IconButton>
        <Iconify icon='eva:phone-fill' width={20} height={20} />
      </IconButton>
      <IconButton>
        <Iconify icon='eva:video-fill' width={20} height={20} />
      </IconButton>
      <IconButton>
        <Iconify icon='eva:more-vertical-fill' width={20} height={20} />
      </IconButton>
    </RootStyle>
  );
};

// ----------------------------------------------------------------------

interface OneAvatarProps {
  participants: UserFull[];
}

const OneAvatar: React.FC<OneAvatarProps> = ({ participants }) => {
  const participant = [...participants][0];

  if (participant === undefined || !participant.status) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <Avatar src={participant.avatarUrl} alt={participant.firstName} />
        <BadgeStatus
          status={participant.status}
          sx={{ position: 'absolute', right: 2, bottom: 2 }}
        />
      </Box>
      <Box sx={{ ml: 2 }}>
        <Typography variant='subtitle2'>
          {participant.firstName + ' ' + participant.lastName}
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {/* Before was last activity */}
          {participant.status !== 'offline'
            ? capitalCase(participant.status)
            : fToNow(participant.updatedAt || '')}
        </Typography>
      </Box>
    </Box>
  );
};

interface GroupAvatarProps {
  participants: UserFull[];
}

const GroupAvatar: React.FC<GroupAvatarProps> = ({ participants }) => {
  return (
    <div>
      <AvatarGroup
        max={3}
        sx={{
          mb: 0.5,
          '& .MuiAvatar-root': { width: 32, height: 32 }
        }}
      >
        {participants.map((participant) => (
          <Avatar key={participant.id} alt={participant.firstName} src={participant.avatarUrl} />
        ))}
      </AvatarGroup>
      <Link
        variant='body2'
        underline='none'
        component='button'
        color='text.secondary'
        onClick={() => {}}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {participants.length} persons
          <Iconify icon='eva:arrow-ios-forward-fill' />
        </Box>
      </Link>
    </div>
  );
};
