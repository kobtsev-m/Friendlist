import { styled } from '@mui/material/styles';
import { IconButton, InputAdornment, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { InputStyle } from '../../../components/atoms/InputStyle';
import { Iconify } from '../../../components/atoms/Iconify';
import React from 'react';

const RootStyle = styled(Toolbar)({
  height: 80,
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 !important',
  marginBlock: 10
});

interface Props {
  numSelected: number;
  filterName: string;
  onFilterName: (value: string) => void;
  onCreateDialog: () => void;
}

export const FriendListToolbar: React.FC<Props> = ({
  numSelected,
  filterName,
  onFilterName,
  onCreateDialog
}) => {
  return (
    <RootStyle>
      <InputStyle
        stretchStart={240}
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder='Search user...'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Iconify
                icon={'eva:search-fill'}
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          )
        }}
      />
      {numSelected > 0 && (
        <Stack direction='row' alignItems='center' spacing={2} sx={{ mr: 2 }}>
          <Typography component='div' variant='subtitle1'>
            {numSelected} selected
          </Typography>
          <Tooltip title='Create dialog'>
            <IconButton onClick={onCreateDialog}>
              <Iconify icon={'bx:message'} />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </RootStyle>
  );
};
