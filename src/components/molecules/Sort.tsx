import { MenuItem, TextField } from '@mui/material';
import React from 'react';

interface BaseSortOption {
  label: string;
  value: string;
}

interface Props {
  query: string;
  options: BaseSortOption[];
  onSort: (value: string) => void;
}

export const Sort: React.FC<Props> = ({ query, options, onSort }) => {
  return (
    <TextField select size='small' value={query} onChange={(e) => onSort(e.target.value)}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value} sx={{ mx: 1, my: 0.5, borderRadius: 1 }}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
