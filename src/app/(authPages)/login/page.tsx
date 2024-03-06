'use client';

import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

import { allRoutes } from '@/constants/allRoutes';
import { useToast } from '@/components/Toast/useToast';
import { SVGArrowLeft, SVGLock, SVGUser } from '@/assets/images';
import LoginFooter from '../social-login/components/login-footer';
import TwoStepAuth from './_components/two-step-auth';
import { TWO_STEP_AUTH } from '@/constants';
import { useTranslation } from 'react-i18next';

interface ILogin {
  email: string;
  password: string;
  remember: boolean;
}

interface IFormError {
  email?: string;
  password?: string;
  remember?: string;
}

const Login: FC = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const { palette } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ILogin>({
    email: '',
    password: '',
    remember: false,
  });
  const [formError, setFormError] = useState<IFormError>({});
  const [show2fa, setShow2fa] = useState<boolean>(false);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid: boolean = validateForm();

    if (isValid) {
      setLoading(true);
      const response = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        remember: formData.remember,
        redirect: false,
      });

      if (response?.ok) {
        if (getCookie(TWO_STEP_AUTH) === 'true') {
          setShow2fa(true);
        } else {
          router.push(allRoutes.home);
          toast.success(t('auth.login.msg.msg1'));
        }
      } else {
        console.log('login error response', JSON.stringify(response));
        toast.error(response?.error || t('auth.login.msg.msg2'));
        setLoading(false);
      }
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'remember') {
      const copy = { ...formData };

      if (event.target.checked) {
        copy.remember = true;
      } else {
        copy.remember = false;
      }

      setFormData(copy);
    } else {
      setFormData(() => ({
        ...formData,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const validateForm = (): boolean => {
    const err: IFormError = {
      email: '',
      password: '',
      remember: '',
    };

    if (formData.email === '') {
      err.email = t('auth.login.msg.msg3');
    }
    if (formData.password === '') {
      err.password = t('auth.login.msg.msg4');
    } else {
      if (formData.password.length < 6) {
        err.password = t('auth.login.msg.msg5');
      }
    }

    setFormError({ ...err });

    return Object.values(err).every(value => value === '');
  };

  return (
    <>
      {show2fa && (
        <TwoStepAuth
          remember={formData.remember}
          username={formData.email}
          password={formData.password}
        />
      )}

      {!show2fa && (
        <Grid item md={6} sm={12} zIndex="1">
          <Box
            textAlign="center"
            padding={{ md: '47px 15px 40px', xs: '38px 25px 38px' }}
          >
            <Typography
              translate="no"
              variant="h5"
              fontSize="16px"
              color={palette.text.primary}
              marginBottom="26px"
            >
              {t('auth.login.text.text1')}
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              gap="24px"
              maxWidth="360px"
              marginInline="auto"
            >
              <Box mb="3px">
                <Button
                  translate="no"
                  variant="outlined"
                  className="outline-btn"
                  onClick={() => router.push(allRoutes.register)}
                >
                  {t('auth.login.text.text2')}
                </Button>
              </Box>
              <Typography
                translate="no"
                variant="h3"
                fontSize="24px"
                fontWeight="600"
                color={palette.text.primary}
                textAlign="left"
              >
                {t('auth.login.text.text3')}
              </Typography>
              <Box component="form" m={0} noValidate onSubmit={login}>
                <FormControl>
                  <FormLabel translate="no">
                    {t('auth.login.label.username')}{' '}
                  </FormLabel>
                  <TextField
                    name="email"
                    fullWidth
                    hiddenLabel
                    placeholder="Ex. Dustin Max"
                    onChange={onChangeHandler}
                    error={!!formError.email}
                    helperText={formError.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" color="primary">
                            <SVGUser />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <FormControl>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="start"
                    sx={{ '& label': { marginBottom: '0 !important' } }}
                    mb={1.5}
                  >
                    <FormLabel translate="no">
                      {t('auth.login.label.password')}
                    </FormLabel>
                    <Typography
                      fontSize="16px"
                      fontWeight="400"
                      sx={{ '& a': { color: '#5798FF' } }}
                    >
                      <Link
                        translate="no"
                        prefetch={false}
                        href={'/forgot-password'}
                      >
                        {t('auth.login.label.forgetLink')}
                      </Link>
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    hiddenLabel
                    placeholder="************"
                    type="password"
                    name="password"
                    onChange={onChangeHandler}
                    error={!!formError.password}
                    helperText={formError.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" color="primary">
                            <SVGLock />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <FormControl>
                  <Button
                    translate="no"
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={24} color="inherit" />
                        {t('auth.login.label.submit')}
                      </>
                    ) : (
                      t('auth.login.label.submit')
                    )}
                  </Button>
                </FormControl>
                <FormControl sx={{ marginBottom: '0 !important' }}>
                  <FormControlLabel
                    translate="no"
                    name="remember"
                    control={
                      <Checkbox
                        sx={{ paddingTop: '2px !important' }}
                        defaultChecked={false}
                        onChange={onChangeHandler}
                      />
                    }
                    label={t('auth.login.label.rememberMe')}
                  />
                </FormControl>
              </Box>
              <Box mt="3px">
                <Typography
                  translate="no"
                  variant="h6"
                  fontSize="16px"
                  fontWeight="400"
                  lineHeight="24px"
                  color={palette.primary[300]}
                  sx={{ '& a': { color: '#5798FF' } }}
                >
                  {t('auth.login.text.text4')}
                  <Link prefetch={false} href={allRoutes.termsAndConditions}>
                    {t('auth.login.text.text5')}
                  </Link>{' '}
                  {t('auth.login.text.text6')}
                  <Link prefetch={false} href={allRoutes.privacyPolicy}>
                    {t('auth.login.text.text7')}
                  </Link>
                  {t('auth.login.text.text8')}
                  <Link prefetch={false} href={allRoutes.cookiesPolicy}>
                    {t('auth.login.text.text9')}
                  </Link>
                </Typography>
              </Box>
              <Box translate="no" mt="20px" textAlign="left">
                <Link
                  prefetch={false}
                  href={allRoutes.socialLogin}
                  className="social-login"
                >
                  <SVGArrowLeft />
                  <span className="gradient-text">
                    {t('auth.login.text.text10')}
                  </span>
                </Link>
              </Box>
            </Box>
            <LoginFooter hideLinks />
          </Box>
        </Grid>
      )}
    </>
  );
};

export default Login;
