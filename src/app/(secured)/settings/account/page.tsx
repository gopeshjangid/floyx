'use client';

import React, { useCallback, useEffect, useState } from 'react';
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
  debounce,
  useTheme,
  styled
} from '@mui/material';

import Wrapper from '@/components/wrapper';
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
import { useCheckUsernameMutation } from '@/lib/redux/slices/registration';
import { useSession } from 'next-auth/react';

interface ISettingAccount {
  name: string;
  email: string;
  username: string;
  enableMessage: boolean;
}

interface ISettingAccountFormError {
  name?: string;
  email?: string;
  username?: string;
  enableMessage?: boolean;
}

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  "& .MuiFormControlLabel-label": {
    marginTop: '4px'
  }
}));

const AccountSetting = () => {
  const theme = useTheme();
  const [checkUserName, { data: checkUserNameData }] =
    useCheckUsernameMutation();

  const {
    data: settingsData,
    isLoading: getSettingLoading,
    error: getSettingError,
  } = useGetSettingsQuery({});

  const {
    data: getMessageSettingData,
    isLoading: getMessageSettingLoading,
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
      // data: messageSettingUpdateData,
      isLoading: messageSettingLoading,
      error: messageSettingError,
    },
  ] = useUpdateMessageSettingsMutation();

  const toast = useToast();
  const { data: session, update } = useSession();


  const [formData, setFormData] = useState<ISettingAccount>({
    email: '',
    name: '',
    username: '',
    enableMessage: false,
  });
  const [formError, setFormError] = useState<ISettingAccountFormError>({});

  const isUpdateLoading = settingUpdateLoading || messageSettingLoading;

  const debouncedCheckUserName = useCallback(
    debounce(username => username && checkUserName({ username }), 500),
    []
  );

  useEffect(() => {
    if (checkUserNameData && checkUserNameData === 'username_in_use') {
      setFormError((prev: any) => ({
        ...prev,
        username: 'Username already exists',
      }));
    }

    if (checkUserNameData === 'success') {
      setFormError((prev: any) => ({
        ...prev,
        username: '',
      }));
    }
  }, [checkUserNameData]);

  useEffect(() => {
    if (settingsData && getMessageSettingData) {
      setFormData({
        email: settingsData.email,
        name: settingsData.name,
        enableMessage: getMessageSettingData?.allowPrivateMassages,
        username: settingsData?.login,
      });
    }
  }, [settingsData, getMessageSettingData]);

  useEffect(() => {
    if (settingUpdateData === 'success') {
      toast.success('Account details updated successfully!');
      handleUpdate({
        username: formData.username,
        name: formData.name,
      });
    }
  }, [settingUpdateData]);

  // useEffect(() => {
  //   if (messageSettingUpdateData === 'success') {
  //     toast.success('Message settings updated successfully!');
  //   }
  // }, [messageSettingUpdateData]);
  useEffect(() => {
    if (settingUpdateError) {
      toast.error(settingUpdateError as string);
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

  const onChangeHandler = (event: React.ChangeEvent<any>) => {
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
        timezone: null,
        username: formData?.username || '',
      });

      updateMessageSetting({
        allowPrivateMassages: formData.enableMessage,
      });
    }
  };

  function handleUpdate({ username, name }: any) {
    update({
      ...session,
      user: {
        ...session?.user,
        username: username,
        name: name,
        firstname: name.split(' ')[0],
        lastname: name.split(' ')[1],
      },
    });
  }

  if (getSettingLoading || getMessageSettingLoading) {
    return <AccountSettingSkeleton />;
  }

  return (
    <>
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
              <FormLabel>Username</FormLabel>
              <TextField
                name="username"
                fullWidth
                hiddenLabel
                value={formData.username}
                placeholder="Ex. Dusti_69"
                onChange={e => {
                  debouncedCheckUserName(e.target.value);
                  onChangeHandler(e);
                }}
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
              <Box
                display="flex"
                alignItems="center"
                justifyContent="left"
                gap={1}
              >
                <SVGExclamation />
                You can change once every 30 days
              </Box>
            </FormControl>

            <FormControl sx={{ mt: 2 }}>
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
                        <SVGEmail color={theme.palette.primary[100]} />
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
              <StyledFormControlLabel
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
              onClick={()=>{   toast.success('Please Wait...');
              window.location.href = "mailto:data.protection@floyx.com?subject=Account Deletion Request";}}
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
