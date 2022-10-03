import React from 'react';
import _ from 'lodash';
import { styled } from '@mui/material/styles';
import { Box, Button, Collapse, Divider, Typography } from '@mui/material';
import { fDateTime } from '../../../utils/date.utils';
import { getFileFullName, getFileThumb } from '../../../utils/file.utils';
import { Iconify } from '../../../components/atoms/Iconify';
import { Scrollbar } from '../../../components/atoms/Scrollbar';
import { Conversation } from '../../../types/model.types';

const RootStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  display: 'flex',
  overflow: 'hidden',
  flexDirection: 'column',
  paddingBottom: theme.spacing(2)
}));

const FileItemStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  padding: theme.spacing(0, 2.5)
}));

const FileThumbStyle = styled('div')(({ theme }) => ({
  width: 40,
  height: 40,
  flexShrink: 0,
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[500]
}));

const CollapseButtonStyle = styled(Button)(({ theme }) => ({
  ...theme.typography.overline,
  height: 40,
  flexShrink: 0,
  borderRadius: 0,
  padding: theme.spacing(1, 2),
  justifyContent: 'space-between',
  color: theme.palette.text.disabled
}));

interface Props {
  conversation: Conversation;
  isCollapse: boolean;
  onCollapse: () => void;
}

export const ChatRoomAttachment: React.FC<Props> = ({ conversation, isCollapse, onCollapse }) => {
  const totalAttachment = _.uniq(
    _.flatten(conversation.messages.map((item) => item.attachments))
  ).length;

  return (
    <RootStyle>
      <CollapseButtonStyle
        fullWidth
        color='inherit'
        onClick={onCollapse}
        endIcon={
          <Iconify
            icon={isCollapse ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            width={16}
            height={16}
          />
        }
      >
        attachment ({totalAttachment})
      </CollapseButtonStyle>

      {!isCollapse && <Divider />}

      <Scrollbar>
        <Collapse in={isCollapse}>
          {conversation.messages.map((file) => (
            <div key={file.id}>
              {file.attachments.map((fileUrl) => (
                <AttachmentItem key={fileUrl} file={file} fileUrl={fileUrl} />
              ))}
            </div>
          ))}
        </Collapse>
      </Scrollbar>
    </RootStyle>
  );
};

interface ItemProps {
  file: { createdAt: Date };
  fileUrl: string;
}

const AttachmentItem: React.FC<ItemProps> = ({ file, fileUrl }) => {
  return (
    <FileItemStyle key={fileUrl}>
      <FileThumbStyle>{getFileThumb(fileUrl)}</FileThumbStyle>
      <Box sx={{ ml: 1.5, maxWidth: 150 }}>
        <Typography variant='body2' noWrap>
          {getFileFullName(fileUrl)}
        </Typography>
        <Typography noWrap variant='caption' sx={{ color: 'text.secondary', display: 'block' }}>
          {fDateTime(file.createdAt)}
        </Typography>
      </Box>
    </FileItemStyle>
  );
};
