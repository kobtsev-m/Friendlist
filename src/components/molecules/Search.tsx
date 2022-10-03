import React, { useEffect, useState } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { styled } from '@mui/material/styles';
import { Autocomplete, InputAdornment, Link, Popper, PopperProps, Typography } from '@mui/material';
import { SearchNotFound } from '../atoms/SearchNotFound';
import { InputStyle } from '../atoms/InputStyle';
import { Iconify } from '../atoms/Iconify';
import { Image } from '../atoms/Image';

interface BaseSearchOption {
  id: string;
  title: string;
  name?: string;
  cover?: string;
}

interface Props<T> {
  placeholder: string;
  onSearch: () => Promise<T[]>;
  onClick: (id: string) => void;
}

const PopperStyle = styled((props: PopperProps) => <Popper placement='bottom-start' {...props} />)({
  width: '280px !important'
});

export const Search = <T extends BaseSearchOption>({
  placeholder,
  onSearch,
  onClick
}: Props<T>) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<T[]>([]);

  useEffect(() => {
    (async () => setSearchResults(await onSearch()))();
  }, []);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') {
      return;
    }
    const id = searchResults.find((result) => result.name === searchQuery)?.id;
    if (!id) {
      return;
    }
    onClick(id);
  };

  return (
    <Autocomplete
      size='small'
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={searchResults}
      onInputChange={(event, value) => setSearchQuery(value)}
      getOptionLabel={(option) => option.name ?? option.title}
      noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <InputStyle
          {...params}
          stretchStart={200}
          placeholder={placeholder}
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position='start'>
                <Iconify
                  icon={'eva:search-fill'}
                  sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                />
              </InputAdornment>
            )
          }}
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        const { id, title, name, cover } = option;
        const matches = match(title ?? name, inputValue);
        const parts = parse(title ?? name, matches);
        return (
          <li {...props}>
            <Image
              alt={cover}
              src={cover}
              sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }}
            />
            <Link underline='none' onClick={() => onClick(id)}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component='span'
                  variant='subtitle2'
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
};
