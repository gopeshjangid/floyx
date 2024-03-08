'use client';

import { Box, Grid } from '@mui/material';
import React from 'react';
import ResetPasswordComponent from '../_components/resetPassword';


const ResetPassword = () => {
  
  return (
    <Grid item xs={12} sm={6} md={6}>
      <Box
      textAlign="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin="auto"
    >
       <ResetPasswordComponent/>
    </Box>
    </Grid>
  );
};

export default ResetPassword;
