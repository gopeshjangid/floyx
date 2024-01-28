import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';

import { useToast } from '@/components/Toast/useToast';
import { useLogin2faMutation } from '@/lib/redux/slices/registration';

const TwoStepAuth = ({ remember, username, password }: any) => {
  const toast = useToast();
  const [code, setCode] = React.useState<string>('');
  const [login2fa, { data, isLoading, error }] = useLogin2faMutation();
  console.log('TwoStepAuth ~ isLoading:', isLoading);
  console.log('TwoStepAuth ~ error:', error);
  console.log('TwoStepAuth ~ data:', data);

  useEffect(() => {
    if (data?.value?.code === 'success' && data?.value?.data === false) {
      toast.error('Invalid code');
    }
  }, [data]);

  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login2fa({
      name: username,
      password,
      remember,
      twoStepAuthenticationCode: code,
    });
  };

  return (
    <Grid item md={6} sm={12} zIndex="1">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '50px',
        }}
      >
        <Typography variant="h4">Two Step Auth</Typography>
        <Typography variant="h6">
          Open two-factor authentication app on your device to view your
          authentication code and verify your identity.
        </Typography>

        <Box component="form" mt={3} noValidate onSubmit={onsubmit}>
          <FormControl>
            <FormLabel>Authentication code</FormLabel>
            <TextField
              name="code"
              fullWidth
              hiddenLabel
              placeholder="xxxxxx"
              onChange={e => setCode(e.target.value)}
              value={code}
              autoFocus
            />
          </FormControl>

          <Button
            variant="contained"
            sx={{
              textAlign: 'center',
              width: '100%',
            }}
            disabled={code.length !== 6 || isLoading}
            type="submit"
          >
            {isLoading && <CircularProgress size={24} color="inherit" />}
            Verify
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default TwoStepAuth;
