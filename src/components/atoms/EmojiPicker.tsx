import React, { useState } from 'react';
import { Picker } from 'emoji-mart';
import { styled, useTheme } from '@mui/material/styles';
import { alpha, Box, ClickAwayListener, IconButton } from '@mui/material';
import { Iconify } from './Iconify';
import 'emoji-mart/css/emoji-mart.css';

const RootStyle = styled(Box)({
  position: 'relative'
});

const PickerStyle = styled('div')(({ theme }) => ({
  bottom: 40,
  overflow: 'hidden',
  position: 'absolute',
  left: theme.spacing(-2),
  boxShadow: `0 20px 40px -4px ${alpha(theme.palette.background.default, 0.16)}`,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  '& .emoji-mart': {
    border: 'none',
    backgroundColor: theme.palette.background.paper
  },
  '& .emoji-mart-anchor': {
    color: theme.palette.text.disabled,
    '&:hover, &:focus, &.emoji-mart-anchor-selected': {
      color: theme.palette.text.primary
    }
  },
  '& .emoji-mart-bar': { borderColor: theme.palette.divider },
  '& .emoji-mart-search input': {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    borderColor: theme.palette.grey[500],
    '&::placeholder': {
      ...theme.typography.body2,
      color: theme.palette.text.disabled
    }
  },
  '& .emoji-mart-search-icon svg': {
    opacity: 1,
    fill: theme.palette.text.disabled
  },
  '& .emoji-mart-category-label span': {
    ...theme.typography.subtitle2,
    backdropFilter: `blur(6px)`,
    WebkitBackdropFilter: `blur(6px)`,
    backgroundColor: alpha(theme.palette.background.paper, 0.8)
  },
  '& .emoji-mart-title-label': { color: theme.palette.text.primary },
  '& .emoji-mart-category .emoji-mart-emoji:hover:before': {
    backgroundColor: theme.palette.action.selected
  },
  '& .emoji-mart-emoji': { outline: 'none' },
  '& .emoji-mart-preview-name': {
    color: theme.palette.text.primary
  },
  '& .emoji-mart-preview-shortname, .emoji-mart-preview-emoticon': {
    color: theme.palette.text.secondary
  }
}));

interface Props {
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
  alignRight?: boolean;
}

export const EmojiPicker: React.FC<Props> = ({
  disabled,
  value,
  setValue,
  alignRight = false,
  ...other
}) => {
  const theme = useTheme();
  const [emojiPickerState, SetEmojiPicker] = useState(false);

  let emojiPicker;
  if (emojiPickerState) {
    emojiPicker = (
      <Picker
        color={theme.palette.primary.main}
        title='Pick your emoji…'
        emoji='point_up'
        // @ts-ignore
        onSelect={(emoji) => setValue(value + emoji?.native)}
      />
    );
  }

  const triggerPicker = (event: React.MouseEvent) => {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  };

  const handleClickAway = () => {
    SetEmojiPicker(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <RootStyle {...other}>
        <PickerStyle
          sx={{
            ...(alignRight && {
              right: -2,
              left: 'auto !important'
            })
          }}
        >
          {emojiPicker}
        </PickerStyle>
        <IconButton disabled={disabled} size='small' onClick={triggerPicker}>
          <Iconify icon={'eva:smiling-face-fill'} width={20} height={20} />
        </IconButton>
      </RootStyle>
    </ClickAwayListener>
  );
};
