'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  TextField,
  Theme,
  Typography,
  styled,
} from '@mui/material';

import Wrapper from '@/components/wrapper';
import { useToast } from '@/components/Toast/useToast';
import { showErrorMessages } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';
import { useVerifyResetPasswordMutation } from '@/lib/redux/slices/registration';

const AccountWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  '& .MuiInputBase-root': {
    background: theme.palette.background.default,
  },
  margin: '25px',
  [theme.breakpoints.up('md')]: {
    margin: '50px',
  },
}));

interface IChangePassword {
  newPassword: string;
  newPasswordConfirmation: string;
}

interface IChangePasswordFormError {
  newPassword?: string;
  newPasswordConfirmation?: string;
}

const ResetPasswordComponent = () => {
  const toast = useToast();
  const params = useParams();
  const [changePassword, { data, isLoading, error }] =
    useVerifyResetPasswordMutation();
  const router = useRouter();
  const [formData, setFormData] = useState<IChangePassword>({
    newPassword: '',
    newPasswordConfirmation: '',
  });

  const [formError, setFormError] = useState<IChangePasswordFormError>({});

  useEffect(() => {
    if (data === 'success') {
      toast.success('Password changed successfully!');
      router.push("/");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(showErrorMessages(error as string[]));
    }
  }, [error]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(() => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const validateForm = (): boolean => {
    const err: IChangePasswordFormError = {};

    if (formData.newPassword === '') {
      err.newPassword = 'New Password is required!';
    }
    if (formData.newPasswordConfirmation === '') {
      err.newPasswordConfirmation = 'New confirm passowrd is required!';
    }
    if (formData.newPassword !== formData.newPasswordConfirmation) {
      err.newPasswordConfirmation =
        'New password and confirm password must be same!';
    }

    setFormError({ ...err });

    return Object.values(err).every(value => value === '');
  };

  const updateAccountDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid: boolean = validateForm();

    if (isValid) {
      changePassword({password: formData.newPassword, token: params.token});
    }
  };

  return (
      <Wrapper
        sx={{
          maxWidth: {
            md: '100%',
            lg: '70%',
          },
          marginTop: '20px',
        }}
      >
         <Box py={1} pt={2}>
         <Typography>Set New Password</Typography>
         </Box>
        <AccountWrapper>
          <Box component="form" noValidate onSubmit={updateAccountDetails}>
            <FormControl>
              <FormLabel>New Password</FormLabel>
              <TextField
                name="newPassword"
                fullWidth
                hiddenLabel
                type='password'
                placeholder="Enter your new password"
                value={formData.newPassword}
                onChange={onChangeHandler}
                error={!!formError.newPassword}
                helperText={formError.newPassword}
              />
            </FormControl>

            <FormControl>
              <FormLabel>New password confirmation</FormLabel>
              <TextField
                name="newPasswordConfirmation"
                fullWidth
                hiddenLabel
                type='password'
                placeholder="Confirm password"
                value={formData.newPasswordConfirmation}
                onChange={onChangeHandler}
                error={!!formError.newPasswordConfirmation}
                helperText={formError.newPasswordConfirmation}
              />
            </FormControl>

            <FormControl margin="normal">
              <Button variant="contained" color="primary" type="submit">
                {isLoading ? (
                  <>
                    <CircularProgress size={24} color="inherit" />
                    Save
                  </>
                ) : (
                  'Save'
                )}
              </Button>
            </FormControl>
          </Box>

        </AccountWrapper>
      </Wrapper>
  );
};

export default ResetPasswordComponent;
