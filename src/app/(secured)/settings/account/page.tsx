'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';

import Wrapper from '@/components/wrapper';
import ThemeSwitch from '@/components/ThemeSwitcher';
import { SVGUser } from '@/assets/images';
import { useToast } from '@/components/Toast/useToast';
import {
  useGetMessageSettingsQuery,
  useGetSettingsQuery,
  useUpdateMessageSettingsMutation,
  useUpdateSettingsMutation,
} from '@/lib/redux/slices/accountSetting';
import SVGEmail from '@/iconComponents/email';
import SVGExclamation from '@/iconComponents/exclamation';
import SVGDelete from '@/iconComponents/delete';
import { showErrorMessages } from '@/lib/utils';
import { SettingWrapper } from '../styled';
import AccountSettingSkeleton from './loading';

interface ISettingAccount {
  name: string;
  email: string;
  enableMessage: boolean;
}

interface ISettingAccountFormError {
  name?: string;
  email?: string;
  enableMessage?: boolean;
}

const AccountSetting = () => {
  const {
    data: settingsData,
    isFetching: getSettingLoading,
    error: getSettingError,
  } = useGetSettingsQuery({});

  const {
    data: getMessageSettingData,
    isFetching: getMessageSettingLoading,
    error: getMessageSettingError,
  } = useGetMessageSettingsQuery({});

  const [
    updateSettings,
    {
      data: settingUpdateData,
      isLoading: settingUpdateLoading,
      error: settingUpdateError,
    },
  ] = useUpdateSettingsMutation();
  const [
    updateMessageSetting,
    {
      data: messageSettingUpdateData,
      isLoading: messageSettingLoading,
      error: messageSettingError,
    },
  ] = useUpdateMessageSettingsMutation();

  const toast = useToast();

  const [formData, setFormData] = useState<ISettingAccount>({
    email: '',
    name: '',
    enableMessage: false,
  });
  const [formError, setFormError] = useState<ISettingAccountFormError>({});

  const isUpdateLoading = settingUpdateLoading || messageSettingLoading;

  useEffect(() => {
    if (settingsData && getMessageSettingData) {
      setFormData({
        email: settingsData.email,
        name: settingsData.name,
        enableMessage: getMessageSettingData?.allowPrivateMassages,
      });
    }
  }, [settingsData, getMessageSettingData]);

  useEffect(() => {
    if (settingUpdateData === 'success') {
      toast.success('Account details updated successfully!');
    }
  }, [settingUpdateData]);

  useEffect(() => {
    if (messageSettingUpdateData === 'success') {
      toast.success('Message settings updated successfully!');
    }
  }, [messageSettingUpdateData]);

  useEffect(() => {
    if (settingUpdateError) {
      toast.error(showErrorMessages(settingUpdateError as string[]));
    }
  }, [settingUpdateError]);

  useEffect(() => {
    if (messageSettingError) {
      toast.error(showErrorMessages(messageSettingError as string[]));
    }
  }, [messageSettingError]);

  useEffect(() => {
    if (getSettingError) {
      toast.error(showErrorMessages(getSettingError as string[]));
    }
  }, [getSettingError]);

  useEffect(() => {
    if (getMessageSettingError) {
      toast.error(showErrorMessages(getMessageSettingError as string[]));
    }
  }, [getMessageSettingError]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'enableMessage') {
      const copy = { ...formData };

      if (event.target.checked) {
        copy.enableMessage = true;
      } else {
        copy.enableMessage = false;
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
    const err: ISettingAccountFormError = {};

    if (formData.email === '') {
      err.email = 'Email is required!';
    }
    if (formData.name === '') {
      err.name = 'Name is required!';
    }

    setFormError({ ...err });

    return Object.values(err).every(value => value === '');
  };

  const updateAccountDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid: boolean = validateForm();

    if (isValid) {
      updateSettings({
        name: formData.name,
        email: formData.email,
      });

      updateMessageSetting({
        allowPrivateMassages: formData.enableMessage,
      });
    }
  };

  if (getSettingLoading || getMessageSettingLoading) {
    return <AccountSettingSkeleton />;
  }

  return (
    <>
      <ThemeSwitch />
      <Wrapper
        sx={{
          maxWidth: {
            md: '100%',
            lg: '70%',
          },
          marginTop: '20px',
        }}
      >
        <SettingWrapper>
          <Box component="form" noValidate onSubmit={updateAccountDetails}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <TextField
                name="name"
                fullWidth
                hiddenLabel
                value={formData.name}
                placeholder="Dustin Max"
                onChange={onChangeHandler}
                error={!!formError.name}
                helperText={formError.name}
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
              <FormLabel>Email address</FormLabel>
              <TextField
                name="email"
                fullWidth
                hiddenLabel
                value={formData.email}
                placeholder="name@gmail.com"
                onChange={onChangeHandler}
                error={!!formError.email}
                helperText={formError.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" color="primary">
                        <SVGEmail />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="left"
                gap={1}
              >
                <SVGExclamation />
                Email will not be publicly displayed
              </Box>
            </FormControl>

            <FormControl margin="normal">
              <FormControlLabel
                name="enableMessage"
                control={
                  <Checkbox
                    checked={formData.enableMessage}
                    onChange={onChangeHandler}
                  />
                }
                label="
                    Enable Message: Allow other users to send me private message"
              />
            </FormControl>

            <FormControl>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="submit-btn"
              >
                {isUpdateLoading ? (
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
          <Box
            display="flex"
            flexDirection={'column'}
            gap={0.5}
            mt={2}
            borderTop={theme =>
              `1px solid ${
                theme.palette?.mode === 'light'
                  ? '#E7F0FC'
                  : 'rgba(255, 255, 255, 0.15)'
              }`
            }
          >
            <Typography
              mt={2}
              variant="subtitle2"
              color={theme => theme.palette.primary[100]}
            >
              Delete Account
            </Typography>

            <Typography
              variant="subtitle2"
              color={theme => theme.palette.primary[300]}
            >
              This can’t be reversed, so make sure you’re sure this is what you
              want
            </Typography>

            <Button
              variant="outlined"
              color="error"
              sx={{
                border: theme => `1px solid ${theme.palette.error.main}`,
                borderRadius: '10px',
              }}
            >
              <SVGDelete /> Delete Account
            </Button>
          </Box>
        </SettingWrapper>
      </Wrapper>
    </>
  );
};

export default AccountSetting;
