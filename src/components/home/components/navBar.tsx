"use client";
import type { NextPage } from "next";
import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from "react";
import { AppBar, Box, Drawer, IconButton, ListItemButton, ListItemText, useTheme,Button, Tooltip, ListItem } from "@mui/material";
import useDevice from "@/lib/hooks/useDevice";
import { List } from "reactstrap";
import Link from "next/link";
import FloyxImage from '@/iconComponents/floyxIcon';
import MenuIcon from '@mui/icons-material/Menu';

const GappingContainer = styled.header`
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
const FloyxProducts = styled(Link)`
  position: relative;
  white-space: nowrap;
`;
const SubContainer1 = styled.div`
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
const Registration = styled.a`
  flex: 1;
  position: relative;
`;
const ContactUs = styled.div`
  flex: 1;
  position: relative;
  white-space: nowrap;
`;
const SubContainer2 = styled.div`
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
const SubContainer = styled.div`
  width: 100%;
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
const MainContainer = styled.div`
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
const Bttn = styled(Button)`
  height: 48px;
  flex: 1;
  z-index: 1;
  
`;
const navItems = [{
  label: 'Floyx Products',
  href: '/',
},{
  label: 'Mobile Application',
  href: '/#downloads',
},{
  label: 'Crypto Area',
  href: '/',
},{
  label: 'Registration',
  href: '/register',
},{
  label: 'Contact Us',
  href: '/',
},{
  label: 'About Us',
  href: '/#aboutus',
},]

const FrameComponent1: NextPage = () => {
  const { isMobile } = useDevice();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "-500px" }
    );

    if (ref?.current) { observer.observe(ref.current); }

    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(() => {
    if (isIntersecting) {
       document?.querySelector("#stickyBtn")?.classList.add("display-show")
      console.log("inNav")
    }
    else {
       console.log("outNav")
      document?.querySelector("#imgPeople")?.classList.remove("fade-in-image");
    };

  }, [isIntersecting]);
 
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
          <Bttn 
            disableElevation={true}
            variant="contained"
            href="/social-login"
            LinkComponent={Link}
          >
              Get Started
            </Bttn>
          </List>
          </Drawer>}
      </AppBar>
    );
  }
  
  return (
    <AppBar >
      <MainContainer>
        <GappingContainer />
        <SubContainer>
          <SubContainer1>
            <FloyxProducts href="/">Floyx Products</FloyxProducts>
            <FloyxProducts href="/#downloads">Mobile Application</FloyxProducts>
            <Tooltip title='Coming Soon'><ContactUs>Crypto Area</ContactUs></Tooltip>
          </SubContainer1>
          <Bttn id="stickyBtn"
          className="display-show"
            disableElevation={true}
            variant="contained"
            href="/social-login"
            LinkComponent={Link}
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 99999,
              textTransform: "none",
              maxWidth: '20%',
              color: "#100d26",
              fontSize: "16",
              background:
                "linear-gradient(86.55deg, #ab59ff, #858fff 56.79%, #4d9aff)",
              borderRadius: "4px",
              "&:hover": {
                background:
                  "linear-gradient(86.55deg, #ab59ff, #858fff 56.79%, #4d9aff)",
              },
             
            }}
          >
            Get Started
          </Bttn>
          <SubContainer2>
            <Registration href='/register'>Registration</Registration>
            <FloyxProducts href="/#aboutus">About Us</FloyxProducts>
            <ContactUs>Contact Us</ContactUs>
          </SubContainer2>
        </SubContainer>
      </MainContainer>
      <div ref={ref}></div>
    </AppBar>
  );
};

export default FrameComponent1;
