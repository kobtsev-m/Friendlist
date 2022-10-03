import React from 'react';
import Box from '@mui/material/Box';
import { Skeleton } from '@mui/lab';

export const PostSkeleton: React.FC = () => {
  return (
    <>
      <Skeleton variant='rectangular' width='100%' sx={{ height: 300, borderRadius: 2 }} />
      <Box sx={{ display: 'flex', mt: 1.5 }}>
        <Skeleton variant='circular' sx={{ width: 40, height: 40 }} />
        <Skeleton variant='text' sx={{ mx: 1, flexGrow: 1 }} />
      </Box>
    </>
  );
};
