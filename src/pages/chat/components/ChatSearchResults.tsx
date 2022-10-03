import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import React from 'react';
import { SearchNotFound } from '../../../components/atoms/SearchNotFound';
import { UserFull } from '../../../types/model.types';

interface Props {
  query: string;
  results: UserFull[];
  onSelectContact: (contact: UserFull) => void;
}

export const ChatSearchResults: React.FC<Props> = ({ query, results, onSelectContact }) => {
  const isFound = results.length > 0;
  return (
    <>
      <Typography paragraph variant='subtitle1' sx={{ px: 3, color: 'text.secondary' }}>
        Contacts
      </Typography>

      <List disablePadding>
        {results.map((result) => (
          <ListItemButton
            key={result.id}
            onClick={() => onSelectContact(result)}
            sx={{
              py: 1.5,
              px: 3
            }}
          >
            <ListItemAvatar>
              <Avatar alt={result.firstName} src={result.avatarUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={result.firstName}
              primaryTypographyProps={{
                noWrap: true,
                variant: 'subtitle2'
              }}
            />
          </ListItemButton>
        ))}
      </List>
      {!isFound && (
        <SearchNotFound
          searchQuery={query}
          sx={{
            p: 3,
            mx: 'auto',
            width: `calc(100% - 48px)`,
            bgcolor: 'background.neutral'
          }}
        />
      )}
    </>
  );
};
