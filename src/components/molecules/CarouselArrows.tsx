import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, BoxProps, Stack } from '@mui/material';
import { Iconify } from '../atoms/Iconify';
import { IconButtonAnimate } from '../atoms/IconButtonAnimate';

const BUTTON_SIZE = 40;

interface Props extends BoxProps {
  children?: React.ReactNode;
  customIcon: string;
  filled?: boolean;
  onNext?: (() => void) | (() => Promise<void>);
  onPrevious?: (() => void) | (() => Promise<void>);
}

const ArrowStyle = styled(IconButtonAnimate, {
  shouldForwardProp: (prop) => prop !== 'filled'
})<Partial<Props>>(({ filled, theme }) => ({
  width: BUTTON_SIZE,
  height: BUTTON_SIZE,
  cursor: 'pointer',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    color: theme.palette.text.primary
  },
  ...(filled && {
    opacity: 0.48,
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.grey[900],
    '&:hover': {
      opacity: 1,
      color: theme.palette.common.white,
      backgroundColor: theme.palette.grey[900]
    }
  })
}));

export const CarouselArrows: React.FC<Props> = ({
  filled = false,
  customIcon,
  onNext,
  onPrevious,
  children,
  ...other
}) => {
  const theme = useTheme();
  const isRTL = theme.direction === 'rtl';

  const style = {
    position: 'absolute',
    mt: -2.5,
    top: '50%',
    zIndex: 9
  };

  if (children) {
    return (
      <Box {...other}>
        <Box className='arrow left' sx={{ ...style, left: 0 }}>
          <ArrowStyle filled={filled} onClick={onPrevious}>
            {leftIcon(customIcon, isRTL)}
          </ArrowStyle>
        </Box>

        {children}

        <Box className='arrow right' sx={{ ...style, right: 0 }}>
          <ArrowStyle filled={filled} onClick={onNext}>
            {rightIcon(customIcon, isRTL)}
          </ArrowStyle>
        </Box>
      </Box>
    );
  }

  return (
    <Stack direction='row' spacing={1} {...other}>
      <ArrowStyle className='arrow left' filled={filled} onClick={onPrevious}>
        {leftIcon(customIcon, isRTL)}
      </ArrowStyle>
      <ArrowStyle className='arrow right' filled={filled} onClick={onNext}>
        {rightIcon(customIcon, isRTL)}
      </ArrowStyle>
    </Stack>
  );
};

const leftIcon = (customIcon: string, isRTL: boolean) => (
  <Iconify
    icon={customIcon || 'eva:arrow-right-fill'}
    sx={{
      width: 20,
      height: 20,
      transform: ' scaleX(-1)',
      ...(isRTL && { transform: ' scaleX(1)' })
    }}
  />
);

const rightIcon = (customIcon: string, isRTL: boolean) => (
  <Iconify
    icon={customIcon || 'eva:arrow-right-fill'}
    sx={{
      width: 20,
      height: 20,
      ...(isRTL && { transform: ' scaleX(-1)' })
    }}
  />
);
