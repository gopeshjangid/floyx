'use client';
import React from 'react';
import Box from '@mui/material/Box';
interface ModalProps {
  children: JSX.Element;
}

const ReusableModal: React.FC<ModalProps> = ({ children }) => {
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
      <Box>{children}</Box>
    </Box>
  );
};

export default ReusableModal;
