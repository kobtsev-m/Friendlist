import React from 'react';
import { Icon, IconProps } from '@iconify/react';
import { Box, SxProps } from '@mui/material';

interface Props extends IconProps {
  sx?: SxProps;
}

export const Iconify: React.FC<Props> = ({ sx, ...other }) => {
  // @ts-ignore
  return <Box<React.FC<IconProps>> component={Icon} sx={sx} {...other} />;
};
