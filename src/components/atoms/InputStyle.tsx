import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

interface Props {
  stretchStart: number | string;
}

export const InputStyle = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'stretchStart'
})<Props>(({ stretchStart, theme }) => ({
  '& .MuiOutlinedInput-root': {
    transition: theme.transitions.create(['box-shadow', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': {
      boxShadow: `0 12px 24px -4px ${theme.palette.background.default}`
    },
    ...(stretchStart && {
      width: stretchStart,
      '&.Mui-focused': {
        boxShadow: `0 12px 24px -4px ${theme.palette.background.default}`,
        [theme.breakpoints.up('sm')]: {
          width: typeof stretchStart === 'number' ? stretchStart + 60 : stretchStart
        }
      }
    })
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.text} !important`
  }
}));
