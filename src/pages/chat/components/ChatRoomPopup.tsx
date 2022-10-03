import { styled } from '@mui/material/styles';
import { Avatar, DialogContent, Typography } from '@mui/material';
import React from 'react';
import { UserFull } from '../../../types/model.types';
import { Iconify } from '../../../components/atoms/Iconify';
import { DialogAnimate } from '../../../components/atoms/DialogAnimate';

const RowStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(1.5)
}));

interface Props {
  participant: UserFull;
  isOpen: boolean;
  onClose: () => void;
}

export const ChatRoomPopup: React.FC<Props> = ({ participant, isOpen, onClose }) => {
  const { firstName, lastName, avatarUrl, email, status } = participant;
  return (
    <DialogAnimate fullWidth maxWidth='xs' open={isOpen} onClose={onClose}>
      <DialogContent sx={{ pb: 5, textAlign: 'center' }}>
        <Avatar
          alt={firstName}
          src={avatarUrl}
          sx={{
            mt: 5,
            mb: 2,
            mx: 'auto',
            width: 96,
            height: 96
          }}
        />
        <Typography variant='h6'>{firstName + ' ' + lastName}</Typography>
        <RowStyle>
          <Iconify
            icon={'eva:email-fill'}
            sx={{ mr: 1, width: 16, height: 16, color: 'text.disabled' }}
          />
          <Typography variant='body2'>{email}</Typography>
        </RowStyle>
        <Typography variant='body2' paragraph sx={{ color: 'text.secondary' }}>
          {status}
        </Typography>
      </DialogContent>
    </DialogAnimate>
  );
};
