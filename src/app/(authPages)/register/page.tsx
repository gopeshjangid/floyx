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
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
  const theme = useTheme();
  const toast = useToast();
  const router = useRouter();
  const { palette } = useTheme();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
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
    referred: '',
    isReferred: false,
    phone: '',
  });

  const token = searchParams.get('token');

  function getValidJSON(jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      return false; // JSON is invalid
    }
  }

  useEffect(() => {
    if (token) {
      const sanitizedToken = token.replace(/[^A-Za-z0-9+/]/g, '');
      const decodedToken = atob(sanitizedToken);
      const parsedToken = getValidJSON(decodedToken);
      if (parsedToken) {
        const { username } = parsedToken;
        setFormData(prevState => ({
          ...prevState,
          referred: username,
          isReferred: true,
        }));
      }
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
    if (verifyOtpData === 'phone_number_verified_successfully') {
      setIsRegisteredSuccess({
        value: true,
        type: 'email',
      });
    }
  }, [verifyOtpData]);

  useEffect(() => {
    if (
      registrationData === 'success' &&
      (formData.isReferred || (formData.phone && formData.recommendedMe))
    ) {
      setIsRegisteredSuccess({
        value: true,
        type: 'phone',
      });
    }
    if (
      registrationData === 'success' &&
      !formData.isReferred &&
      !formData.recommendedMe
    ) {
      setIsRegisteredSuccess({
        value: true,
        type: 'email',
      });
    }
  }, [registrationData, formData]);

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
        phone: t('auth.register.msg.msg1'),
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
        username: t('auth.register.msg.msg2'),
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
        recommended: t('auth.register.msg.msg3'),
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
        email: t('auth.register.msg.msg4'),
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
    if (!formData.name) tempErrors.name = t('auth.register.msg.msg5');
    if (formData.name.length > 25)
      tempErrors.name = t('auth.register.msg.msg7');
    if (!formData.username) tempErrors.username = t('auth.register.msg.msg6');
    if (formData.username.length > 25)
      tempErrors.username = t('auth.register.msg.msg8');
    if (!formData.email) tempErrors.email = t('auth.register.msg.msg9');
    if (!formData.email.match(/^\S+@\S+$/i))
      tempErrors.email = t('auth.register.msg.msg10');
    if (formData.email !== formData.confirmEmail)
      tempErrors.confirmEmail = t('auth.register.msg.msg11');
    if (!formData.password || formData.password.length < 6)
      tempErrors.password = t('auth.register.msg.msg12');
    if (formData.recommendedMe && !formData.recommended)
      tempErrors.recommended = t('auth.register.msg.msg13');
    if (formData.recommendedMe && formData.recommended.length > 25)
      tempErrors.recommended = t('auth.register.msg.msg14');

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
        isReferred: formData.isReferred,
        invitedbyUsername: formData?.recommendedMe
          ? formData.recommended
          : formData.isReferred
            ? formData.referred
            : '',
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
        copy.isReferred = true;
      } else {
        copy.recommendedMe = false;
        copy.isReferred = false;
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
              translate="no"
              variant="h3"
              gutterBottom
              color="textPrimary"
              align="center"
            >
              {t('auth.register.label.text1')}
            </Typography>
            <Typography
              translate="no"
              variant="h6"
              gutterBottom
              color="textPrimary"
              align="center"
              mt={3}
            >
              {t('auth.register.label.text2')}
            </Typography>
            {token && (
              <Typography
                translate="no"
                variant="h6"
                gutterBottom
                color="textPrimary"
                align="center"
                mt={3}
              >
                {t('auth.register.label.text3')}

                <span style={{ color: '#00FF00' }}>{formData.referred}</span>
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
                translate="no"
                align="center"
                variant="h4"
                gutterBottom
                color="textPrimary"
              >
                {t('auth.register.label.text4')}
              </Typography>
              <FormControl>
                <FormLabel translate="no" required>
                  {t('auth.register.label.text5')}
                </FormLabel>
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
                <FormLabel translate="no" required>
                  {t('auth.register.label.text6')}
                </FormLabel>
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
                  inputProps={{ maxLength: 15 }}
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
                        <Box>{`${formData.username.length}/15`}</Box>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              {(formData.referred || formData.recommendedMe) && (
                <Phone
                  value={formData.phone}
                  onChange={onChangeHandler}
                  checkPhone={checkPhone}
                  error={formError.phone}
                />
              )}

              {!formData.referred && (
                <FormControl
                  sx={{
                    '&': {
                      '.MuiFormControlLabel-label': {
                        marginBottom: '0rem',
                      },
                    },
                  }}
                >
                  <FormControlLabel
                    translate="no"
                    name="recommendedMe"
                    control={
                      <Checkbox
                        sx={{ paddingTop: '2px !important' }}
                        defaultChecked={token ? true : false}
                        onChange={onChangeHandler}
                      />
                    }
                    labelPlacement="end"
                    label={t('auth.register.label.text7')}
                  />
                </FormControl>
              )}

              {formData.recommendedMe && (
                <>
                  <FormControl>
                    <FormLabel translate="no" required>
                      {t('auth.register.label.text8')}
                    </FormLabel>
                    <TextField
                      translate="no"
                      name="recommended"
                      fullWidth
                      hiddenLabel
                      placeholder={t('auth.register.label.text9')}
                      onChange={e => {
                        debouncedCheckRefferedUserName(e.target.value);
                        onChangeHandler(e);
                      }}
                      defaultValue={formData.recommended}
                      error={!!formError.recommended}
                      helperText={formError.recommended}
                      inputProps={{ maxLength: 15 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Box>
                              <Box>{`${formData.recommended.length}/15`}</Box>
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </>
              )}

              <FormControl>
                <FormLabel required translate="no">
                  {t('auth.register.label.text10')}
                </FormLabel>
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
                <FormLabel translate="no" required>
                  {t('auth.register.label.text11')}
                </FormLabel>
                <TextField
                  translate="no"
                  name="confirmEmail"
                  fullWidth
                  hiddenLabel
                  placeholder={t('auth.register.label.text12')}
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
                <FormLabel translate="no" required>
                  {t('auth.register.label.text13')}
                </FormLabel>

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
                    translate="no"
                    fontSize="16px"
                    fontWeight="400"
                    sx={{ '& a': { color: '#5798FF', margin: '0 5px' } }}
                  >
                    {t('auth.register.label.text14')}
                    <Link prefetch={false} href={allRoutes.termsAndConditions}>
                      {t('auth.register.label.text15')}
                    </Link>
                    ,
                    <Link prefetch={false} href={allRoutes.privacyPolicy}>
                      {t('auth.register.label.text16')}
                    </Link>
                    {t('auth.register.label.text17')}
                    <Link prefetch={false} href={allRoutes.cookiesPolicy}>
                      {t('auth.register.label.text18')}
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
                translate="no"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2, mb: 2 }}
                disabled={isLoading || !termsAndConditions}
              >
                {t('auth.register.label.text19')}
              </Button>

              <Typography
                translate="no"
                fontSize="16px"
                fontWeight="400"
                sx={{ '& a': { color: '#5798FF' } }}
                align="center"
              >
                {t('auth.register.label.text20')}

                <Link prefetch={false} href={allRoutes.socialLogin}>
                  {t('auth.register.label.text21')}
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
                translate="no"
                variant="body2"
                gutterBottom
                align="center"
                color={palette.primary[300]}
                sx={{ '& a': { color: '#5798FF' } }}
              >
                {t('auth.register.label.text22')}(
                <Link prefetch={false} href={allRoutes.login}>
                  {t('auth.register.label.text23')}
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
              <Typography translate="no" variant="body1">
                {t('auth.register.label.text24')}
              </Typography>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default RegisterPage;
