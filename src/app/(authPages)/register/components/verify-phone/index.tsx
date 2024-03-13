import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface IVerifyPhoneProps {
  onSubmit?: (e: any) => void;
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
        {t('auth.register.label.text30')}
      </Typography>
      <Typography
        variant="h6"
        translate="no"
        gutterBottom
        color="textPrimary"
        align="center"
        mt={3}
      >
        {t('auth.register.label.text31')}
      </Typography>

      <Box component="form" noValidate textAlign="center" onSubmit={onSubmit}>
        <TextField
          sx={{
            marginY: '25px',
          }}
          fullWidth
          translate="no"
          hiddenLabel
          placeholder={t('auth.register.label.text32')}
          type="number"
          value={value}
          onChange={onChange}
        />

        <Button
          translate="no"
          disabled={submitLoading}
          variant="contained"
          color="primary"
          type="submit"
        >
          {submitLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            t('auth.register.label.text33')
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default VerifyPhone;
