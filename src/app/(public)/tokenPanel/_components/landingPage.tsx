'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
interface ModalProps {
  children: JSX.Element;
}

const LandingPage: React.FC<ModalProps> = ({ children }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'white',
        boxShadow: 24,
        borderRadius: '10px',

        p: 1,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={12} sm={6}></Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;
