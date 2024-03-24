import type { NextPage } from "next";
import styled from '@emotion/styled'
  ;
import { AppBar, Box, Drawer, IconButton, ListItemButton, ListItemText, useTheme } from "@mui/material";
import useDevice from "@/lib/hooks/useDevice";
import { List } from "reactstrap";
import Link from "next/link";
import FloyxImage from '@/iconComponents/floyxIcon';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

const FrameChild = styled.header`
  height: 75px;
  width: 1444px;
  position: relative;
  background-color: rgba(8, 6, 23, 0.89);
  backdrop-filter: blur(9px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-sizing: border-box;
  display: none;
  max-width: 100%;
`;
const FloyxProducts = styled.div`
  position: relative;
  white-space: nowrap;
`;
const Username = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px 36px;
  max-width: 100%;
  @media screen and (max-width: 800px) {
    display: none;
  }
  @media screen and (max-width: 450px) {
    gap: 0px 18px;
  }
`;
const Registration = styled.div`
  flex: 1;
  position: relative;
`;
const ContactUs = styled.div`
  flex: 1;
  position: relative;
  white-space: nowrap;
`;
const Username1 = styled.div`
  width: 329px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px 36px;
  max-width: 100%;
  @media screen and (max-width: 450px) {
    gap: 0px 18px;
  }
`;
const Name1 = styled.div`
  width: 1070px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  max-width: 100%;
  z-index: 1;
  @media screen and (max-width: 800px) {
    width: 640px;
  }
`;
const RectangleParentRoot = styled.div`
  margin-top: -1px;
  align-self: stretch;
  background-color: rgba(8, 6, 23, 0.89);
  backdrop-filter: blur(9px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 25px 140px 23px;
  top: 0;
  z-index: 99;
  position: sticky;
  max-width: 100%;
  text-align: left;
  font-size: 16px;
  color: #fff;
  font-family: Poppins;
  @media screen and (max-width: 1350px) {
    padding-left: 70px;
    padding-right: 70px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 800px) {
    padding-left: 35px;
    padding-right: 35px;
    box-sizing: border-box;
  }
`;

const navItems = [{
  label: 'Floyx Products',
  href: '/',
},{
  label: 'Mobile Application',
  href: '/',
},{
  label: 'Crypto Area',
  href: '/',
},{
  label: 'Registration',
  href: '/',
},{
  label: 'Contact Us',
  href: '/',
},{
  label: 'About Us',
  href: '/',
},]

const FrameComponent1: NextPage = () => {
  const { isMobile } = useDevice();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  if(isMobile){
    return(
      <AppBar
        sx={{
          backgroundColor: '#0B081F',
        }}
        component="nav"
        position="absolute"
        elevation={0}
      >
        <Box
          className="notranslate"
          sx={{
            paddingX: 1,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ width: '19%', height: '100%' }}>
            <IconButton>
              <FloyxImage
                fill={
                  theme.palette.common.white
                }
              />
            </IconButton>
          </Box>
          <Box sx={{ pr:1,display: { xs: 'block', sm: 'none' } }}>
            <IconButton
              aria-label="open drawer"
              edge="end"
              onClick={()=>setMobileOpen(!mobileOpen)}
            >
              <MenuIcon
                sx={{
                  color:theme.palette.common.white
                }}
              />
            </IconButton>
          </Box>
        </Box>
        {mobileOpen && <Drawer
            variant={mobileOpen ? 'temporary' : 'permanent'}
            open={mobileOpen}
            onClose={()=>setMobileOpen(!mobileOpen)}
            sx={{
              flexShrink: 0,
              display: {
                xs: 'block',
                sm: 'none',
              },
              height: '100%',
              '& .MuiDrawer-paper': {
                borderWidth: 0,
                position: 'relative',
                boxSizing: 'border-box',
                width: 220,
                background: '#0B081F',
              },
            }}
          >
           <List>
      {navItems.map((item, index) => (
        <ListItemButton
          key={index + 'list-item-nav-item'}
          LinkComponent={Link}
          href={item.href}
        >
          <ListItemText sx={{color: '#fff', opacity: .8}} translate="no" primary={item.label} />
        </ListItemButton>
      ))}
    </List>
          </Drawer>}
      </AppBar>
    );
  }
  
  return (
    <AppBar>
      <RectangleParentRoot>
        <FrameChild />
        <Name1>
          <Username>
            <FloyxProducts>Floyx Products</FloyxProducts>
            <FloyxProducts>Mobile Application</FloyxProducts>
            <FloyxProducts>Crypto Area</FloyxProducts>
          </Username>
          <Username1>
            <Registration>Registration</Registration>
            <ContactUs>Contact Us</ContactUs>
            <FloyxProducts>About Us</FloyxProducts>
          </Username1>
        </Name1>
      </RectangleParentRoot>
    </AppBar>
  );
};

export default FrameComponent1;
