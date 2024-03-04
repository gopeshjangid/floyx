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
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import FloyxImage from '@/iconComponents/floyxIcon';
import { useToast } from '../Toast/useToast';
import { allRoutes } from '@/constants/allRoutes';
import { useDispatch } from 'react-redux';
import { setLoginModal } from '@/lib/redux/slices/appConfig';
import useDevice from '@/lib/hooks/useDevice';
import { useTranslation } from 'react-i18next';

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
  width: '100%',
  maxHeight: '90vh',
  minWidth: '20vw',
  maxWidth: '390px',
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  padding: 2,
};

const LoginModal = ({ isForceOpened }: { isForceOpened?: boolean }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isMobile } = useDevice();
  const { palette } = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    if (isForceOpened) {
      dispatch(setLoginModal(false));
    }
    setOpen(false);
  };
  const session = useSession();
  const toast = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ILogin>({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState<IFormError>({});

  useEffect(() => {
    if (isForceOpened) {
      setOpen(isForceOpened);
    }
  }, [isForceOpened]);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid: boolean = validateForm();

    if (isValid) {
      setLoading(true);
      const response = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        remember: false,
        redirect: false,
      });

      setLoading(false);
      if (response?.ok) {
        toast.success(t('comp.login.toastMsg.msg1'));
        handleClose();
      } else {
        console.log('login error response', JSON.stringify(response));
        toast.error(JSON.stringify(response) || t('comp.login.toastMsg.msg2'));
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
      err.email = t('comp.login.toastMsg.msg3');
    }
    if (formData.password === '') {
      err.password = t('comp.login.toastMsg.msg4');
    } else {
      if (formData.password.length < 6) {
        err.password = t('comp.login.toastMsg.msg5');
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
          <Box sx={{ ...style, top: isMobile ? '40%' : '50%' }}>
            <Box>
              <FloyxImage
                fill={
                  palette.mode === 'dark'
                    ? palette.common.white
                    : palette.common.black
                }
              />
            </Box>
            <Grid
              container
              spacing={1}
              component="form"
              noValidate
              onSubmit={login}
              mt={2}
              alignItems="center"
            >
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel translate="no">
                    {t('comp.login.placeholder.email')}
                  </FormLabel>

                  <TextField
                    translate="no"
                    margin="normal"
                    name="email"
                    hiddenLabel
                    placeholder={t('comp.login.placeholder.email')}
                    onChange={onChangeHandler}
                    autoFocus
                    error={!!formError.email}
                    helperText={formError.email}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel translate="no">
                    {t('comp.login.placeholder.password')}
                  </FormLabel>

                  <TextField
                    translate="no"
                    margin="normal"
                    hiddenLabel
                    placeholder={t('comp.login.placeholder.password')}
                    type="password"
                    name="password"
                    onChange={onChangeHandler}
                    error={!!formError.password}
                    helperText={formError.password}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={6}>
                <Button
                  translate="no"
                  variant="contained"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    t('comp.login.text.login')
                  )}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Link href={allRoutes.register}>
                  <Button
                    translate="no"
                    variant="outlined"
                    size="large"
                    disabled={loading}
                  >
                    {t('comp.login.text.register')}
                  </Button>
                </Link>
              </Grid>
              <Grid item sm={12} xs={12}>
                <Typography
                  translate="no"
                  fontSize="16px"
                  fontWeight="400"
                  sx={{ '& a': { color: '#5798FF' } }}
                >
                  <Link translate="no" href={allRoutes.login}>
                    {t('comp.login.text.forgetLink')}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}
      {!open && (
        <Button translate="no" onClick={() => setOpen(true)}>
          {t('comp.login.text.login')}
        </Button>
      )}
    </>
  );
};

export default LoginModal;
