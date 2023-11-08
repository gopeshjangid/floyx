import * as React from 'react';
import Box from '@mui/material/Box';
import MainContainer from '@/components/MainContainer';

export default function Articles () {
  return (
    <MainContainer
      content={<div>First Child</div>}
      rightContent={<div>Second Child</div>}
    />
  );
}
