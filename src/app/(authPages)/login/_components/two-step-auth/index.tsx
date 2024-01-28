import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useToast } from '@/components/Toast/useToast';
import {
  useLogin2faMutation,
  useLoginMutation,
} from '@/lib/redux/slices/registration';
import { allRoutes } from '@/constants/allRoutes';

const TwoStepAuth = ({ remember, username, password }: any) => {
  const toast = useToast();
  const router = useRouter();
  const [enableRecoveryCodes, setEnableRecoveryCodes] =
    React.useState<boolean>(false);

  const [code, setCode] = React.useState<string>('');
  const [recoveryCode, setRecoveryCode] = React.useState<string>('');
  const [login2fa, { data, isLoading, error }] = useLogin2faMutation();
  const [
    login,
    { data: loginData, isLoading: isLoadingLogin, error: loginError },
  ] = useLoginMutation();

  useEffect(() => {
    if (loginData?.value?.code === 'success') {
      router.replace(allRoutes.home);
      toast.success('Login successfully!');
    }
  }, [loginData]);

  useEffect(() => {
    if (loginData?.value?.code && loginData?.value?.code !== 'success') {
      toast.error('Invalid code');
    }
  }, [loginData, loginError]);

  useEffect(() => {
    if (error || loginError) {
      toast.error('something went wrong, try again');
    }
  }, [error]);

  useEffect(() => {
    if (data?.value?.code === 'success' && data?.value?.data === true) {
      router.replace(allRoutes.home);
      toast.success('Login successfully!');
    }
  }, [data]);

  useEffect(() => {
    if (data?.value?.code === 'success' && data?.value?.data === false) {
      toast.error('Invalid code');
    }
  }, [data]);

  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login2fa({
      name: username,
      password,
      remember,
      twoStepAuthenticationCode: code,
    });
  };

  const onsubmitRecoveryCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      name: username,
      password,
      remember,
      recoveryCode: recoveryCode,
    });
  };

  return (
    <Grid item md={6} sm={12} zIndex="1" mt={5}>
      {enableRecoveryCodes && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '0 auto',
            padding: '0 20px',
          }}
        >
          <Typography variant="h4">Recovery code</Typography>
          <Typography variant="h6">
            Enter your recovery code to verify your identity. The recovery code
            was provided to you when you enabled two-factor authentication for
            this profile.
          </Typography>

          <Box
            component="form"
            mt={3}
            noValidate
            onSubmit={onsubmitRecoveryCode}
          >
            <FormControl>
              <FormLabel>Recovery code</FormLabel>
              <TextField
                name="code"
                fullWidth
                hiddenLabel
                placeholder="XXXXX-XXXXX"
                onChange={e => setRecoveryCode(e.target.value)}
                value={recoveryCode}
                autoFocus
                inputProps={{
                  maxLength: 11,
                }}
              />
            </FormControl>

            <Button
              variant="contained"
              sx={{
                textAlign: 'center',
                width: '100%',
              }}
              disabled={recoveryCode.length !== 11 || isLoadingLogin}
              type="submit"
            >
              {isLoadingLogin && <CircularProgress size={24} color="inherit" />}
              Verify
            </Button>
          </Box>
        </Box>
      )}

      {!enableRecoveryCodes && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            margin: '0 auto',
            padding: '0 20px',
          }}
        >
          <Typography variant="h4">Two Step Auth</Typography>
          <Typography variant="h6">
            Open two-factor authentication app on your device to view your
            authentication code and verify your identity.
          </Typography>

          <Box component="form" mt={3} noValidate onSubmit={onsubmit}>
            <FormControl>
              <FormLabel>Authentication code</FormLabel>
              <TextField
                name="code"
                fullWidth
                hiddenLabel
                placeholder="XXXXXX"
                onChange={e => setCode(e.target.value)}
                value={code}
                autoFocus
                inputProps={{
                  maxLength: 6,
                }}
              />
            </FormControl>

            <Button
              variant="contained"
              sx={{
                textAlign: 'center',
                width: '100%',
              }}
              disabled={code.length !== 6 || isLoading}
              type="submit"
            >
              {isLoading && <CircularProgress size={24} color="inherit" />}
              Verify
            </Button>
          </Box>

          <Typography variant="h6">
            Don&apos;t have your app ?
            <Button onClick={() => setEnableRecoveryCodes(true)}>
              Enter recovery code
            </Button>
          </Typography>
        </Box>
      )}
    </Grid>
  );
};

export default TwoStepAuth;
