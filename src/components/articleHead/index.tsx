'use client';

import { Box, Container, Tabs, Tab, Typography, Button } from '@mui/material';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';

import HowToRegIcon from '@mui/icons-material/HowToReg';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const ArticleHeadContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  '& .tab-group': {
    borderBottom: '1px solid',
    width: '100%',
    marginRight: '10px',
    '& .tab-group-label': {
      display: 'flex',
    },
  },
}));

export default function ArticleHead() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    console.log(newValue);
    // setValue(newValue);
  };

//   await new Promise ((res)=> setTimeout(res, 1000))


  return (
    <ArticleHeadContainer>
      <Tabs className="tab-group" value={value} onChange={handleChange} aria-label="icon tabs example">
        <Tab
          label={
            <Box className='tab-group-label'>
              <WhatshotIcon fontSize="small" sx={{ marginRight: '5px', fontSize:'' }} />
              <Typography variant="subtitle2">Popular</Typography>
            </Box>
          }
        />
        <Tab
          component="a"
          label={
            <Box className='tab-group-label'>
              <HowToRegIcon fontSize="small" sx={{ marginRight: '5px' }} />
              <Typography variant="subtitle2">Following</Typography>
            </Box>
          }
        />
        <Tab
          component="b"
          label={
            <Box className='tab-group-label'>
              <QueryBuilderIcon fontSize="small" sx={{ marginRight: '5px' }} />
              <Typography variant="subtitle2">Recent</Typography>
            </Box>
          }
        />
      </Tabs>
      <Button variant="outlined" color="primary" sx={{ border: '1px solid white' }}>
        New Articles
      </Button>
    </ArticleHeadContainer>
  );
}
