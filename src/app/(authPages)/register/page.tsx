'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  FormControl,
  FormLabel,
  useTheme,
  debounce,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import { SVGLock, SVGUser } from '@/assets/images';
import SVGEmail from '@/iconComponents/email';
import { allRoutes } from '@/constants/allRoutes';
import Phone from '@/components/Phone';
import {
  useCheckEmailMutation,
  useCheckUsernameMutation,
  useLazyCheckPhoneQuery,
  useRegisterMutation,
  useResendMailMutation,
  useVerifyOtpMutation,
} from '@/lib/redux/slices/registration';
import { useToast } from '@/components/Toast/useToast';
import { showErrorMessages } from '@/lib/utils';
import VerifyPhone from './components/verify-phone';
import VerifyEmail from './components/verify-email';

const RegisterPage = () => {
  const theme = useTheme();
  const toast = useToast();
  const router = useRouter();
  const { palette } = useTheme();
  const searchParams = useSearchParams();

  const [
    verifyOtp,
    { data: verifyOtpData, isLoading: verifyOtpLoading, error: verifyOtpError },
  ] = useVerifyOtpMutation();
  const [checkUserName, { data: checkUserNameData }] =
    useCheckUsernameMutation();
  const [checkRefferredUserName, { data: checkRefferedUserNameData }] =
    useCheckUsernameMutation();
  const [checkPhone, { data: checkPhoneData }] = useLazyCheckPhoneQuery();
  const [checkEmail, { data: checkEmailData }] = useCheckEmailMutation();
  const [registerUser, { data: registrationData, error, isLoading }] =
    useRegisterMutation();
  const [resendEmail] = useResendMailMutation();
  const [isReferred, setIsReferred] = useState<boolean>(false);

  const [isRegisteredSuccess, setIsRegisteredSuccess] = useState({
    value: false,
    type: '',
  });
  const [otp, setOtp] = useState<string>('');

  const debouncedCheckUserName = useCallback(
    debounce(username => username && checkUserName({ username }), 500),
    []
  );

  const debouncedCheckRefferedUserName = useCallback(
    debounce(username => username && checkRefferredUserName({ username }), 500),
    []
  );

  const debouncedCheckEmail = useCallback(
    debounce(mail => mail && checkEmail({ mail }), 500),
    []
  );

  const [termsAndConditions, setTermsAndCondition] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    confirmEmail: '',
    password: '',
    recommendedMe: false,
    recommended: '',
    phone: '',
  });

  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      const sanitizedToken = token.replace(/[^A-Za-z0-9+/]/g, '');
      const decodedToken = atob(sanitizedToken);
      const parsedToken = JSON.parse(decodedToken);

      const { username } = parsedToken;
      setFormData(prevState => ({
        ...prevState,
        recommendedMe: true,
        recommended: username,
      }));
    }
  }, []);

  const [formError, setFormError] = useState<any>({});

  useEffect(() => {
    if (formData.recommendedMe) {
      setIsReferred(true);
    } else {
      setIsReferred(false);
    }
  }, [formData.recommendedMe]);

  useEffect(() => {
    if (verifyOtpData === 'success') {
      router.push(allRoutes.login);
    }
  }, [verifyOtpData]);

  useEffect(() => {
    if (registrationData === 'success' && isReferred) {
      setIsRegisteredSuccess({
        value: true,
        type: 'phone',
      });
    }

    if (registrationData === 'success' && !isReferred) {
      setIsRegisteredSuccess({
        value: true,
        type: 'email',
      });
    }
  }, [registrationData]);

  useEffect(() => {
    if ((error as any)?.length > 0) {
      toast.error(showErrorMessages(error as any));
    }
  }, [error]);

  useEffect(() => {
    if (verifyOtpError) {
      toast.error(showErrorMessages([verifyOtpError] as any));
    }
  }, [verifyOtpError]);

  useEffect(() => {
    if (checkPhoneData && checkPhoneData === 'phone_number_already_used') {
      setFormError((prev: any) => ({
        ...prev,
        phone: 'Phone number already used',
      }));
    }

    if (checkPhoneData === 'success') {
      setFormError((prev: any) => ({
        ...prev,
        phone: '',
      }));
    }
  }, [checkPhoneData]);

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
    if (checkRefferedUserNameData && checkRefferedUserNameData === 'success') {
      setFormError((prev: any) => ({
        ...prev,
        recommended: 'User does not exist',
      }));
    }

    if (checkRefferedUserNameData === 'username_in_use') {
      setFormError((prev: any) => ({
        ...prev,
        recommended: '',
      }));
    }
  }, [checkRefferedUserNameData]);

  useEffect(() => {
    if (checkEmailData === 'email_in_use') {
      setFormError((prev: any) => ({
        ...prev,
        email: 'Email already exists',
      }));
    }

    if (checkEmailData === 'success') {
      setFormError((prev: any) => ({
        ...prev,
        email: '',
      }));
    }
  }, [checkEmailData]);

  const validateForm = () => {
    const tempErrors: any = {};
    if (!formData.name) tempErrors.name = 'Name is required!';
    if (formData.name.length > 25)
      tempErrors.name = 'Name must be less than 25 characters long';
    if (!formData.username) tempErrors.username = 'Username is required!';
    if (formData.username.length > 25)
      tempErrors.username = 'Username must be less than 25 characters long';
    if (!formData.email) tempErrors.email = 'Email is required!';
    if (!formData.email.match(/^\S+@\S+$/i))
      tempErrors.email = 'Email is invalid';
    if (formData.email !== formData.confirmEmail)
      tempErrors.confirmEmail = 'Emails do not match';
    if (!formData.password || formData.password.length < 6)
      tempErrors.password = 'Password must be at least 6 characters long';
    if (formData.recommendedMe && !formData.recommended)
      tempErrors.recommended = 'Please enter who recommended you to Floyx';
    if (formData.recommendedMe && formData.recommended.length > 25)
      tempErrors.recommended = 'Name must be less than 25 characters long';

    setFormError(tempErrors);
    return Object.values(tempErrors).every(value => value === '');
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (validateForm()) {
      registerUser({
        email: formData.email,
        emailConfirmation: formData.confirmEmail,
        name: formData.name,
        username: formData.username,
        password: formData.password,
        accountType: 'personal',
        acceptTerms: true,
        phoneNumber: formData.phone,
        isReferred: formData.recommendedMe,
        invitedbyUsername: formData.recommendedMe ? formData.recommended : '',
      });
    }
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.name === 'recommendedMe') {
      const copy: any = { ...formData };

      if ((event as any).target.checked) {
        copy.recommendedMe = true;
      } else {
        copy.recommendedMe = false;
      }

      setFormData(copy);
    } else {
      setFormData(() => ({
        ...formData,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const onResendMail = () => {
    resendEmail({
      mail: formData.email,
    });
  };

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ pt: 10 }}>
        {isRegisteredSuccess.value === true &&
          isRegisteredSuccess.type === 'phone' && (
            <VerifyPhone
              value={otp}
              onChange={e => setOtp(e.target.value)}
              submitLoading={verifyOtpLoading}
              onSubmit={e => {
                e.preventDefault();
                if (!otp) return;
                verifyOtp({
                  usernameOrEmail: formData.username,
                  otp: otp,
                });
              }}
            />
          )}

        {isRegisteredSuccess.value === true &&
          isRegisteredSuccess.type === 'email' && (
            <VerifyEmail onResendMail={onResendMail} />
          )}

        {!isRegisteredSuccess.value && (
          <>
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              align="center"
            >
              Create your account
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              color="textPrimary"
              align="center"
              mt={3}
            >
              Join for free today and keep your data safe in the digital space.
            </Typography>
            {formData.recommended && (
              <Typography
                variant="h6"
                gutterBottom
                color="textPrimary"
                align="center"
                mt={3}
              >
                Referred By{' '}
                <span style={{ color: '#00FF00' }}>{formData.recommended}</span>
              </Typography>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              my={5}
              p={5}
              border={`1px solid ${palette.action?.border}`}
              borderRadius="20px"
            >
              <Typography
                align="center"
                variant="h4"
                gutterBottom
                color="textPrimary"
              >
                Personal account
              </Typography>
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
                <FormControlLabel
                  name="recommendedMe"
                  control={
                    <Checkbox
                      defaultChecked={token ? true : false}
                      onChange={onChangeHandler}
                    />
                  }
                  label="Someone recommended Floyx to me (optional)"
                />
              </FormControl>

              {formData.recommendedMe && (
                <>
                  <TextField
                    name="recommended"
                    fullWidth
                    hiddenLabel
                    placeholder="Enter here..."
                    onChange={e => {
                      debouncedCheckRefferedUserName(e.target.value);
                      onChangeHandler(e);
                    }}
                    defaultValue={formData.recommended}
                    error={!!formError.recommended}
                    helperText={formError.recommended}
                    inputProps={{ maxLength: 25 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Box>
                            <Box>{`${formData.recommended.length}/25`}</Box>
                          </Box>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Phone
                    value={formData.phone}
                    onChange={onChangeHandler}
                    checkPhone={checkPhone}
                    error={formError.phone}
                  />
                </>
              )}

              <FormControl>
                <FormLabel required>Email address</FormLabel>
                <TextField
                  name="email"
                  fullWidth
                  hiddenLabel
                  placeholder="Ex. name@gmail.com"
                  onChange={e => {
                    debouncedCheckEmail(e.target.value);
                    onChangeHandler(e);
                  }}
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
              </FormControl>

              <FormControl>
                <FormLabel required>Email address confirmation</FormLabel>
                <TextField
                  name="confirmEmail"
                  fullWidth
                  hiddenLabel
                  placeholder="Enter your email address again"
                  onChange={onChangeHandler}
                  error={!!formError.confirmEmail}
                  helperText={formError.confirmEmail}
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
              </FormControl>

              <FormControl>
                <FormLabel required>Password(at least 6 characters)</FormLabel>

                <TextField
                  fullWidth
                  hiddenLabel
                  placeholder="************"
                  type="password"
                  name="password"
                  onChange={onChangeHandler}
                  error={!!formError.password}
                  helperText={formError.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" color="primary">
                          <SVGLock />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControlLabel
                label={
                  <Typography
                    fontSize="16px"
                    fontWeight="400"
                    sx={{ '& a': { color: '#5798FF', margin: '0 5px' } }}
                  >
                    {'By Clicking "Sign Up" You agree to Floyx\'s'}
                    <Link prefetch={false} href={allRoutes.termsAndConditions}>
                      Terms of Service
                    </Link>
                    ,
                    <Link prefetch={false} href={allRoutes.privacyPolicy}>
                      Privacy Policy
                    </Link>
                    {'and'}
                    <Link prefetch={false} href={allRoutes.cookiesPolicy}>
                      Cookie Policy
                    </Link>
                  </Typography>
                }
                control={
                  <Checkbox
                    checked={termsAndConditions}
                    onChange={e => setTermsAndCondition(e.target.checked)}
                  />
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2, mb: 2 }}
                disabled={isLoading || !termsAndConditions}
              >
                Sign Up
              </Button>

              <Typography
                fontSize="16px"
                fontWeight="400"
                sx={{ '& a': { color: '#5798FF' } }}
                align="center"
              >
                Already have an account?
                <Link prefetch={false} href={allRoutes.socialLogin}>
                  {' '}
                  Sign in
                </Link>
              </Typography>
            </Box>

            <Box
              sx={{
                p: 3,
                border: `1px solid ${palette.action?.border}`,
                borderRadius: '20px',
              }}
            >
              <Typography
                variant="body2"
                gutterBottom
                align="center"
                color={palette.primary[300]}
                sx={{ '& a': { color: '#5798FF' } }}
              >
                Administrator the body responsible for administration of data as
                per Article 4 (7) of GDPR, namely Floyx LLC. – owner and
                operator of Floyx platform and services, located in 16192
                Coastal Highway, Lewes, Delaware 19958, County of Sussex,
                registered by the Delaware Registered as a Limited Liability
                Company under Companies Act, 1961, registration number 6099676 (
                <Link prefetch={false} href={allRoutes.login}>
                  more about processing your data.
                </Link>
                )
              </Typography>
            </Box>

            <Box
              display="flex"
              gap="20px"
              flexDirection="column"
              p={5}
              sx={{ '& a': { color: '#5798FF' } }}
              justifyContent="center"
              alignItems="center"
            >
              <Link prefetch={false} href={allRoutes.login}>
                Old Token Panel
              </Link>

              <Typography variant="body1">
                2024 Powered by Floyx LLC.
              </Typography>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default RegisterPage;
