'use client';

import React, { useState } from 'react';
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
} from '@mui/material';
import Link from 'next/link';

import { SVGLock, SVGUser } from '@/assets/images';
import EmailSVG from '@/iconComponents/email';
import { allRoutes } from '@/constants/allRoutes';
import Phone from '@/components/Phone';

const RegisterPage = () => {
  const { palette }: any = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
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
  const [formError, setFormError] = useState<any>({});

  const validateForm = () => {
    const tempErrors: any = {};
    if (!formData.name) tempErrors.name = 'Name is required!';
    if (formData.name.length > 25) tempErrors.name = 'Name must be less than 25 characters long';
    if (!formData.username) tempErrors.username = 'Username is required!';
    if (formData.username.length > 25) tempErrors.username = 'Username must be less than 25 characters long';
    if (!formData.email) tempErrors.email = 'Email is required!';
    if (!formData.email.match(/^\S+@\S+$/i)) tempErrors.email = 'Email is invalid';
    if (formData.email !== formData.confirmEmail) tempErrors.confirmEmail = 'Emails do not match';
    if (!formData.password || formData.password.length < 6) tempErrors.password = 'Password must be at least 6 characters long';
    if (formData.recommendedMe && !formData.recommended) tempErrors.recommended = 'Please enter who recommended you to Floyx';
    if (formData.recommendedMe && formData.recommended.length > 25) tempErrors.recommended = 'Name must be less than 25 characters long';

    setFormError(tempErrors);
    return Object.values(tempErrors).every(value => value === '');
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);
      console.log('Form data:', formData);
      // TODO: submit form
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'recommendedMe') {
      const copy: any = { ...formData };

      if (event.target.checked) {
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

  return (
    <Container component="main" maxWidth="sm" sx={{ pt: 10 }}>
      <Typography variant="h3" gutterBottom color="textPrimary" align="center">
        Create your account
      </Typography>
      <Typography variant="h6" gutterBottom color="textPrimary" align="center" mt={3}>
        Join for free today and keep your data safe in the digital space.
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        my={5}
        p={5}
        border={`1px solid ${palette.action?.border}`}
        borderRadius="20px"
      >
        <Typography align="center" variant="h4" gutterBottom color="textPrimary">
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
            control={<Checkbox defaultChecked={false} onChange={onChangeHandler} />}
            label="Someone recommended Floyx to me (optional)"
          />
        </FormControl>

        {formData.recommendedMe && (
          <>
            <TextField
              sx={{
                marginBottom: '20px',
              }}
              name="recommended"
              fullWidth
              hiddenLabel
              placeholder="Enter here..."
              onChange={onChangeHandler}
              error={!!formError.recommended}
              helperText={formError.recommended}
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
              // TODO:
              // onChange={(e, x, y, z) => {
              //   setFormData({ ...formData, phone: e });
              // }}
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
            onChange={onChangeHandler}
            error={!!formError.email}
            helperText={formError.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" color="primary">
                    <EmailSVG />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel required>Email address confirmation</FormLabel>
          <TextField
            name="username"
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
                    <EmailSVG />
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
            <Typography fontSize="16px" fontWeight="400" sx={{ '& a': { color: '#5798FF', margin: '0 5px' } }}>
              {'By Clicking "Sign Up" You agree to Floyx\'s'}
              <Link href={allRoutes.termsAndConditions}>Terms of Service</Link>,<Link href={allRoutes.privacyPolicy}>Privacy Policy</Link>
              {'and'}
              <Link href={allRoutes.cookiesPolicy}>Cookie Policy</Link>
            </Typography>
          }
          control={<Checkbox checked={termsAndConditions} onChange={e => setTermsAndCondition(e.target.checked)} />}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2, mb: 2 }} disabled={loading || !termsAndConditions}>
          Sign Up
        </Button>

        <Typography fontSize="16px" fontWeight="400" sx={{ '& a': { color: '#5798FF' } }} align="center">
          Already have an account?
          <Link href={allRoutes.socialLogin}> Sign in</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;
