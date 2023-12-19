'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, useTheme } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { styled } from '@mui/material/styles';
import CustomizedMenus from '../CustomizedButton';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { useRouter } from 'next/navigation';
import DocumentText from "@/assets/images/svg/documentText";
import VideoIcon from "@/assets/images/svg/video";
import ProfileGroup from "@/assets/images/svg/profileGroup";
import BitCoin from "@/assets/images/svg/bitcoin";

export default function Header() {
  const router = useRouter();
  const { palette } = useTheme();
  const colorSvg = palette?.mode === 'light' ? palette.text.primary : palette?.primary?.main;
  const HeaderSection = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '.5rem',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      borderRadius: '10px',
    },
    scrollbarColor: 'rgba(0, 0, 0, 0.4) rgba(0, 0, 0, 0.1)',
  }));

  const TOP_BAR = [
    {
      text: 'Articles/Blog',
      icon: <DocumentText color={colorSvg} />,
      visible: true,
      link: '/articles',
    },
    {
      text: 'Video/Live Streams',
      icon: <VideoIcon color={colorSvg} />,
      visible: true,
      link: '/article',
    },
    {
      text: 'Group',
      icon: <ProfileGroup color={colorSvg} />,
      visible: true,
      link: '/article',
    },
    {
      data: [
        {
          text: 'Crypto',
          icon: <DocumentText color={colorSvg} />,
          visible: true,
          link: '/crypto',
        },
        {
          text: 'AirDrop',
          icon: <DocumentText color={colorSvg} />,
          visible: true,
          link: '/airdrop',
        },
        {
          text: 'Search',
          icon: <DocumentText color={colorSvg} />,
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
                  color: palette.text.primary,
                  borderColor: palette.primary.boxBorder,
                  background: palette.primary[700],
                  fontWeight: 500,
                  fontSize: '15px',
                }}
              >
                {val.text}
              </Button>
            )
          ) : (
            <>
              {val.visible && (
                <CustomizedMenus
                  startIcon={<BitCoin color={colorSvg} />}
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
