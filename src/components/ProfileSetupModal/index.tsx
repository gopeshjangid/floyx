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

import { useUpdateSettingsMutation } from '@/lib/redux/slices/accountSetting';
import { SVGUser } from '@/assets/images';
import { useCheckUsernameMutation } from '@/lib/redux/slices/registration';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxHeight: '90vh',
  //   minWidth: '60vw',
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
  const [
    updateSettings,
    {
      //   data: settingUpdateData,
      isLoading: settingUpdateLoading,
      //   error: settingUpdateError,
    },
  ] = useUpdateSettingsMutation();

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

  const debouncedCheckUserName = useCallback(
    debounce(username => username && checkUserName({ username }), 500),
    []
  );

  const updateAccountDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid: boolean = validateForm();

    if (isValid) {
      updateSettings({
        name: formData.name,
        username: formData.username,
      });
      onSubmit();
    }
  };

  const validateForm = () => {
    const tempErrors: any = {};
    if (!formData.name) tempErrors.name = 'Name is required!';
    if (formData.name.length > 25)
      tempErrors.name = 'Name must be less than 25 characters long';
    if (!formData.username) tempErrors.username = 'Username is required!';
    if (formData.username.length > 25)
      tempErrors.username = 'Username must be less than 25 characters long';

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
      <Modal open={open} onClose={handleClose} hideBackdrop>
        <Box sx={style}>
          <Box display="flex" gap={2} flexDirection="column">
            <Typography variant="h2">Profile Setup</Typography>

            <Typography>
              When creating an account in Floyx, enter your NAME and USERNAME
              under which you want to be visible to other users. You can also
              select Keep your original data to continue.
            </Typography>

            <Typography>
              Remember that you can change your NAME and USERNAME in your
              account settings at any time.
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
            component="form"
            noValidate
            mt={2}
            justifyContent="center"
            alignItems="center"
          >
            <Box component="form" noValidate onSubmit={updateAccountDetails}>
              <FormControl>
                <FormLabel required>Name</FormLabel>
                <TextField
                  name="name"
                  fullWidth
                  hiddenLabel
                  placeholder="Ex. Dustin Max"
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
                <FormLabel required>Username</FormLabel>
                <TextField
                  name="username"
                  fullWidth
                  hiddenLabel
                  placeholder="Ex. Dusti_69"
                  onChange={e => {
                    debouncedCheckUserName(e.target.value);
                    onChangeHandler(e);
                  }}
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
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="submit-btn"
                >
                  {settingUpdateLoading ? (
                    <>
                      <CircularProgress size={24} color="inherit" />
                      Submit
                    </>
                  ) : (
                    'Submit'
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
