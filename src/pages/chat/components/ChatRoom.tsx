import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { alpha, Box, Divider, Drawer, IconButton, IconButtonProps } from '@mui/material';
import { useResponsive } from '../../../hooks/useResponsive';
import { Iconify } from '../../../components/atoms/Iconify';
import { ChatRoomAttachment } from './ChatRoomAttachment';
import { ChatRoomOneParticipant } from './ChatRoomOneParticipant';
import { ChatRoomGroupParticipant } from './ChatRoomGroupParticipant';
import { Conversation, UserFull } from '../../../types/model.types';

const ToggleButtonStyle = styled((props) => (
  <IconButton disableRipple {...props} />
))<IconButtonProps>(({ theme }) => ({
  right: 0,
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  top: theme.spacing(1),
  boxShadow: `0 8px 16px 0 ${alpha(theme.palette.background.default, 0.16)}`,
  backgroundColor: theme.palette.background.paper,
  border: `solid 1px ${theme.palette.divider}`,
  borderRight: 0,
  borderRadius: `12px 0 0 12px`,
  transition: theme.transitions.create('all'),
  '&:hover': {
    backgroundColor: theme.palette.background.paper
  }
}));

const SIDEBAR_WIDTH = 240;

interface Props {
  conversation: Conversation;
  participants: UserFull[];
}

export const ChatRoom: React.FC<Props> = ({ conversation, participants }) => {
  const theme = useTheme();
  const [openSidebar, setOpenSidebar] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const [selectUser, setSelectUser] = useState<string | null>(null);
  const [showAttachment, setShowAttachment] = useState(true);
  const [showParticipants, setShowParticipants] = useState(true);
  const isDesktop = useResponsive('up', 'lg');

  const isGroup = participants.length > 1;

  useEffect(() => {
    if (!isDesktop) {
      return handleCloseSidebar();
    }
    return handleOpenSidebar();
  }, [isDesktop]);

  const handleOpenSidebar = () => {
    setOpenSidebar(true);
  };

  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };

  const handleToggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  const renderContent = (
    <>
      {isGroup ? (
        <ChatRoomGroupParticipant
          selectUserId={selectUser}
          participants={participants}
          isCollapse={showParticipants}
          onShowPopupUserInfo={(participantId) => setSelectUser(participantId)}
          onCollapse={() => setShowParticipants((prev) => !prev)}
        />
      ) : (
        <div>
          <ChatRoomOneParticipant
            participants={participants}
            isCollapse={showInfo}
            onCollapse={() => setShowInfo((prev) => !prev)}
          />
        </div>
      )}
      <Divider />

      <ChatRoomAttachment
        conversation={conversation}
        isCollapse={showAttachment}
        onCollapse={() => setShowAttachment((prev) => !prev)}
      />
    </>
  );

  return (
    <Box sx={{ position: 'relative' }}>
      <ToggleButtonStyle
        onClick={handleToggleSidebar}
        sx={{
          ...(openSidebar && isDesktop && { right: SIDEBAR_WIDTH })
        }}
      >
        <Iconify
          width={16}
          height={16}
          icon={openSidebar ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-back-fill'}
        />
      </ToggleButtonStyle>

      {isDesktop ? (
        <Drawer
          open={openSidebar}
          anchor='right'
          variant='persistent'
          sx={{
            height: 1,
            width: SIDEBAR_WIDTH,
            transition: theme.transitions.create('width'),
            ...(!openSidebar && { width: '0px' }),
            '& .MuiDrawer-paper': {
              position: 'static',
              width: SIDEBAR_WIDTH
            }
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          anchor='right'
          ModalProps={{ keepMounted: true }}
          open={openSidebar}
          onClose={handleCloseSidebar}
          sx={{
            '& .MuiDrawer-paper': {
              width: SIDEBAR_WIDTH
            }
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
};
