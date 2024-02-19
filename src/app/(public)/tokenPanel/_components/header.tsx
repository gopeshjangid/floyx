import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Button,
  useTheme,
  useMediaQuery,
  Box,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import WalletConnectIcon from '@mui/icons-material/AccountBalanceWallet';

function TokenPanelHeader({
  navigationItems,
  modalType,
  setModal,
  isConnecting,
  isConnected,
  address,
  connectHandler,
  FloyxImage,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  console.log('modalType =>>>', modalType);
  const getNavItems = () => {
    return (
      <Stack direction={isMobile ? 'column' : 'row'} gap={1}>
        <Button
          onClick={() => setModal('STAKING')}
          variant={modalType === 'STAKING' ? 'outlined' : 'text'}
        >
          STAKING PREVIEW
        </Button>
        <Button
          onClick={() => setModal('SEEDVESTING')}
          variant={modalType === 'SEEDVESTING' ? 'outlined' : 'text'}
        >
          SEEDVESTING
        </Button>
        <Button
          onClick={() => setModal('PRESALEVESTING')}
          variant={modalType === 'PRESALEVESTING' ? 'outlined' : 'text'}
        >
          PRESALEVESTING
        </Button>
      </Stack>
    );
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      {getNavItems()}
    </Box>
  );

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.common.white
              : theme.palette.common.black,
          height: '60px',
          padding: isMobile ? '5px 2px' : '5px 16px',
          paddingBottom: '10px',
        }}
      >
        <Toolbar sx={{ padding: isMobile ? '5px 2px' : '5px 16px' }}>
          <Stack
            direction="row"
            justifyContent={'space-between'}
            sx={{ width: '100%' }}
          >
            <FloyxImage
              fill={
                theme.palette.mode !== 'dark'
                  ? theme.palette.common.white
                  : theme.palette.common.black
              }
            />
            {!isMobile ? getNavItems() : ''}
            <Box sx={{ flexGrow: 0 }}>
              <w3m-button />
            </Box>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            flexShrink: 0,
            height: '100%',
            '& .MuiDrawer-paper': {
              borderWidth: 0,
              position: 'relative',
              boxSizing: 'border-box',
              width: 260,
              background: theme.palette.background.default,
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </div>
  );
}

export default React.memo(TokenPanelHeader);
