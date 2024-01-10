'use client';

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  Modal,
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
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  maxHeight: '90vh',
  minWidth: '80vw',
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 5,
};

const LoginModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
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
      });

      setLoading(false);

      if (response?.ok) {
        toast.success('Login successfully!');
        handleClose();
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
      {open && (
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
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
                  <FormLabel>Username or email </FormLabel>

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
                  <FormLabel>Password</FormLabel>

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
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Login'
                  )}
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
          </Box>
        </Modal>
      )}
      {!open && <Button onClick={() => setOpen(true)}>Login</Button>}
    </>
  );
};

export default LoginModal;
