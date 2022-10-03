import React from 'react';
import Button from '@mui/material/Button';
import { Iconify } from './Iconify';
import Box from '@mui/material/Box';

interface Props {
  onClick: () => void;
}

export const ShowMoreButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
      <Button size={'small'} onClick={onClick}>
        Show more <Iconify icon={'bi:arrow-right'} sx={{ ml: 1 }} />
      </Button>
    </Box>
  );
};
