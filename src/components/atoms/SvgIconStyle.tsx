import React from 'react';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/material';

interface Props {
  src: string;
  sx: SxProps;
}

export const SvgIconStyle: React.FC<Props> = ({ src, sx }) => {
  return (
    <Box
      component='span'
      sx={{
        width: 24,
        height: 24,
        display: 'inline-block',
        bgcolor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx
      }}
    />
  );
};
