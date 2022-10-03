import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { alpha, Box, Drawer, IconButton, IconButtonProps, Stack } from '@mui/material';
import { ChatAccount } from './ChatAccount';
import { ChatSearchResults } from './ChatSearchResults';
import { ChatContactSearch } from './ChatContactSearch';
import { ChatConversationList } from './ChatConversationList';
import { AppRoutes } from '../../../router/routes';
import { Scrollbar } from '../../../components/atoms/Scrollbar';
import { Iconify } from '../../../components/atoms/Iconify';
import { UserFull } from '../../../types/model.types';
import { useResponsive } from '../../../hooks/useResponsive';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../hooks/useStores';

const ToggleButtonStyle = styled((props) => (
  <IconButton disableRipple {...props} />
))<IconButtonProps>(({ theme }) => ({
  left: 0,
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  top: theme.spacing(13),
  borderRadius: `0 12px 12px 0`,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  boxShadow: `0 8px 16px 0 ${alpha(theme.palette.primary.main, 0.24)}`,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

const SIDEBAR_WIDTH = 320;
const SIDEBAR_COLLAPSE_WIDTH = 96;

export const ChatSidebar: React.FC = observer(() => {
  const { chatStore } = useStores();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const [openSidebar, setOpenSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserFull[]>([]);
  const [isSearchFocused, setSearchFocused] = useState(false);

  const displayResults = searchQuery && isSearchFocused;
  const isCollapse = isDesktop && !openSidebar;

  useEffect(() => {
    if (!isDesktop) {
      handleCloseSidebar();
    }
    handleOpenSidebar();
  }, [isDesktop, pathname]);

  useEffect(() => {
    if (!openSidebar) {
      setSearchFocused(false);
    }
  }, [openSidebar]);

  const handleOpenSidebar = () => {
    setOpenSidebar(true);
  };

  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };

  const handleToggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  const handleClickAwaySearch = () => {
    setSearchFocused(false);
    setSearchQuery('');
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
  };

  const handleSearchSelect = (userName: string) => {
    setSearchFocused(false);
    setSearchQuery('');
    navigate(AppRoutes.Home);
  };

  const handleSelectContact = (result: UserFull) => {
    if (handleSearchSelect) {
      handleSearchSelect(result.firstName);
    }
  };

  const renderContent = (
    <>
      <Box sx={{ py: 2, px: 3 }}>
        <Stack direction='row' alignItems='center' justifyContent='center'>
          {!isCollapse && (
            <>
              <ChatAccount />
              <Box sx={{ flexGrow: 1 }} />
            </>
          )}

          <IconButton onClick={handleToggleSidebar}>
            <Iconify
              width={20}
              height={20}
              icon={openSidebar ? 'eva:arrow-ios-back-fill' : 'eva:arrow-ios-forward-fill'}
            />
          </IconButton>

          {!isCollapse && (
            <IconButton onClick={() => navigate(AppRoutes.Home)}>
              <Iconify icon={'eva:edit-fill'} width={20} height={20} />
            </IconButton>
          )}
        </Stack>

        {!isCollapse && (
          <ChatContactSearch
            query={searchQuery}
            onFocus={handleSearchFocus}
            onChange={handleChangeSearch}
            onClickAway={handleClickAwaySearch}
          />
        )}
      </Box>

      <Scrollbar>
        {!displayResults ? (
          <ChatConversationList
            isOpenSidebar={openSidebar}
            sx={{ ...(isSearchFocused && { display: 'none' }) }}
          />
        ) : (
          <ChatSearchResults
            query={searchQuery}
            results={searchResults}
            onSelectContact={handleSelectContact}
          />
        )}
      </Scrollbar>
    </>
  );

  return (
    <>
      {!isDesktop && (
        <ToggleButtonStyle onClick={handleToggleSidebar}>
          <Iconify width={16} height={16} icon={'eva:people-fill'} />
        </ToggleButtonStyle>
      )}
      {isDesktop ? (
        <Drawer
          open={openSidebar}
          variant='persistent'
          sx={{
            width: SIDEBAR_WIDTH,
            transition: theme.transitions.create('width'),
            '& .MuiDrawer-paper': {
              position: 'static',
              width: SIDEBAR_WIDTH
            },
            ...(isCollapse && {
              width: SIDEBAR_COLLAPSE_WIDTH,
              '& .MuiDrawer-paper': {
                width: SIDEBAR_COLLAPSE_WIDTH,
                position: 'static',
                transform: 'none !important',
                visibility: 'visible !important'
              }
            })
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          ModalProps={{ keepMounted: true }}
          open={openSidebar}
          onClose={handleCloseSidebar}
          sx={{
            '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
});
