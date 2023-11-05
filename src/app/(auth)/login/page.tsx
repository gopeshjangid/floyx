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
  Theme,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import LoginImage from '../social-login/components/login-image';
import { SVGArrowLeft, iconLock, iconUser } from '@/assets/images';
import { allRoutes } from '@/constants/allRoutes';

const LoginWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  background: theme.palette.background.default,
  '& .outline-btn': {
    borderColor: 'rgba(255, 255, 255, 0.15)',
    color: '#D1D0D5',
    fontSize: '16px',
    textTransform: 'initial',
    fontWeight: '400',
    padding: '14px',
    width: '100%',
    borderRadius: '10px',
  },
  '& .social-login': {
    color: '#A85CFF',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  '& .login-service': {
    '& a': {
      fontSize: '15px',
      fontWeight: '400',
      lineHeight: '22.5px',
      color: theme.palette.primary.main,
    },
  },
}));

const Login: FC = () => {
  const { palette } = useTheme();
  const router = useRouter();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('login ~ e:', e);
    e.preventDefault();
    const response = await signIn('credentials', {
      email: 'brijeshthakkar1785@gmail.com',
      password: 'vv!bKqZMGY5e@TD',
      remember: false,
      redirect: true,
      callbackUrl: allRoutes.home,
    });

    console.log(response);
  };

  return (
    <LoginWrapper>
      <Grid container minHeight="100vh">
        <LoginImage />
        <Grid item md={6} sm={12} zIndex="1">
          <Box
            textAlign="center"
            padding={{ md: '47px 15px 40px', xs: '38px 25px 38px' }}
          >
            <Typography
              variant="h5"
              fontSize="16px"
              color={palette.text.primary}
              marginBottom="26px"
            >
              Join for free today and keep your data safe in the digital Space{' '}
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              gap="24px"
              maxWidth="360px"
              marginInline="auto"
            >
              <Box mb="3px">
                <Button
                  variant="outlined"
                  className="outline-btn"
                  onClick={() => router.push(allRoutes.register)}
                >
                  Create an account
                </Button>
              </Box>
              <Typography
                variant="h3"
                fontSize="24px"
                fontWeight="600"
                color={palette.text.primary}
                textAlign="left"
              >
                Login to your account
              </Typography>
              <Box component="form" m={0} noValidate>
                <FormControl>
                  <FormLabel>Username or email </FormLabel>
                  <TextField
                    name="email"
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
                      fontSize="16px"
                      fontWeight="400"
                      sx={{ '& a': { color: palette.primary.main } }}
                    >
                      <Link href={allRoutes.login}>
                        Forgotten your password?
                      </Link>
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
                      color: palette.background.default,
                      fontSize: '16px',
                      fontWeight: '400',
                    }}
                  >
                    Submit
                  </Button>
                </FormControl>
                <FormControl sx={{ marginBottom: '0 !important' }}>
                  <FormControlLabel
                    name="remember"
                    control={<Checkbox defaultChecked={false} />}
                    label="Remember me"
                  />
                </FormControl>
              </Box>
              <Box mt="3px">
                <Typography
                  variant="h6"
                  fontSize="16px"
                  fontWeight="400"
                  lineHeight="24px"
                  color="#CECED2"
                  sx={{ '& a': { color: palette.primary.main } }}
                >
                  By signing up,you agree to
                  <Link href="/"> Terms of Service </Link> and
                  <Link href="/"> Privacy Policy, </Link>
                  including <Link href="/"> Cookie Use.</Link>
                </Typography>
              </Box>
              <Box mt="20px" textAlign="left">
                <Link href={allRoutes.socialLogin} className="social-login">
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
                className="login-service"
                direction="row"
                justifyContent="center"
                flexWrap="wrap"
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
                sx={{ '& a': { color: palette.primary.main } }}
              >
                © 2022 Powered by Floyx, LLC & <Link href="/"> Polygon.</Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </LoginWrapper>
  );
};

export default Login;
