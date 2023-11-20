'use client';
import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Checkbox, FormControlLabel, Theme } from '@mui/material';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';

const RegisterPage = () => {
  const theme: Theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    emailConfirmation: '',
    password: '',
  });
  const [errors, setErrors] = useState<any>({});

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    // Clear errors
    setErrors((prevErrors: any): any => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const tempErrors: any = {};
    if (!formData.name) tempErrors.name = 'Name is required';
    if (!formData.username) tempErrors.username = 'Username is required';
    if (!formData.email) tempErrors.email = 'Email is required';
    if (!formData.email.match(/^\S+@\S+$/i)) tempErrors.email = 'Email is invalid';
    if (formData.email !== formData.emailConfirmation) tempErrors.emailConfirmation = 'Emails do not match';
    if (!formData.password || formData.password.length < 6) tempErrors.password = 'Password must be at least 6 characters long';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (validateForm()) {
      console.log('Form data:', formData);
      // Submit your form to your backend or API call
    }
  };
  return (
    <Container component="main" maxWidth="sm" sx={{ pt: 10 }}>
      <Typography variant="h3" gutterBottom color="textPrimary">
        Create your account
      </Typography>
      <Typography variant="h6" gutterBottom color="textPrimary">
        Join for free today and keep your data safe in the digital space.
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Typography align="center" variant="body1" gutterBottom color="textPrimary">
          Personal account
        </Typography>
        <TextField
          required
          fullWidth
          id="name"
          label="Name"
          placeholder="Ex. Dustin Max"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          margin="normal"
        />
        {/* Username Field */}
        <TextField
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          placeholder="Ex. Dusti_96"
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
          margin="normal"
        />
        <FormControlLabel label="Someone reccomended Floyx to me (optional)" control={<Checkbox checked={true} onChange={() => {}} />} />
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          placeholder="Ex. name@gmail.com"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          margin="normal"
        />
        {/* Email Confirmation Field */}
        <TextField
          required
          fullWidth
          id="emailConfirmation"
          label="Email address confirmation"
          name="emailConfirmation"
          placeholder="Enter your email address again"
          value={formData.emailConfirmation}
          onChange={handleChange}
          error={!!errors.emailConfirmation}
          helperText={errors.emailConfirmation}
          margin="normal"
        />
        {/* Password Field */}
        <TextField
          required
          fullWidth
          id="password"
          label="Password (at least 6 characters)*"
          name="password"
          type="password"
          placeholder="**************"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          margin="normal"
        />
        <FormControlLabel
          label="By clicking “Sign up” you agree to Floyx’s Terms of Service, Privacy Policy and Cookie Policy."
          control={<Checkbox checked={true} onChange={() => {}} />}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2, mb: 2 }}>
          Sign Up
        </Button>
        <Typography variant="body2" color="textSecondary" align="center">
          Already have an account?{' '}
          <Link style={{ textDecoration: 'none', color: theme?.palette.primary[theme.palette.mode] }} href="/login">
            Sign in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;
