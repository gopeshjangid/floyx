import { Box, Container } from '@mui/material';
import React from 'react';
import Header from './header';

function MainContainer ({
  content,
  rightContent,
  isHeaderVisble,
}: {
  content: React.ReactNode;
  rightContent: React.ReactNode;
  isHeaderVisble?: Boolean | false;
}) {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        p: 0,
      }}
    >
      <Box sx={{ width: '70%', pr: 1 }}>
        {isHeaderVisble && <Header />}
        {content}
      </Box>
      <Box sx={{ width: '30%' }}>{rightContent}</Box>
    </Container>
  );
}

export default MainContainer;
