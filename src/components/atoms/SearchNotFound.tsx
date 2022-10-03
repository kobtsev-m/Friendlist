import { Paper, SxProps, Typography } from '@mui/material';
import React from 'react';

interface Props {
  searchQuery?: string;
  sx?: SxProps;
}

export const SearchNotFound: React.FC<Props> = ({ searchQuery = '', sx }) => {
  return searchQuery ? (
    <Paper sx={{ boxShadow: 0, ...sx }}>
      <Typography gutterBottom align='center' variant='subtitle1'>
        Not found
      </Typography>
      <Typography variant='body2' align='center'>
        No results found for <strong>&quot;{searchQuery}&quot;</strong>
      </Typography>
    </Paper>
  ) : (
    <Typography variant='body2'> Please enter keywords</Typography>
  );
};
