import React from 'react';
import { Stack, SxProps } from '@mui/material';

interface Props {
  icon: React.ReactNode;
  value: React.ReactNode;
  endIcon?: boolean;
  sx?: SxProps;
}

export const TextIconLabel: React.FC<Props> = ({ icon, value, endIcon = false, sx, ...other }) => {
  return (
    <Stack
      direction='row'
      alignItems='center'
      sx={{
        typography: 'body2',
        ...sx
      }}
      {...other}
    >
      {!endIcon && icon}
      {value}
      {endIcon && icon}
    </Stack>
  );
};
