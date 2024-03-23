'use client';

import { Box, Stack, Theme, Typography, styled, Button } from '@mui/material';
import React from 'react';

import Wrapper from '@/components/wrapper';
import { useToast } from '@/components/Toast/useToast';
import SVGDelete from '@/iconComponents/delete';

const AccountWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  '& .MuiInputBase-root': {
    background: theme.palette.background.default,
  },
  margin: '25px',
  [theme.breakpoints.up('md')]: {
    margin: '50px',
  },
}));

const BlockedUsers = () => {
  const toast = useToast();

  const clickHandler = ()=>{
    toast.success('Please Wait...');
    window.location.href = "mailto:data.protection@floyx.com?subject=Account Deletion Request";
  }

  return (
    <Wrapper
      sx={{
        maxWidth: {
          md: '100%',
          lg: '70%',
        },
        marginTop: '20px',
      }}
    >
      <AccountWrapper>
        <Box pb={2} textAlign={'center'}>
            <Typography color={'red'} variant='subtitle1'>Please read the following instructions carefully before deleting your account.</Typography>
        </Box>
        <Stack gap={2}>
            <Typography component={'ol'} variant='body2'>1. &nbsp;⁠Click the 'Delete Account' button and then send your account deletion request to: <strong>data.protect@floyx.com</strong></Typography>
            <Typography component={'ol'} variant='body2'>2. &nbsp;Your request will be registered by the Floyx system and the process of deleting your account and its data will begin, which takes up to 90 days. After that, your account will be deleted completely from Floyx.</Typography>
            <Typography component={'ol'} variant='body2'>3. &nbsp;If you decide to continue using your account and wants to stop the deletion process by Floyx, log back into your account and send an email requesting that the deletion process be stopped to data.protect@floyx.com <a style={{color:'blueviolet'}} href="mailto:data.protect@floyx.com">data.protect@floyx.com</a></Typography>
            <Typography component={'ol'} variant='body2'>⁠4 &nbsp;A request to stop the account deletion process can be made prior to 60 days from the date of the first email. After that time, you will not be able to undo the account deletion process.</Typography>
        </Stack>
        <Box p={2} textAlign={'center'}>
        <Button
              variant="outlined"
              onClick={clickHandler}
              color="error"
              sx={{
                border: theme => `1px solid ${theme.palette.error.main}`,
                borderRadius: '10px',
              }}
            >
              <SVGDelete /> Delete Account
            </Button>
        </Box>
      </AccountWrapper>
    </Wrapper>
  );
};

export default BlockedUsers;
