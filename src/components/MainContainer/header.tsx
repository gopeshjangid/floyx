'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button, FormControl, MenuItem, Select } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import { styled } from '@mui/material/styles';

export default function Header() {
  const HeaderSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '30px',
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
        <Box>
          {!Array.isArray(val?.data) ? (
            val.visible && (
              <Button
                variant="outlined"
                href={val.link}
                startIcon={val.icon}
                sx={{ width: '100%'}}
              >
                <Typography variant="body2">{val.text}</Typography>
              </Button>
            )
          ) : (
            <>
              {val.visible && (
                <FormControl size="small">
                  <Select disabled={false} defaultValue={'Crypto'}>
                    {val.data.map(drop => (
                      <MenuItem value={drop.text}>
                        <Typography
                          variant="body2"
                          alignItems={'center'}
                          display="flex"
                        >
                          {drop.icon}
                          {drop.text}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </>
          )}
        </Box>
      ))}
    </HeaderSection>
  );
}
