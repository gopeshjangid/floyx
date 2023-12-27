import { Box } from '@mui/material';
import { cookies } from 'next/headers';
import React from 'react';
function Layout({ children }: any) {
  const cookieStore = cookies();
  console.log('layouuuuuuu');
  const deviceType = cookieStore.get('deviceType');
  const padding = deviceType && deviceType.value === 'desktop' ? 8 : 1.5;
  return (
    <Box mt={2} p={2} px={padding} mx={padding}>
      {children}
    </Box>
  );
}

export default Layout;
