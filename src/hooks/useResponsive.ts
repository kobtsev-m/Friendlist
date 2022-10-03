import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Breakpoint } from '@mui/material';

export const useResponsive = (
  query: 'up' | 'down' | 'between' | 'only',
  key: Breakpoint,
  start?: Breakpoint,
  end?: Breakpoint
) => {
  const theme = useTheme();

  if (query === 'up') {
    return useMediaQuery(theme.breakpoints.up(key));
  }
  if (query === 'down') {
    return useMediaQuery(theme.breakpoints.down(key));
  }
  if (query === 'between' && start && end) {
    return useMediaQuery(theme.breakpoints.between(start, end));
  }
  if (query === 'only') {
    return useMediaQuery(theme.breakpoints.only(key));
  }
  return null;
};
