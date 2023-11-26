'use client';

import React, { useState } from 'react';
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
  Theme,
  Typography,
  styled,
} from '@mui/material';
import { useRouter } from 'next/navigation';

import Wrapper from '@/components/wrapper';
import ThemeSwitch from '@/components/ThemeSwitcher';
import { SVGUser } from '@/assets/images';
import { useToast } from '@/components/Toast/useToast';
import { useUpdateMessageSettingsMutation, useUpdateSettingsMutation } from '@/lib/redux/slices/accountSetting';
import SVGEmail from '@/iconComponents/email';
import SVGExclamation from '@/iconComponents/exclamation';
import SVGDelete from '@/iconComponents/delete';

const AccountWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  '& .MuiInputBase-root': {
    background: theme.palette.background.default,
  },
  width: '80%',
  margin: '50px',
}));

interface ISettingAccount {
  name: string;
  username: string;
  email: string;
  enableMessage: boolean;
}

interface ISettingAccountFormError {
  name?: string;
  username?: string;
  email?: string;
  enableMessage?: boolean;
}

const AccountSetting = () => {
  const [updateSettings, { data: settingUpdateData, isLoading: settingUpdateLoading, error: settingUpdateError }] =
    useUpdateSettingsMutation();
  const [updateMessageSetting, { data: messageSettingUpdateData, isLoading: messageSettingLoading, error: messageSettingError }] =
    useUpdateMessageSettingsMutation();
  const toast = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState<ISettingAccount>({
    email: '',
    name: '',
    username: '',
    enableMessage: false,
  });
  const [formError, setFormError] = useState<ISettingAccountFormError>({});
  const isLoading = settingUpdateLoading || messageSettingLoading;

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
    if (formData.username === '') {
      err.username = 'Username is required!';
    }

    setFormError({ ...err });

    return Object.values(err).every(value => value === '');
  };

  const updateAccountDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid: boolean = validateForm();

    if (isValid) {
      // TODO:
      updateSettings({
        name: formData.name,
        username: formData.username,
        email: formData.email,
      });

      updateMessageSetting({
        allowPrivateMassages: formData.enableMessage,
      });
    }
  };

  return (
    <>
      <ThemeSwitch />
      <Wrapper sx={{ width: '70%', marginTop: '20px' }}>
        <AccountWrapper>
          <Box component="form" noValidate onSubmit={updateAccountDetails}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <TextField
                name="name"
                fullWidth
                hiddenLabel
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
              <FormLabel>Username</FormLabel>
              <TextField
                name="username"
                fullWidth
                hiddenLabel
                placeholder="Dusti_96"
                onChange={onChangeHandler}
                error={!!formError.username}
                helperText={formError.username}
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
              <Box display="flex" alignItems="center" justifyContent="left" gap={1}>
                <SVGExclamation />
                Email will not be publicly displayed
              </Box>
            </FormControl>

            <FormControl margin="normal">
              <FormControlLabel
                name="remember"
                control={<Checkbox defaultChecked={false} onChange={onChangeHandler} />}
                label="
                    Enable Message: Allow other users to send me private message"
              />
            </FormControl>

            <FormControl>
              <Button variant="contained" color="primary" type="submit" className="submit-btn">
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
          <Box
            display="flex"
            flexDirection={'column'}
            gap={0.5}
            mt={2}
            borderTop={theme => `1px solid ${theme.palette?.mode === 'light' ? '#E7F0FC' : 'rgba(255, 255, 255, 0.15)'}`}
          >
            <Typography mt={2} variant="subtitle2" color={theme => theme.palette.primary[100]}>
              Delete Account
            </Typography>

            <Typography variant="subtitle2" color={theme => theme.palette.primary[300]}>
              This can’t be reversed, so make sure you’re sure this is what you want
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
        </AccountWrapper>
      </Wrapper>
    </>
  );
};

export default AccountSetting;