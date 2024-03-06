'use client';

import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
  debounce,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { setCookie } from 'cookies-next';
import { useSession } from 'next-auth/react';

import { useUpdateSettingsMutation } from '@/lib/redux/slices/accountSetting';
import { SVGUser } from '@/assets/images';
import { useCheckUsernameMutation } from '@/lib/redux/slices/registration';
import { showErrorMessages } from '@/lib/utils';
import { useToast } from '../Toast/useToast';
import { FIRST_TIME_LOGIN_USING_SOCIAL } from '@/constants';
import { useTranslation } from 'react-i18next';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxHeight: '90vh',
  maxWidth: {
    xs: '90vw',
    md: '40vw',
  },
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 5,
  textAlign: 'center',
};

interface IProfileSetup {
  name: string;
  username: string;
}

interface IProfileSetupError {
  name?: string;
  username?: string;
}

const ProfileSetupModal = ({
  open,
  handleClose,
  onSubmit,
}: {
  open: boolean;
  handleClose: () => void;
  onSubmit: () => void;
}) => {
  const { t } = useTranslation();
  const toast = useToast();
  const { data: session, update } = useSession();

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

  const [
    updateSettings,
    {
      data: settingUpdateData,
      isLoading: settingUpdateLoading,
      error: settingUpdateError,
    },
  ] = useUpdateSettingsMutation();

  useEffect(() => {
    if (settingUpdateData === 'success') {
      onSubmit();
      handleUpdate({
        username: formData.username,
        name: formData.name,
      });
      setCookie(FIRST_TIME_LOGIN_USING_SOCIAL, 'false');
      // setCookie('FLOYX_UPDATED_USERNAME', formData.username);
      // setCookie('FLOYX_UPDATED_NAME', formData.name);
    }
  }, [settingUpdateData]);

  useEffect(() => {
    if (settingUpdateError) {
      toast.error(showErrorMessages([settingUpdateError] as any));
    }
  }, [settingUpdateError]);

  const [checkUserName, { data: checkUserNameData }] =
    useCheckUsernameMutation();

  const [formData, setFormData] = useState<IProfileSetup>({
    username: '',
    name: '',
  });
  const [formError, setFormError] = useState<IProfileSetupError>({});

  useEffect(() => {
    if (checkUserNameData && checkUserNameData === 'username_in_use') {
      setFormError((prev: any) => ({
        ...prev,
        username: t('comp.profile.msg.msg1'),
      }));
    }

    if (checkUserNameData === 'success') {
      setFormError((prev: any) => ({
        ...prev,
        username: '',
      }));
    }
  }, [checkUserNameData]);

  const debouncedCheckUserName = useCallback(
    debounce(username => username && checkUserName({ username }), 500),
    []
  );

  const updateAccountDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid: boolean = validateForm();

    if (isValid) {
      updateSettings({
        name: formData.name,
        username: formData.username,
      });
    }
  };

  const handleKeyPress = e => {
    const allowedCharacters = /^[a-zA-Z0-9_]+$/;
    if (!allowedCharacters.test(e.key)) {
      e.preventDefault();
    }
  };

  const validateForm = () => {
    const tempErrors: any = {};
    if (!formData.name) tempErrors.name = t('comp.profile.msg.msg2');
    if (formData.name.length > 25) tempErrors.name = t('comp.profile.msg.msg3');
    if (!formData.username) tempErrors.username = t('comp.profile.msg.msg4');
    if (formData.username.length > 25)
      tempErrors.username = t('comp.profile.msg.msg5');

    setFormError(tempErrors);
    return Object.values(tempErrors).every(value => value === '');
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(() => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: theme => theme.zIndex.drawer + 100,
        backdropFilter: 'blur(5px)',
      }}
      open={open}
    >
      <Modal disableEscapeKeyDown={true} open={open} onClose={handleClose} hideBackdrop>
        <Box sx={style}>
          <Box display="flex" gap={2} flexDirection="column">
            <Typography translate="no" variant="h2">
              {t('comp.profile.title')}
            </Typography>

            <Typography translate="no">
              {t('comp.profile.text.description')}
            </Typography>

            <Typography translate="no">
              {t('comp.profile.text.info')}
            </Typography>
          </Box>
          <Grid
            container
            spacing={1}
            gap={{
              xs: 2,
              sm: 2,
              md: 3,
            }}
            flexDirection="row"
            mt={2}
            justifyContent="center"
            alignItems="center"
          >
            <Box
              component="form"
              noValidate
              onSubmit={e => updateAccountDetails(e)}
            >
              <FormControl>
                <FormLabel translate="no" required>
                  {t('comp.profile.label.name')}
                </FormLabel>
                <TextField
                  translate="no"
                  name="name"
                  fullWidth
                  hiddenLabel
                  placeholder={t('comp.profile.placeholder.name')}
                  onChange={onChangeHandler}
                  error={!!formError.name}
                  helperText={formError.name}
                  inputProps={{ maxLength: 25 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" color="primary">
                          <SVGUser />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Box>{`${formData.name.length}/25`}</Box>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel translate="no" required>
                  {t('comp.profile.label.username')}
                </FormLabel>
                <TextField
                  translate="no"
                  name="username"
                  fullWidth
                  hiddenLabel
                  placeholder={t('comp.profile.placeholder.username')}
                  onChange={e => {
                    debouncedCheckUserName(e.target.value);
                    onChangeHandler(e);
                  }}
                  onKeyPress={handleKeyPress}
                  error={!!formError.username}
                  helperText={formError.username}
                  inputProps={{ maxLength: 25 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" color="primary">
                          <SVGUser />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Box>{`${formData.username.length}/25`}</Box>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <FormControl>
                <Button
                  translate="no"
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="submit-btn"
                >
                  {settingUpdateLoading ? (
                    <>
                      <CircularProgress size={24} color="inherit" />
                      {t('comp.profile.label.submit')}
                    </>
                  ) : (
                    t('comp.profile.label.submit')
                  )}
                </Button>
              </FormControl>
            </Box>
          </Grid>
        </Box>
      </Modal>
    </Backdrop>
  );
};

export default ProfileSetupModal;
