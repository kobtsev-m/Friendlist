import { createTheme } from '@mui/material';

export enum AppTheme {
  Light = 'light',
  Dark = 'dark'
}

export const darkTheme = createTheme({
  palette: {
    mode: AppTheme.Dark,
    primary: {
      main: '#98e0c8'
    },
    secondary: {
      main: '#dfaa81'
    }
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #121212 inset',
            WebkitTextFillColor: '#ffffff'
          }
        }
      }
    }
  }
});

export const lightTheme = createTheme({
  palette: {
    mode: AppTheme.Light,
    primary: {
      main: '#192e37'
    },
    secondary: {
      main: '#dfaa81'
    }
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #ffffff inset',
            WebkitTextFillColor: '#000000'
          }
        }
      }
    }
  }
});

export const globalStyles = {
  '.gmnoprint': {
    display: 'none !important'
  },
  'img[alt=Google]': {
    display: 'none !important'
  }
};
