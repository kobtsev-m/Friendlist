import { Variant } from '@mui/material/styles/createTypography';
import { Breakpoint, useTheme } from '@mui/material';
import { useResponsive } from '../hooks/useResponsive';

export const GetFontValue = (variant: Variant) => {
  const theme = useTheme();
  const breakpoint = useWidth();
  const key = theme.breakpoints.up(breakpoint === 'xl' ? 'lg' : breakpoint);

  const hasResponsive =
    variant === 'h1' ||
    variant === 'h2' ||
    variant === 'h3' ||
    variant === 'h4' ||
    variant === 'h5' ||
    variant === 'h6';

  const getFont =
    hasResponsive && theme.typography[variant][key]
      ? theme.typography[variant][key]
      : theme.typography[variant];

  const typedGetFont = getFont as { fontSize: string };

  const fontSize = remToPx(typedGetFont.fontSize);
  const lineHeight = Number(theme.typography[variant].lineHeight) * fontSize;
  const { fontWeight } = theme.typography[variant];
  const { letterSpacing } = theme.typography[variant];

  return { fontSize, lineHeight, fontWeight, letterSpacing };
};

export const remToPx = (value: string) => {
  return Math.round(parseFloat(value) * 16);
};

export const pxToRem = (value: number) => {
  return `${value / 16}rem`;
};

export const responsiveFontSizes = ({ sm, md, lg }: { sm: number; md: number; lg: number }) => {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm)
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md)
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg)
    }
  };
};

const useWidth = (): Breakpoint => {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  const breakpoint = keys.reduce((output, key) => {
    const matches = useResponsive('up', key);
    return !output && matches ? key : output;
  }, null as Breakpoint | null);
  return breakpoint || 'xs';
};
