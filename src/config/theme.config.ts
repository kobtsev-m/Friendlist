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
            '-webkit-box-shadow': '0 0 0 100px #121212 inset',
            '-webkit-text-fill-color': '#ffffff'
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
            '-webkit-box-shadow': '0 0 0 100px #ffffff inset',
            '-webkit-text-fill-color': '#000000'
          }
        }
      }
    }
  }
});
