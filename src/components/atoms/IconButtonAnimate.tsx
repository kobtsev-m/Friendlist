import { m } from 'framer-motion';
import React, { forwardRef } from 'react';
import { Box, IconButton } from '@mui/material';

interface Props {
  children: React.ReactNode;
  color: 'inherit' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size: 'small' | 'medium' | 'large';
}

export const IconButtonAnimate = forwardRef(
  ({ children, size = 'medium', ...other }: Partial<Props>, ref) => (
    <IconButtonAnimateWrapper size={size}>
      {/* @ts-ignore */}
      <IconButton size={size} ref={ref} {...other}>
        {children}
      </IconButton>
    </IconButtonAnimateWrapper>
  )
);

const varSmall = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 }
};

const varMedium = {
  hover: { scale: 1.09 },
  tap: { scale: 0.97 }
};

const varLarge = {
  hover: { scale: 1.08 },
  tap: { scale: 0.99 }
};

interface WrapperProps {
  children: React.ReactNode;
  size: 'small' | 'medium' | 'large';
}

const IconButtonAnimateWrapper: React.FC<WrapperProps> = ({ size, children }) => {
  const isSmall = size === 'small';
  const isLarge = size === 'large';
  return (
    <Box
      component={m.div}
      whileTap='tap'
      whileHover='hover'
      variants={(isSmall && varSmall) || (isLarge && varLarge) || varMedium}
      sx={{
        display: 'inline-flex'
      }}
    >
      {children}
    </Box>
  );
};
