'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import CustomizedMenus from '../CustomizedButton';
import { usePathname, useRouter } from 'next/navigation';
import DocumentText from '@/assets/images/svg/documentText';
import VideoIcon from '@/assets/images/svg/video';
import ProfileGroup from '@/assets/images/svg/profileGroup';
import BitCoin from '@/assets/images/svg/bitcoin';
import Link from 'next/link';
const HeaderSection = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 1,
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
export default function Header() {
  const pathName = usePathname();

  const { palette } = useTheme();
  const getColorSvg = path => {
    if (pathName === path) {
      return palette.primary.iconSelectedColor;
    }
    return palette?.mode === 'light'
      ? palette.text.primary
      : palette?.primary.fontLightColor;
  };

  const TOP_BAR = [
    {
      text: 'Articles/Blog',
      icon: <DocumentText />,
      visible: true,
      link: '/articles',
    },
    {
      text: 'Video/Live Streams',
      icon: <VideoIcon color={getColorSvg('#')} />,
      visible: false,
      link: '#',
    },
    {
      text: 'Group',
      icon: <ProfileGroup color={getColorSvg('#')} />,
      visible: false,
      link: '#',
    },
    {
      data: [
        {
          text: 'Crypto',
          icon: <DocumentText color={getColorSvg('#')} />,
          visible: true,
          link: '#',
        },
        {
          text: 'AirDrop',
          icon: <DocumentText color={getColorSvg('#')} />,
          visible: true,
          link: '#',
        },
        {
          text: 'Search',
          icon: <DocumentText color={getColorSvg('#')} />,
          visible: true,
          link: '#',
        },
      ],
      visible: false,
    },
  ];

  return (
    <HeaderSection pb={1.5}>
      {TOP_BAR.map((val, index) => (
        <Box key={`headerBar${index}`}>
          {!Array.isArray(val?.data) ? (
            val.visible &&
            val.link && (
              <Link href={val.link}>
                <Button
                  sx={{ color: palette.mode === 'light' ? '#000' : '#fff' }}
                  variant="outlined"
                  color="primary"
                  startIcon={val.icon}
                >
                  {val.text}
                </Button>
              </Link>
            )
          ) : (
            <>
              {val.visible && (
                <CustomizedMenus
                  startIcon={<BitCoin color={getColorSvg(val.link)} />}
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
