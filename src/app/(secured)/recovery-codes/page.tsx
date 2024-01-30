'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  ListItem,
  ListItemText,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import Image from 'next/image';

import Wrapper from '@/components/wrapper';
import {
  useEnable2faFirstStepMutation,
  useEnable2faSecondStepMutation,
  useEnable2faVerifyStepMutation,
} from '@/lib/redux/slices/accountSetting';
import { useToast } from '@/components/Toast/useToast';
import { TWO_STEP_AUTH } from '@/constants';

const steps = ['Recovery Codes', 'Connect your app'];

const RecoveryCodes = () => {
  const toast = useToast();
  const { palette } = useTheme();
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);
  const [code, setCode] = useState('');

  const [enable2faFirstStep, { data, isLoading }] =
    useEnable2faFirstStepMutation();
  const [
    enable2faSecondStep,
    { data: secondStepData, isLoading: secondStepLoading },
  ] = useEnable2faSecondStepMutation();
  const [
    enable2faVerifyStep,
    {
      data: enable2faVerifyStepData,
      isLoading: enable2faVerifyStepLoading,
      error: enable2faVerifyStepError,
    },
  ] = useEnable2faVerifyStepMutation();

  useEffect(() => {
    if (
      enable2faVerifyStepData?.value?.code === 'invalid_code' ||
      enable2faVerifyStepError
    ) {
      toast.error('Invalid code');
    }
  }, [enable2faVerifyStepData, enable2faVerifyStepError]);

  useEffect(() => {
    if (enable2faVerifyStepData?.value?.code === 'success') {
      toast.success('2-step authentication has been enabled.');
      setCookie(TWO_STEP_AUTH, 'true');
      router.back();
    }
  }, [enable2faVerifyStepData]);

  useEffect(() => {
    enable2faFirstStep({});
  }, []);

  const handleNext = () => {
    if (activeStep === 0) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      enable2faSecondStep({});
    }

    if (activeStep === 1) {
      verify2faCode();
    }
  };

  const verify2faCode = () => {
    enable2faVerifyStep({ code });
  };

  const handleBack = () => {
    if (activeStep === 0) {
      router.back();
    } else {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    }
  };

  const onCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const codesList = data?.map((code: any, index: number) => {
    return (
      <ListItem key={code}>
        <ListItemText className="count">
          {index + 1}. {code}
        </ListItemText>
      </ListItem>
    );
  });

  const halfIndex = Math.ceil((codesList?.length || 0) / 2);
  const firstColumn = codesList?.slice(0, halfIndex);
  const secondColumn = codesList?.slice(halfIndex);

  return (
    <Wrapper>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          margin: 'auto',
          marginTop: '20px',
          padding: '20px',
          maxWidth: '60%',
        }}
      >
        <Typography variant="h2" my={5}>
          Enable 2-Step Authentication
        </Typography>

        <Stepper activeStep={activeStep}>
          {steps.map(label => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === 0 && (
          <>
            <Typography
              variant="h5"
              my={3}
              py={3}
              borderBottom={`1px solid ${palette.action.border}`}
            >
              Recovery codes are used to access your account in the event you
              cannot receive two-step authentication codes from the app on your
              phone.
            </Typography>

            <Typography variant="h6" my={3}>
              Keep these recovery codes in a safe place. If you loose your two
              step enabled device, these on-time use codes can be used in the
              listed order to log in to your account.
            </Typography>

            {isLoading && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  backgroundColor: palette.background.default,
                  padding: '10px',
                }}
              >
                <CircularProgress size={24} color="inherit" />
              </Box>
            )}

            {!isLoading && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  backgroundColor: palette.background.default,
                  padding: '10px',
                }}
              >
                <Box>{firstColumn}</Box>
                <Box>{secondColumn}</Box>
              </Box>
            )}

            <Typography variant="h6" my={3}>
              You can get new codes if you’re running low. When you generate new
              set the old one will no longer work.
            </Typography>
          </>
        )}

        {activeStep === 1 && (
          <>
            <Typography
              variant="h5"
              my={3}
              py={3}
              borderBottom={`1px solid ${palette.action.border}`}
            >
              Use as application on your phone to get two-step authentication
              codes when prompted. We recommend using apps such as Google
              Authentication, Authy, 1Password or LastPass Authenticator.
            </Typography>

            <Typography variant="h6" my={3}>
              Scan the image above with the two-step authentication app on your
              phone. After scanning the barcode image, the app will display a
              six-digit code that you can enter below.
            </Typography>

            {secondStepLoading && (
              <Box>
                <CircularProgress size={24} color="inherit" />
              </Box>
            )}

            {!secondStepLoading && (
              <Image
                src={secondStepData?.qrCodeImage}
                alt="qr code"
                height={200}
                width={200}
              />
            )}

            <Box component="form" mt={3} noValidate onSubmit={onCodeSubmit}>
              <FormControl>
                <FormLabel>
                  Enter the six-digit code from the application{' '}
                </FormLabel>
                <TextField
                  name="code"
                  fullWidth
                  hiddenLabel
                  placeholder="000000"
                  onChange={e => setCode(e.target.value)}
                  value={code}
                  inputProps={{ maxLength: 6 }}
                  autoFocus
                />
              </FormControl>
            </Box>
          </>
        )}

        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button
              onClick={handleNext}
              disabled={
                isLoading ||
                secondStepLoading ||
                (activeStep === 1 && enable2faVerifyStepLoading) ||
                (activeStep === 1 && code.length !== 6)
              }
              variant="contained"
            >
              {activeStep === 1 && enable2faVerifyStepLoading && (
                <CircularProgress size={24} color="inherit" />
              )}
              {activeStep === 0 && 'Next'}
              {activeStep === 1 && 'Finish'}
            </Button>
          </Box>
        </>
      </Box>
    </Wrapper>
  );
};

export default RecoveryCodes;
