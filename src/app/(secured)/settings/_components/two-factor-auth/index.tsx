import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from '@mui/material';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import { TWO_STEP_AUTH } from '@/constants';
import { allRoutes } from '@/constants/allRoutes';
import { useDisable2faMutation } from '@/lib/redux/slices/accountSetting';
import { useToast } from '@/components/Toast/useToast';

const TwoFactorAuth = () => {
  const router = useRouter();
  const toast = useToast();
  const [disable2FAFn, { data, isLoading }] = useDisable2faMutation();
  const [isTwoStepAuthEnabled, setIsTwoStepAuthEnabled] = useState<boolean>(
    getCookie(TWO_STEP_AUTH) === 'true'
  );
  const { palette } = useTheme();

  useEffect(() => {
    if (data === 'success') {
      toast.success('2-step authentication has been disabled.');
      setIsTwoStepAuthEnabled(false);
      setCookie(TWO_STEP_AUTH, 'false');
    }
  }, [data]);

  const enable2FA = () => {
    router.push(allRoutes.recoveryCodes);
  };

  const disable2FA = () => {
    disable2FAFn({});
  };

  return (
    <>
      <Box
        mt={5}
        borderTop={`1px solid ${palette.action.border}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '10px',
        }}
      >
        <Typography variant="h6" gutterBottom mt={5}>
          2-step authentication
        </Typography>
        <Typography variant="body1" gutterBottom>
          Two-step authentication adds an extra layer of security to your
          account. In addition to your username and password, you’ll need to
          enter a code from your phone.
        </Typography>
      </Box>

      {!isTwoStepAuthEnabled && (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
        >
          <Button variant="contained" color="primary" onClick={enable2FA}>
            Enable 2-Factor Authentication
          </Button>
        </Box>
      )}

      {isTwoStepAuthEnabled && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <Typography variant="body1" gutterBottom>
            Two-step authentication is enabled.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={disable2FA}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <CircularProgress size={24} /> Disable 2-Factor Authentication
              </>
            ) : (
              'Disable 2-Factor Authentication'
            )}
          </Button>
        </Box>
      )}
    </>
  );
};

export default TwoFactorAuth;
