'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, FormControl, FormLabel, TextField, Theme, styled } from '@mui/material';

import Wrapper from '@/components/wrapper';
import { useToast } from '@/components/Toast/useToast';
import { useChangePasswordMutation } from '@/lib/redux/slices/accountSetting';
import { showErrorMessages } from '@/lib/utils';

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
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

interface IChangePasswordFormError {
  currentPassword?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
}

const AccountSetting = () => {
  const toast = useToast();
  const [changePassword, { data, isLoading, error }] = useChangePasswordMutation();

  const [formData, setFormData] = useState<IChangePassword>({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  });
  const [formError, setFormError] = useState<IChangePasswordFormError>({});

  useEffect(() => {
    if (data === 'success') {
      toast.success('Password changed successfully!');
      setFormData(() => ({
        ...formData,
        currentPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
      }));
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

    if (formData.currentPassword === '') {
      err.currentPassword = 'Current Password is required!';
    }
    if (formData.newPassword === '') {
      err.newPassword = 'New Password is required!';
    }
    if (formData.newPasswordConfirmation === '') {
      err.newPasswordConfirmation = 'New confirm passowrd is required!';
    }
    if (formData.newPassword !== formData.newPasswordConfirmation) {
      err.newPasswordConfirmation = 'New password and confirm password must be same!';
    }

    setFormError({ ...err });

    return Object.values(err).every(value => value === '');
  };

  const updateAccountDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid: boolean = validateForm();

    if (isValid) {
      changePassword(formData);
    }
  };

  return (
    <>
      <Wrapper
        sx={{
          maxWidth: {
            xs: '100%',
            sm: '70%',
          },
          marginTop: '20px',
        }}
      >
        <AccountWrapper>
          <Box component="form" noValidate onSubmit={updateAccountDetails}>
            <FormControl>
              <FormLabel>Current Password</FormLabel>
              <TextField
                name="currentPassword"
                fullWidth
                hiddenLabel
                placeholder="Enter your current password"
                value={formData.currentPassword}
                onChange={onChangeHandler}
                error={!!formError.currentPassword}
                helperText={formError.currentPassword}
              />
            </FormControl>

            <FormControl>
              <FormLabel>New Password</FormLabel>
              <TextField
                name="newPassword"
                fullWidth
                hiddenLabel
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
                placeholder="Enter your new password again"
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
                    Save Changes
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </FormControl>
          </Box>
        </AccountWrapper>
      </Wrapper>
    </>
  );
};

export default AccountSetting;
