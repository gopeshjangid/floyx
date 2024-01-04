'use client';

import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';

import { useToast } from '../Toast/useToast';
import { allRoutes } from '@/constants/allRoutes';

interface ILogin {
  email: string;
  password: string;
}

interface IFormError {
  email?: string;
  password?: string;
}

const LoginHeader = () => {
  const session = useSession();
  const toast = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ILogin>({
    email: '',
    password: '',
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
        // redirect: false,
        callbackUrl: `${window.location.origin}/`,
      });

      setLoading(false);

      if (response?.ok) {
        toast.success('Login successfully!');
      } else {
        console.log('login error response', JSON.stringify(response));
        toast.error(response?.error || 'Something went wrong!');
      }
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(() => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const validateForm = (): boolean => {
    const err: IFormError = {
      email: '',
      password: '',
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

  if (session.status === 'authenticated' || session.status === 'loading') {
    return null;
  }

  return (
    <>
      <Grid
        container
        spacing={1}
        gap={{
          xs: 2,
          sm: 2,
          md: 3,
        }}
        flexDirection="row"
        component="form"
        noValidate
        onSubmit={login}
        mt={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <FormControl>
            <TextField
              margin="normal"
              name="email"
              hiddenLabel
              placeholder="Username or email"
              onChange={onChangeHandler}
              error={!!formError.email}
              helperText={formError.email}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <TextField
              margin="normal"
              hiddenLabel
              placeholder="Password"
              type="password"
              name="password"
              onChange={onChangeHandler}
              error={!!formError.password}
              helperText={formError.password}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </Grid>

        <Grid item>
          <Typography
            fontSize="16px"
            fontWeight="400"
            sx={{ '& a': { color: '#5798FF' } }}
          >
            <Link href={allRoutes.login}>Forgotten your password?</Link>
          </Typography>
        </Grid>

        <Grid item>
          <Link href={allRoutes.register}>
            <Button variant="outlined" size="large" disabled={loading}>
              Register Now
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginHeader;
