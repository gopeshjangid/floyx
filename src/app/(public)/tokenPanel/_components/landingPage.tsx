'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography, Button } from '@mui/material';
import BridgeImage from '@/assets/images/bridgeBackground.png';
import VestingImage from '@/assets/images/vestingBackground.png';
import Image from 'next/image';

const LandingPage = ({ setModal }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
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
          <Box position={'relative'} width="100%" height="42vh">
            <Image
              src={VestingImage}
              alt="bridge"
              fill
              objectFit="cover"
              objectPosition="center"
            />
            <Box position="absolute" sx={{ top: '50%', left: '50%' }}>
              <Typography variant="subtitle1">Vesting</Typography>
              <Button onClick={() => setModal('FIRST')} variant="outlined">
                Select
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box position={'relative'} width="100%" height="42vh">
            <Image
              src={BridgeImage}
              alt="bridge"
              fill
              objectFit="cover"
              objectPosition="center"
            />
            <Box position="absolute" sx={{ top: '50%', left: '50%' }}>
              <Typography variant="subtitle1">Coming soon</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;
