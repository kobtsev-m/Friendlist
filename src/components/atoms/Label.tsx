import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { SxProps } from '@mui/material';

interface Props {
  children: React.ReactNode;
  color: 'inherit' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  variant: 'filled' | 'outlined' | 'ghost';
  sx?: SxProps;
}

const RootStyle = styled('span')<{ ownerState: Pick<Props, 'color' | 'variant'> }>(
  ({ theme, ownerState }) => {
    const isLight = theme.palette.mode === 'light';
    const { color, variant } = ownerState;

    const styleFilled = (color: Props['color']) => ({
      // @ts-ignore
      color: theme.palette[color].contrastText,
      // @ts-ignore
      backgroundColor: theme.palette[color].main
    });

    const styleOutlined = (color: Props['color']) => ({
      // @ts-ignore
      color: theme.palette[color].main,
      backgroundColor: 'transparent',
      // @ts-ignore
      border: `1px solid ${theme.palette[color].main}`
    });

    const styleGhost = (color: Props['color']) => ({
      // @ts-ignore
      color: theme.palette[color][isLight ? 'dark' : 'light'],
      // @ts-ignore
      backgroundColor: alpha(theme.palette[color].main, 0.16)
    });

    return {
      height: 22,
      minWidth: 22,
      lineHeight: 0,
      borderRadius: 8,
      cursor: 'default',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      display: 'inline-flex',
      justifyContent: 'center',
      padding: theme.spacing(0, 1),
      color: theme.palette.grey[800],
      fontSize: theme.typography.pxToRem(12),
      fontFamily: theme.typography.fontFamily,
      backgroundColor: theme.palette.grey[300],
      fontWeight: theme.typography.fontWeightBold,

      ...(color !== 'default'
        ? {
            ...(variant === 'filled' && { ...styleFilled(color) }),
            ...(variant === 'outlined' && { ...styleOutlined(color) }),
            ...(variant === 'ghost' && { ...styleGhost(color) })
          }
        : {
            ...(variant === 'outlined' && {
              backgroundColor: 'transparent',
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.grey[500]}`
            }),
            ...(variant === 'ghost' && {
              color: isLight ? theme.palette.text.secondary : theme.palette.common.white,
              backgroundColor: theme.palette.grey[500]
            })
          })
    };
  }
);

export const Label: React.FC<Props> = ({
  color = 'default',
  variant = 'ghost',
  children,
  ...other
}) => {
  return (
    <RootStyle ownerState={{ color, variant }} {...other}>
      {children}
    </RootStyle>
  );
};
