import { Box, Grid } from '@mui/material';
import React from 'react';
function Layout({ children }: any) {
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
