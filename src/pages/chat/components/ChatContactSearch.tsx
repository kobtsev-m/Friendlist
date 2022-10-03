import React from 'react';
import { ClickAwayListener, InputAdornment } from '@mui/material';
import { Iconify } from '../../../components/atoms/Iconify';
import { InputStyle } from '../../../components/atoms/InputStyle';

interface Props {
  query: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onClickAway: () => void;
}

export const ChatContactSearch: React.FC<Props> = ({ query, onChange, onFocus, onClickAway }) => {
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <InputStyle
        fullWidth
        size='small'
        value={query}
        onFocus={onFocus}
        onChange={onChange}
        placeholder='Search contacts...'
        stretchStart='100%'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Iconify
                icon='eva:search-fill'
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          )
        }}
        sx={{ mt: 2 }}
      />
    </ClickAwayListener>
  );
};
