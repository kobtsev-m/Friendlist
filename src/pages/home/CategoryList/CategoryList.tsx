import React from 'react';
import { CategoryItem } from '../CategoryItem/CategoryItem';
import { Box, IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export interface Category {
  name: string;
}

const categories: Category[] = [{ name: 'Guitar' }, { name: 'Piano' }, { name: 'Cook' }];

export const CategoryList: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
        <IconButton color='primary'>
          <KeyboardArrowLeftIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex' }}>
        {categories.map((category, i) => (
          <CategoryItem key={i} category={category} />
        ))}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
        <IconButton color='primary'>
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
