'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
} from 'react-share';

export default function SocialButts({ details }: any) {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ marginRight: '5px' }}>
          <Typography variant="body1">Share:</Typography>
        </Box>
        <Box sx={{ marginRight: '5px' }}>
          <FacebookShareButton
            url={
              'https://www.floyx.com/article/' +
              details?.user?.username +
              '/' +
              details?.user?.url
            }
          >
            <FacebookIcon size={20} round={true} />
          </FacebookShareButton>
        </Box>
        <Box sx={{ marginRight: '5px' }}>
          <LinkedinShareButton
            url={
              'https://www.floyx.com/article/' +
              details?.user?.username +
              '/' +
              details?.user?.url
            }
          >
            <LinkedinIcon size={20} round={true} />
          </LinkedinShareButton>
        </Box>
        <Box sx={{ marginRight: '5px' }}>
          <TwitterShareButton
            url={
              'https://www.floyx.com/article/' +
              details?.user?.username +
              '/' +
              details?.user?.url
            }
          >
            <TwitterIcon size={20} round={true} />
          </TwitterShareButton>
        </Box>
      </Box>
    </Box>
  );
}
