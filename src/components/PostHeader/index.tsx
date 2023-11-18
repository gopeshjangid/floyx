'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, FormControl, MenuItem, Select } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { styled } from '@mui/material/styles';
import CustomizedMenus from "../CustomizedButton";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

export default function Header() {
  const HeaderSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    overflowY: 'hidden',
  }));

  const TOP_BAR = [
    {
      text: 'Articles/Blog',
      icon: <DescriptionOutlinedIcon />,
      visible: true,
      link: '/articlePage',
    },
    {
      text: 'Video/Live Streams',
      icon: <VideocamIcon />,
      visible: true,
      link: '/videoPage',
    },
    {
      text: 'Group',
      icon: <PeopleOutlinedIcon />,
      visible: true,
      link: '/groupPage',
    },
    {
      data: [
        {
          text: 'Crypto',
          icon: <DescriptionOutlinedIcon sx={{ marginRight: 1 }} />,
          visible: true,
          link: '/crypto',
        },
        {
          text: 'AirDrop',
          icon: <DescriptionOutlinedIcon sx={{ marginRight: 1 }} />,
          visible: true,
          link: '/airdrop',
        },
        {
          text: 'Search',
          icon: <DescriptionOutlinedIcon sx={{ marginRight: 1 }} />,
          visible: true,
          link: '/search',
        },
      ],
      visible: true,
    },
  ];

  return (
    <HeaderSection>
      {TOP_BAR.map(val => (
      <>
          {!Array.isArray(val?.data) ? (
            val.visible && (
              <Button
                variant="outlined"
                href={val.link}
                startIcon={val.icon}
                sx={ { marginRight: 2}}
              >
                {val.text}
              </Button>
            )
          ) : (
            <>
              {val.visible && (
                  <CustomizedMenus
                    startIcon={<CurrencyBitcoinIcon />}
                    menuItem={val.data}
                  />
              )}
            </>
          )}
          </>
      ))}
    </HeaderSection>
  );
}
