'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { styled } from '@mui/material/styles';
import CustomizedMenus from '../CustomizedButton';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const HeaderSection = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '5px',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      borderRadius: '10px',
    },
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(0, 0, 0, 0.4) rgba(0, 0, 0, 0.1)',
  }));

  const TOP_BAR = [
    {
      text: 'Articles/Blog',
      icon: <DescriptionOutlinedIcon />,
      visible: true,
      link: '/articles',
    },
    {
      text: 'Video/Live Streams',
      icon: <VideocamIcon />,
      visible: true,
      link: '/article',
    },
    {
      text: 'Group',
      icon: <PeopleOutlinedIcon />,
      visible: true,
      link: '/article',
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

  const handleClick = (link: string | undefined) => {
    if (link) router.push(link);
  };

  return (
    <HeaderSection>
      {TOP_BAR.map((val, index) => (
        <Box key={`headerBar${index}`}>
          {!Array.isArray(val?.data) ? (
            val.visible && (
              <Button
                variant="outlined"
                onClick={() => handleClick(val?.link)}
                startIcon={val.icon}
                sx={{
                  marginRight: 1,
                  padding: '5px 10px',
                  whiteSpace: 'nowrap',
                  alignItems: 'center',
                }}
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
        </Box>
      ))}
    </HeaderSection>
  );
}
