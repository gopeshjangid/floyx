import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface IVerifyEmailProps {
  onResendMail: () => void;
}

const VerifyEmail = ({ onResendMail }: IVerifyEmailProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        translate="no"
        variant="h3"
        gutterBottom
        color="textPrimary"
        align="center"
      >
        {t('auth.register.label.text25')}
      </Typography>
      <Typography
        translate="no"
        variant="h6"
        gutterBottom
        color="textPrimary"
        align="center"
        mt={3}
      >
        {t('auth.register.label.text26')}
      </Typography>

      <Box
        translate="no"
        textAlign="center"
        m={2}
        sx={{
          background: theme.palette.background.paper,
          borderRadius: 10,
          padding: 2,
        }}
      >
        <Box> {t('auth.register.label.text27')}</Box>
        <Box>{t('auth.register.label.text28')}</Box>
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
          {t('auth.register.label.text29')}
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyEmail;
