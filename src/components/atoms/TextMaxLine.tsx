import React, { forwardRef } from 'react';
import { Link, SxProps, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { GetFontValue } from '../../utils/font.utils';

interface Props {
  variant: Variant;
  asLink?: boolean;
  children?: React.ReactNode;
  line?: number;
  persistent?: boolean;
  sx?: SxProps;
}

export const TextMaxLine = forwardRef((props: Props, ref) => {
  const { asLink, variant = 'body1', line = 2, persistent = false, children, sx, ...other } = props;
  const { lineHeight } = GetFontValue(variant);

  const style = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: line,
    WebkitBoxOrient: 'vertical',
    ...(persistent && {
      height: lineHeight * line
    }),
    ...sx
  };

  if (asLink) {
    return (
      // @ts-ignore
      <Link color='inherit' ref={ref} variant={variant} sx={{ ...style }} {...other}>
        {children}
      </Link>
    );
  }
  return (
    // @ts-ignore
    <Typography ref={ref} variant={variant} sx={{ ...style }} {...other}>
      {children}
    </Typography>
  );
});
