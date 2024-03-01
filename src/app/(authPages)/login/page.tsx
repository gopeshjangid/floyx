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
          toast.success('Login successfully!');
        }
      } else {
        console.log('login error response', JSON.stringify(response));
        toast.error(response?.error || 'Something went wrong!');
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
      err.email = 'This field required!';
    }
    if (formData.password === '') {
      err.password = 'Password is required!';
    } else {
      if (formData.password.length < 6) {
        err.password = 'Password should greater than 6 characters!';
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
              variant="h5"
              fontSize="16px"
              color={palette.text.primary}
              marginBottom="26px"
            >
              Join for free today and keep your data safe in the digital Space{' '}
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
                  variant="outlined"
                  className="outline-btn"
                  onClick={() => router.push(allRoutes.register)}
                >
                  Create an account
                </Button>
              </Box>
              <Typography
                variant="h3"
                fontSize="24px"
                fontWeight="600"
                color={palette.text.primary}
                textAlign="left"
              >
                Login to your account
              </Typography>
              <Box component="form" m={0} noValidate onSubmit={login}>
                <FormControl>
                  <FormLabel>Username or email </FormLabel>
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
                    <FormLabel>Password</FormLabel>
                    <Typography
                      fontSize="16px"
                      fontWeight="400"
                      sx={{ '& a': { color: '#5798FF' } }}
                    >
                      <Link prefetch={false} href={"/forgot-password"}>
                        Forgotten your password?
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
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={24} color="inherit" />
                        Submit
                      </>
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </FormControl>
                <FormControl sx={{ marginBottom: '0 !important' }}>
                  <FormControlLabel
                    name="remember"
                    control={
                      <Checkbox sx={{ paddingTop: '2px !important'}}
                        defaultChecked={false}
                        onChange={onChangeHandler}
                      />
                    }
                    label="Remember me"
                  />
                </FormControl>
              </Box>
              <Box mt="3px">
                <Typography
                  variant="h6"
                  fontSize="16px"
                  fontWeight="400"
                  lineHeight="24px"
                  color={palette.primary[300]}
                  sx={{ '& a': { color: '#5798FF' } }}
                >
                  By signing in, you agree to
                  <Link prefetch={false} href={allRoutes.termsAndConditions}>
                    Terms of Service{' '}
                  </Link>{' '}
                  and
                  <Link prefetch={false} href={allRoutes.privacyPolicy}>
                    {' '}
                    Privacy Policy,{' '}
                  </Link>
                  including
                  <Link prefetch={false} href={allRoutes.cookiesPolicy}>
                    {' '}
                    Cookie Use.
                  </Link>
                </Typography>
              </Box>
              <Box mt="20px" textAlign="left">
                <Link
                  prefetch={false}
                  href={allRoutes.socialLogin}
                  className="social-login"
                >
                  <SVGArrowLeft />
                  <span className="gradient-text">Back to social login</span>
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
