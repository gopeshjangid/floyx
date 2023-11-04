'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Link from 'next/link';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import LoginImage from '../social-login/components/LoginImage';
import { SVGArrowLeft, iconLock, iconUser } from '@/assets/images';
import { allRoutes } from '@/constants/allRoutes';

const Login: FC = () => {
  const { palette } = useTheme();

  return (
    <Box sx={{ background: '#0B081F' }}>
      <Grid container>
        <LoginImage />
        <Grid md={6} sm={12} zIndex="1">
          <Box
            textAlign="center"
            padding={{ md: '113px 15px 40px', xs: '38px 25px 38px' }}
          >
            <Typography
              variant="h5"
              fontSize="16px"
              color={palette.primary.main}
              marginBottom="26px"
            >
              Join for free today and keep your data safe in the digital Space{' '}
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              gap="24px"
              maxWidth="400px"
              marginInline="auto"
            >
              <Box mb="3px">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#D1D0D5',
                    fontSize: '16px',
                    fontWeight: '400',
                    textTransform: 'capitalize',
                    padding: { md: '14px 83px', xs: '14px' },
                    width: { md: '0', xs: '100%' },
                    borderRadius: '10px',
                  }}
                >
                  Use username or email
                </Button>
              </Box>
              <Typography
                variant="h3"
                fontSize="24px"
                fontWeight="600"
                color={palette.primary.main}
                textAlign="left"
              >
                Login to your account
              </Typography>
              <Box
                component="form"
                m={0}
                noValidate
                sx={{
                  '& .MuiFormControl-root': {
                    marginBottom: '10px',
                    width: '100%',
                    '& .MuiInputBase-root': {
                      '& .MuiIconButton-root': {
                        padding: '0',
                      },
                      paddingLeft: '20px',
                    },
                    '& label': {
                      marginBottom: '12px',
                      color: '#D1D0D5',
                      fontSize: '16px',
                      fontWeight: '400',
                      textAlign: 'left',
                    },
                    '& .MuiFormControl-root': {
                      borderRadius: '10px',
                      background: '#1B1830',

                      '& .MuiInputBase-input': {
                        padding: '13px 25px',
                        height: 'fit-content',
                        color: '#D1D0D5',
                      },
                    },
                  },
                  '& .checkbox-wrapper': {
                    '& label': {
                      margin: '0',
                      '& .MuiCheckbox-root': {
                        color: 'rgba(255, 255, 255, 0.15)',
                        '&.Mui-checked': {
                          color: '#A85CFF',
                        },
                      },
                      '& .MuiTypography-root': {
                        color: '#D1D0D5',
                        fontSize: '16px',
                        fontWeight: '400',
                      },
                    },
                  },
                }}
              >
                <FormControl>
                  <FormLabel>Username or email </FormLabel>
                  <TextField
                    fullWidth
                    hiddenLabel
                    placeholder="Ex. Dustin Max"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" color="primary">
                            <Image src={iconUser} alt="" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>

                <FormControl>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="start"
                    sx={{ '& label': { marginBottom: '0 !important' } }}
                    mb={1.5}
                  >
                    <FormLabel>Password </FormLabel>
                    <Typography
                      color={palette.secondary.main}
                      fontSize="16px"
                      fontWeight="400"
                    >
                      Forgotten your password?
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    hiddenLabel
                    placeholder="************"
                    type="password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" color="primary">
                            <Image src={iconLock} alt="" />
                          </IconButton>
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
                    sx={{
                      textTransform: 'capitalize',
                      padding: '12px 29px',
                      color: '#0B081F',
                      fontSize: '16px',
                      fontWeight: '400',
                    }}
                  >
                    Submit
                  </Button>
                </FormControl>
                <FormControl
                  className="checkbox-wrapper"
                  sx={{ marginBottom: '0 !important' }}
                >
                  <FormControlLabel
                    name="Remember me"
                    control={<Checkbox defaultChecked={false} />}
                    label="Remember me"
                  />
                </FormControl>
              </Box>
              FormControl
              <Box mt="3px">
                <Typography
                  variant="h6"
                  fontSize="16px"
                  fontWeight="400"
                  lineHeight="24px"
                  color="#CECED2"
                  sx={{ '& a': { color: palette.secondary.main } }}
                >
                  By signing up,you agree to
                  <Link href="/"> Terms of Service </Link> and
                  <Link href="/"> Privacy Policy, </Link>
                  including <Link href="/"> Cookie Use.</Link>
                </Typography>
              </Box>
              <Box
                mt="20px"
                textAlign="left"
                sx={{
                  '& a': {
                    color: '#A85CFF',
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '24px',
                    textTransform: 'capitalize',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  },
                }}
              >
                <Link href={allRoutes.socialLogin}>
                  <SVGArrowLeft />
                  <span className="gradient-text">Back to social login</span>
                </Link>
              </Box>
            </Box>
            <Box mt="54px">
              <Stack
                spacing={{
                  md: '42px',
                  xs: '20px',
                }}
                mb="13px"
                sx={{
                  '& a': {
                    fontSize: '15px',
                    fontWeight: '400',
                    lineHeight: '22.5px',
                    color: palette.secondary.main,
                  },
                }}
                direction="row"
                justifyContent="center"
              >
                <Link href="/"> Terms of service</Link>
                <Link href="/"> Privacy Policy</Link>
                <Link href="/"> Cookie use</Link>
              </Stack>
              <Typography
                variant="h6"
                fontSize="16px"
                fontWeight="400"
                lineHeight="24px"
                color="#85838F"
                sx={{ '& a': { color: palette.secondary.main } }}
              >
                © 2022 Powered by Floyx, LLC & <Link href="/"> Polygon.</Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
