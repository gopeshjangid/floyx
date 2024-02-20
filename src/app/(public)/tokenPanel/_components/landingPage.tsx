'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography, Button } from '@mui/material';
import BridgeImage from '@/assets/images/bridgeBackground.png';
import VestingImage from '@/assets/images/vestingBackground.png';
import Image from 'next/image';

const aimatedStyle = {
  '&:hover': {
    transform: 'scale(1.05)', // Scale the box on hover
    transition: 'transform 0.3s ease-in-out',
    '& > button': {
      backgroundColor: '#f50057', // Highlight the button
      color: '#fff',
      transition: 'background-color 0.3s ease-in-out',
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
            <Box position="absolute" sx={{ top: '40%', left: '40%' }}>
              <Button
                sx={aimatedStyle}
                onClick={() => setModal('FIRST')}
                variant="outlined"
              >
                Vesting
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
            <Box position="absolute" sx={{ top: '40%', left: '40%' }}>
              <Typography variant="subtitle1">Coming soon</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;
