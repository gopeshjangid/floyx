import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

interface IVerifyPhoneProps {
  onSubmit: (e: any) => void;
  value: string;
  onChange: (e: any) => void;
  submitLoading: boolean;
}

const VerifyPhone = ({
  onSubmit,
  value,
  onChange,
  submitLoading,
}: IVerifyPhoneProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h3" gutterBottom color="textPrimary" align="center">
        Verify phone number
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        color="textPrimary"
        align="center"
        mt={3}
      >
        A verification code was sent to your phone number. Please check your
        phone to complete registration.
      </Typography>

      <Box component="form" noValidate textAlign="center" onSubmit={onSubmit}>
        <TextField
          sx={{
            marginY: '25px',
          }}
          fullWidth
          hiddenLabel
          placeholder="Verification code"
          type="number"
          value={value}
          onChange={onChange}
        />

        <Button variant="contained" color="primary" type="submit">
          {submitLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            'Verify'
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default VerifyPhone;
