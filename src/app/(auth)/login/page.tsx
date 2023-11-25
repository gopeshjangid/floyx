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

import { allRoutes } from '@/constants/allRoutes';
import { useToast } from '@/components/Toast/useToast';
import { SVGArrowLeft, SVGLock, SVGUser } from '@/assets/images';
import LoginFooter from '../social-login/components/login-footer';

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

      console.log('login response', response);
      setLoading(false);

      if (response?.ok) {
        router.replace(allRoutes.home);
        toast.success('Login successfully!');
      } else {
        toast.error(response?.error || 'Something went wrong!');
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
      err.email = 'Email required!';
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
    <Grid item md={6} sm={12} zIndex="1">
      <Box textAlign="center" padding={{ md: '47px 15px 40px', xs: '38px 25px 38px' }}>
        <Typography variant="h5" fontSize="16px" color={palette.text.primary} marginBottom="26px">
          Join for free today and keep your data safe in the digital Space{' '}
        </Typography>
        <Box display="flex" flexDirection="column" gap="24px" maxWidth="360px" marginInline="auto">
          <Box mb="3px">
            <Button variant="outlined" className="outline-btn" onClick={() => router.push(allRoutes.register)}>
              Create an account
            </Button>
          </Box>
          <Typography variant="h3" fontSize="24px" fontWeight="600" color={palette.text.primary} textAlign="left">
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
                <Typography fontSize="16px" fontWeight="400" sx={{ '& a': { color: '#5798FF' } }}>
                  <Link href={allRoutes.login}>Forgotten your password?</Link>
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
              <Button variant="contained" color="primary" type="submit" className="submit-btn">
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
                control={<Checkbox defaultChecked={false} onChange={onChangeHandler} />}
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
              color={palette.primary[200]}
              sx={{ '& a': { color: '#5798FF' } }}
            >
              By signing up,you agree to
              <Link href="/"> Terms of Service </Link> and
              <Link href="/"> Privacy Policy, </Link>
              including <Link href="/"> Cookie Use.</Link>
            </Typography>
          </Box>
          <Box mt="20px" textAlign="left">
            <Link href={allRoutes.socialLogin} className="social-login">
              <SVGArrowLeft />
              <span className="gradient-text">Back to social login</span>
            </Link>
          </Box>
        </Box>
        <LoginFooter />
      </Box>
    </Grid>
  );
};

export default Login;
