import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import FloyxImage from "@/images/floyxIcon";
import { useTheme } from '@emotion/react';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children: string | React.ReactElement | React.ReactElement[] | React.ReactNode;
}

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

export default function DrawerAppBar(props: Props) {
  const isMobile = useMediaQuery('(max-width:480px)');
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{textAlign: 'center' }}>
    <Box sx={{padding: 1,background: 'inherit'}}>
        <FloyxImage fill={theme.palette.primary[theme.palette.mode]}/>
    </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = undefined;
  return (
    < >
      <AppBar component="nav" position='static' color='inherit' elevation={0} sx={{display: { xs: 'block', sm: 'none', md:'none' }}}>
        <Box sx={{ background: theme.palette.mode ==='light' ? '#fff' :'inherit', padding:1, height: '50px', width: '100%', display:'flex',justifyContent: 'space-between'}}>
          <Box sx={{width: '19%', height: '100%'}}>
              <FloyxImage fill={theme.palette.primary[theme.palette.mode]}/>
            </Box>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
          >
             <MenuIcon />
          </IconButton>
        </Box>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant={mobileOpen ? "temporary" : 'permanent'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            flexShrink: 0,
            display: { xs: !mobileOpen && 'none', sm: !mobileOpen && 'block' },
            '& .MuiDrawer-paper': {
              borderWidth:0,
              backgroundColor: theme.palette.mode ==='light' ? '#fff' :theme.palette.background.default,
              boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Container fixed maxWidth='sm'>
        <Toolbar />
        <Paper elevation={0}>{props.children}</Paper>
      </Container>
    </>
  );
}
