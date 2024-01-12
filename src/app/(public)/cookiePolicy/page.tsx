import React from 'react';
import { Typography, Box } from '@mui/material';

const CookiesPage = () => {
  return (
    <Box pt="16px" p="16px">
      <Typography my={3} variant="subtitle2" gutterBottom>
        This Service uses cookie files.
      </Typography>
      <Typography my={3} variant="subtitle2">
        Cookie files consist of IT data, including, but not limited to text
        files, that are being stored on User’s computer and are used to provide
        full Service functionality. Usually cookie files contain the website’s
        name, its unique ID and time spent on User’s computer.
      </Typography>
      <Typography my={3} variant="subtitle2">
        Administrator is responsible for storing cookie files on User computer
        and is the only party that may gain access to them.
      </Typography>
      <Typography my={3} variant="subtitle2">
        Cookie files are being used for the following purposes:
      </Typography>
      <Typography component="li" my={3} variant="subtitle2">
        User website movement statistics;
      </Typography>
      <Typography component="li" my={3} variant="subtitle2">
        Maintaining User’s session as active without the requirement of logging
        in on every single sub-page on Floyx platform after logging in;
      </Typography>
      <Typography component="li" my={3} variant="subtitle2">
        Defining a User profile in order to provide him with personalized
        advertisement content.
      </Typography>
      <Typography my={3} variant="subtitle2">
        This Service makes use of two kinds of cookie files:
      </Typography>
      <Typography my={2} component="li" variant="subtitle2">
        Session cookies – temporary files, that are being created at the moment
        of logging in and deleted after closing a User’s internet browser.
      </Typography>
      <Typography my={2} component="li" variant="subtitle2">
        Persistent cookies – files that are being stored on User’s computer
        regardless of the Service usage. Those may be deleted by the User
        manually.
      </Typography>
      <Typography my={2} component="li" variant="subtitle2">
        Internet browsers usually are automatically set to allow storing cookie
        files on User’s computer. User may change these in his browser settings.
        Internet browsers are also equipped with tools to delete cookie files
        and automatically block them from being stored. Relevant information may
        be found in User’s browser support sites.
      </Typography>
      <Typography my={3} variant="subtitle2">
        Limiting the functionality of cookie files may result in defective
        Service performance.
      </Typography>
      <Typography my={3} variant="subtitle2">
        Cookie files may be used by advertising networks, such as Google, to
        adapt content of the advertisements being shown to User while using our
        Service. Those files may retain information such as User’s navigation
        path or time spent on certain sub-sites of our Service.
      </Typography>
      <Typography my={3} variant="subtitle2">
        User may review and edit information deriving from cookie files history
        collected by Google network on: www.google.com/ads/preferences/.
      </Typography>
    </Box>
  );
};

export default CookiesPage;
