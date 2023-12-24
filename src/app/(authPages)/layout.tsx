import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Grid } from '@mui/material';

import { allRoutes } from '@/constants/allRoutes';
import LoginImage from './social-login/components/login-image';
import { AuthWrapper } from './styled';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (session) {
    redirect(allRoutes.home);
  }
  return (
    <AuthWrapper>
      <Grid container minHeight="100vh">
        <LoginImage />
        {children}
      </Grid>
    </AuthWrapper>
  );
}
