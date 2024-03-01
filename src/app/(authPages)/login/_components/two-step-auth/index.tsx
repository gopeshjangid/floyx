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
import { useTranslation } from 'react-i18next';

const TwoStepAuth = ({ remember, username, password }: any) => {
  const toast = useToast();
  const { t } = useTranslation();
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
      toast.success(t('auth.login.msg.msg1'));
    }
  }, [loginData]);

  useEffect(() => {
    if (loginData?.value?.code && loginData?.value?.code !== 'success') {
      toast.error(t('auth.login.msg.msg6'));
    }
  }, [loginData, loginError]);

  useEffect(() => {
    if (error || loginError) {
      toast.error(t('auth.login.msg.msg7'));
    }
  }, [error]);

  useEffect(() => {
    if (data?.value?.code === 'success' && data?.value?.data === true) {
      router.replace(allRoutes.home);
      toast.success(t('auth.login.msg.msg1'));
    }
  }, [data]);

  useEffect(() => {
    if (data?.value?.code === 'success' && data?.value?.data === false) {
      toast.error(t('auth.login.msg.msg6'));
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
          <Typography translate="no" variant="h4">
            {t('auth.login.text.text11')}
          </Typography>
          <Typography translate="no" variant="h6">
            {t('auth.login.text.text12')}
          </Typography>

          <Box
            component="form"
            mt={3}
            noValidate
            onSubmit={onsubmitRecoveryCode}
          >
            <FormControl>
              <FormLabel translate="no">
                {' '}
                {t('auth.login.text.text11')}
              </FormLabel>
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
              translate="no"
              variant="contained"
              sx={{
                textAlign: 'center',
                width: '100%',
              }}
              disabled={recoveryCode.length !== 11 || isLoadingLogin}
              type="submit"
            >
              {isLoadingLogin && <CircularProgress size={24} color="inherit" />}

              {t('auth.login.text.verify')}
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
          <Typography translate="no" variant="h4">
            {' '}
            {t('auth.login.text.steps')}
          </Typography>
          <Typography translate="no" variant="h6">
            {t('auth.login.text.twoFac')}
          </Typography>

          <Box component="form" mt={3} noValidate onSubmit={onsubmit}>
            <FormControl>
              <FormLabel translate="no">
                {t('auth.login.label.authen')}
              </FormLabel>
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
              translate="no"
              variant="contained"
              sx={{
                textAlign: 'center',
                width: '100%',
              }}
              disabled={code.length !== 6 || isLoading}
              type="submit"
            >
              {isLoading && <CircularProgress size={24} color="inherit" />}
              {t('auth.login.text.verify')}
            </Button>
          </Box>

          <Typography translate="no" variant="h6">
            {t('auth.login.label.dontHave')}
            <Button translate="no" onClick={() => setEnableRecoveryCodes(true)}>
              {t('auth.login.label.rCode')}
            </Button>
          </Typography>
        </Box>
      )}
    </Grid>
  );
};

export default TwoStepAuth;
