import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IconButton, MenuItem } from '@mui/material';
import { Iconify } from '../../../components/atoms/Iconify';
import { AppRoutes } from '../../../router/routes';
import { MenuPopover } from '../../../components/atoms/MenuPopover';

interface Props {
  userName: string;
  onDelete: () => void;
}

export const FriendMoreMenu: React.FC<Props> = ({ onDelete, userName }) => {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow='right-top'
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 }
        }}
      >
        <MenuItem component={RouterLink} to={AppRoutes.Home}>
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          Send message
        </MenuItem>
        <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete friend
        </MenuItem>
      </MenuPopover>
    </>
  );
};
