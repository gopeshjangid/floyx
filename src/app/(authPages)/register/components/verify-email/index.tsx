import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

interface IVerifyEmailProps {
  onResendMail: () => void;
}

const VerifyEmail = ({ onResendMail }: IVerifyEmailProps) => {
  const theme = useTheme();
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
        Verify email address
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        color="textPrimary"
        align="center"
        mt={3}
      >
        A verification link was sent to your email address. Please check your
        email to complete registration.
      </Typography>

      <Box
        textAlign="center"
        m={2}
        sx={{
          background: theme.palette.background.paper,
          borderRadius: 10,
          padding: 2,
        }}
      >
        <Box>Didn’t receive the email?</Box>
        <Box>Check your Spam/Junk mail folder or</Box>
        <Box
          onClick={onResendMail}
          sx={{
            cursor: 'pointer',
            color: theme.palette.primary.main,
            fontWeight: 600,
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Resend verification email.
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyEmail;
