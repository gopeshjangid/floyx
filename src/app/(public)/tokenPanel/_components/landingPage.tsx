'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography, Button } from '@mui/material';
import BridgeImage from '@/assets/images/bridgeBackground.png';
import VestingImage from '@/assets/images/vestingBackground.png';
import Image from 'next/image';

const aimatedStyle = {
  '&:hover': {
    transform: 'scale(1.08)', // Scale the box on hover
    transition: 'all 0.3s ease-in-out',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for depth
    '& > button': {
      backgroundColor: '#fff', // Highlight the button
      color: '#000', // Change text color to black for visibility
      transform: 'scale(1.2)', // Scale the button to make it larger
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      transition:
        'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
    },
  },
};
const LandingPage = ({ setModal }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '70vh',
        borderRadius: '10px',
        p: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box
            sx={aimatedStyle}
            position={'relative'}
            width="100%"
            height="52vh"
          >
            <Image
              src={VestingImage}
              alt="bridge"
              fill
              objectFit="cover"
              objectPosition="center"
            />
            <Box position="absolute" sx={{ top: '45%', left: '40%' }}>
              <Typography sx={{ color: '#fff' }} variant="h3">
                Vesting
              </Typography>
              <Button
                sx={{
                  ...aimatedStyle,
                  fontWeight: '500',
                  fontSize: '14px',
                }}
                onClick={() => setModal('FIRST')}
                variant="outlined"
              >
                Select
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={aimatedStyle}
            position={'relative'}
            width="100%"
            height="52vh"
          >
            <Image
              src={BridgeImage}
              alt="bridge"
              fill
              objectFit="cover"
              objectPosition="center"
            />
            <Box position="absolute" sx={{ top: '45%', left: '40%' }}>
              <Typography sx={{ color: '#fff' }} variant="h3">
                Bridge
              </Typography>
              <Typography sx={{ color: '#fff' }} variant="subtitle1">
                Coming soon
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;
