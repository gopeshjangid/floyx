import { Box, Grid } from '@mui/material';
import { cookies } from 'next/headers';
import React from 'react';
function Layout({ children }: any) {
  const cookieStore = cookies();
  const deviceType = cookieStore.get('deviceType');
  const padding = deviceType && deviceType.value === 'desktop' ? 8 : 1.5;
  return (
    <Box mt={2} p={2}>
      <Grid container>
        <Grid item sm={10} xs={12}>
          {children}
        </Grid>
        <Grid item sm={1} xs={12}>
          &nbsp;
        </Grid>
      </Grid>
    </Box>
  );
}

export default Layout;
