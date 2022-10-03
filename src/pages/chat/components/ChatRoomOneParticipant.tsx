import React from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Button, Collapse, Divider, Typography } from '@mui/material';
import { UserFull } from '../../../types/model.types';
import { Iconify } from '../../../components/atoms/Iconify';

const CollapseButtonStyle = styled(Button)(({ theme }) => ({
  ...theme.typography.overline,
  height: 40,
  borderRadius: 0,
  padding: theme.spacing(1, 2),
  justifyContent: 'space-between',
  color: theme.palette.text.disabled
}));

const RowStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(1.5, 0)
}));

const RowIconStyle = styled(Iconify)(({ theme }) => ({
  width: 16,
  height: 16,
  marginTop: 4,
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary
}));

const RowTextStyle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  maxWidth: 160,
  wordWrap: 'break-word',
  ...theme.typography.body2
}));

interface Props {
  participants: UserFull[];
  isCollapse: boolean;
  onCollapse: () => void;
}

export const ChatRoomOneParticipant: React.FC<Props> = ({
  participants,
  isCollapse,
  onCollapse
}) => {
  const participant = [...participants][0];
  if (participant === undefined) {
    return null;
  }
  return (
    <>
      <Box
        sx={{
          pt: 4,
          pb: 3,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <Avatar
          alt={participant.firstName}
          src={participant.avatarUrl}
          sx={{ width: 96, height: 96 }}
        />
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant='subtitle1'>
            {participant.firstName + ' ' + participant.lastName}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <CollapseButtonStyle
        fullWidth
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
        information
      </CollapseButtonStyle>

      <Collapse in={isCollapse}>
        <Box sx={{ px: 2.5, pb: 1 }}>
          <RowStyle>
            <RowIconStyle icon={'eva:email-fill'} />
            <RowTextStyle>{participant.email}</RowTextStyle>
          </RowStyle>
          <RowStyle>
            <RowIconStyle icon={'eva:pin-fill'} />
            <RowTextStyle>{participant.status}</RowTextStyle>
          </RowStyle>
        </Box>
      </Collapse>
    </>
  );
};
