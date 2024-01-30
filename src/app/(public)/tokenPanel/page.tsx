/* eslint-disable camelcase */
// @ts-nocheck
'use client';
import React, { useState, useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import Counter from './_components/Counter';
// import {
//   Collapse,
//   Navbar as ReactstrapNavbar,
//   NavbarToggler,
//   Nav,
//   Row,
//   Col,
//   Container,
//   Button,
//   InputGroup,
//   DropdownItem,
//   DropdownMenu,
//   Dropdown,
//   DropdownToggle,
//   Card,
//   CardText,
// } from 'reactstrap';
import { LoginOutlined } from '@mui/icons-material';
import Web3 from 'web3';

import { FloyxStakingAddress, chainID } from '@/constants/Addresses';
import FloyxImage from '@/iconComponents/floyxIcon';
//import { getFloyxContract } from '@constants/Floyx_Token';
import { getNewFloyxContract } from '@/constants/New_Floyx_Token';
import { getVestingContract } from '@/constants/Vesting_Contract';
import { getPrivateSeedContract } from '@/constants/PrivateSeed_Contract';
import { getStakingContract } from '@/constants/Staking_Contract';

// Modal Images
//import fox from '@/assets/images/fox.svg';
import arrow from '@/assets/images/arrow.png';
import followusback from '@/assets/images/followusback.png';
import walletConnectImage from '@/assets/images/walletConnect.svg';
import Instagram from '@/assets/Instagram.png';
import GooglePlay from '@/assets/GooglePlay.png';
import wallet from '@/assets/images/wallet.png';
import Facebook from '@/assets/Facebook.png';
import Youtube from '@/assets/Youtube.png';
import Linkedin from '@/assets/Linkedin.png';
import Medium from '@/assets/Medium.png';
import Twitter from '@/assets/Twitter.png';
import Telegram from '@/assets/Telegram.png';
import AppleStore from '@/assets/AppleStore.png';
import { useToast } from '@/components/Toast/useToast';
import {
  AppBar,
  Box,
  Stack,
  Toolbar,
  Typography,
  useTheme,
  Button,
} from '@mui/material';
import Image from 'next/image';

const updatedtokenPanel = props => {
  const theme = useTheme();
  return (
    <Box width={'100%'}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.common.white
              : theme.palette.common.black,
          height: '60px',
          padding: '5px 16px',
        }}
      >
        <Stack direction="row" justifyContent={'space-between'}>
          <FloyxImage
            fill={
              theme.palette.mode !== 'dark'
                ? theme.palette.common.white
                : theme.palette.common.black
            }
          />

          <Box sx={{ flexGrow: 0 }}>
            <Button variant="contained">Connect Wallet</Button>
          </Box>
        </Stack>
      </AppBar>
    </Box>
  );
};

export default updatedtokenPanel;
