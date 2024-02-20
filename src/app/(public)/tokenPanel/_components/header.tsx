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
import FloyxImage from '@/iconComponents/floyxIcon';
import { useRouter } from 'next/navigation';

function TokenPanelHeader({ modalType, setModal, hideNav }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getNavItems = () => {
    if (hideNav) return;
    return (
      <Stack direction={isMobile ? 'column' : 'row'} gap={1}>
        <Button
          onClick={() => setModal('STAKING')}
          variant={modalType === 'STAKING' ? 'outlined' : 'text'}
          sx={{ color: theme.palette.mode !== 'light' ? '#000' : '#fff' }}
        >
          STAKING PREVIEW
        </Button>
        <Button
          onClick={() => setModal('SEEDVESTING')}
          variant={modalType === 'SEEDVESTING' ? 'outlined' : 'text'}
          sx={{ color: theme.palette.mode !== 'light' ? '#000' : '#fff' }}
        >
          SEEDVESTING
        </Button>
        <Button
          onClick={() => setModal('PRESALEVESTING')}
          sx={{ color: theme.palette.mode !== 'light' ? '#000' : '#fff' }}
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
        <Toolbar
          sx={{
            padding: isMobile ? '5px 2px' : '16px 16px',
            paddingBottom: '16px',
          }}
        >
          <Stack
            direction="row"
            justifyContent={'space-between'}
            sx={{ width: '100%' }}
            pb={2}
          >
            <IconButton onClick={() => router.push('/')}>
              <FloyxImage
                fill={
                  theme.palette.mode !== 'dark'
                    ? theme.palette.common.white
                    : theme.palette.common.black
                }
              />
            </IconButton>
            {!isMobile ? getNavItems() : ''}
            {!hideNav && (
              <Box sx={{ flexGrow: 0 }}>
                <w3m-button />
              </Box>
            )}
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
