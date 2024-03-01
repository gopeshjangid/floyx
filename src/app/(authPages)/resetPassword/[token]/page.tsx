'use client';

import { Box } from '@mui/material';
import React from 'react';
import ResetPasswordComponent from '../_components/resetPassword';


const ResetPassword = () => {
  
  return (
    <Box
      textAlign="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin="auto"
    >
       <ResetPasswordComponent/>
    </Box>
  );
};

export default ResetPassword;
