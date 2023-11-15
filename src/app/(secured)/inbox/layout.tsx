import { Box, Grid } from '@mui/material';

export default function Layout({ children, chat }: { children: React.ReactNode; chat: React.ReactNode }) {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xl={3} lg={4} md={5} xs={12}>
          {children}
        </Grid>
        <Grid item xl={9} lg={8} md={7} xs={12}>
          {chat}
        </Grid>
      </Grid>
    </Box>
  );
}
