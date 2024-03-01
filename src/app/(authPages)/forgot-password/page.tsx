'use client';

import React, { FC, useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';
import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import { allRoutes } from '@/constants/allRoutes';
import { useToast } from '@/components/Toast/useToast';
import { SVGArrowLeft, SVGLock, SVGUser } from '@/assets/images';
import { useCheckEmailMutation, useResetPasswordMutation } from '@/lib/redux/slices/registration';
import { debounce } from '@/lib/utils';

interface ILogin {
  email: string;
}

interface IFormError {
  email?: string;
}

const ForgotPassword: FC = () => {
  const toast = useToast();
  const { palette } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ILogin>({
    email: '',
  });
  const [formError, setFormError] = useState<IFormError>({});

  const [checkEmail, { data: checkEmailData }] = useCheckEmailMutation();
  const [onResetPassword, {isSuccess, isError,error, isLoading:  isResetting}] = useResetPasswordMutation();

  useEffect(()=>{
    if(isSuccess){
      toast.success('Password reset successfully! Please check your email');
      setFormData({email: ''});
    }

    if(error){
      toast.error('Password could not reset successfully! Please try again!');
    }

    if(!isResetting){
      setLoading(false);
    }

  },[isResetting,error,isSuccess]);

  const onReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid: boolean = validateForm();

    if (isValid) {
      setLoading(true);
      onResetPassword(formData);
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
      if(email){
        debouncedCheckEmail(event.target.value)
      }
      setFormData(() => ({
        ...formData,
        [event.target.name]: event.target.value,
      }));
  };

  useEffect(() => {
    if (checkEmailData === 'success') {
      setFormError((prev: any) => ({
        ...prev,
        email: 'Email does not exists',
      }));
    }

    if (checkEmailData === 'email_in_use') {
      setFormError((prev: any) => ({
        ...prev,
        email: '',
      }));
    }
  }, [checkEmailData]);

  const debouncedCheckEmail = useCallback(
    debounce(mail => mail && checkEmail({ mail }), 500),
    []
  );

  const validateForm = (): boolean => {
    const err: IFormError = {
      email: '',
    };

    if (formData.email === '') {
      err.email = 'This field required!';
    }

    setFormError({ ...err });

    return Object.values(err).every(value => value === '');
  };

  return (
    <>
     
        <Grid item md={6} sm={12} zIndex="1">
          <Box
            textAlign="center"
            padding={{ md: '47px 15px 40px', xs: '38px 25px 38px' }}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap="24px"
              maxWidth="360px"
              marginInline="auto"
            >
              <Typography
                variant="h3"
                fontSize="24px"
                fontWeight="600"
                color={palette.text.primary}
                textAlign="left"
              >
                Reset your password
              </Typography>
              <Box component="form" m={0} noValidate onSubmit={onReset}>
                <FormControl>
                  <FormLabel>Enter your registered email </FormLabel>
                  <TextField
                    name="email"
                    fullWidth
                    hiddenLabel
                    placeholder="dustinmax@floyx.com..."
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
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="submit-btn"
                    disabled={loading || !!formError.email}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={24} color="inherit" />
                        Resetting...
                      </>
                    ) : (
                      'Reset'
                    )}
                  </Button>
                </FormControl>
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
          </Box>
        </Grid>
    </>
  );
};

export default ForgotPassword;
