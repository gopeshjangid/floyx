'use client';

import React from 'react';
import { Box, Typography, Button, Grid, Popover } from '@mui/material';
import UserCard from '@/components/UserCard';
import StarIcon from '@/images/image/star';
import BookMarkIcon from '@/images/image/bookMarkIcon';
import FaceBookIcon from '@/images/image/facebookIcon';
import LinkedinIcon from '@/images/image/linkedin';
import TwitterIcon from '@/images/image/twitter';
import {
  useGetArticleTotalEarningsQuery,
  useGetFollowStatusMutation,
} from '@/lib/redux/slices/articleDetails';

export default function FullArticle({ details }: any) {
  const CONTENT =
    details?.article?.content && JSON.parse(details?.article?.content);
  const articleId = details?.article?.id || '';

  const [updatefollowUnfolow] = useGetFollowStatusMutation();
  const { data: totalEarningPoints } =
    useGetArticleTotalEarningsQuery(articleId);
  const pointsEarned = totalEarningPoints
    ? (
        totalEarningPoints?.totalEarnings[0]?.articleEarnedAmount +
        totalEarningPoints?.totalEarnings[0]?.userEarnedAmount
      ).toFixed(3)
    : 0;

  const createMarkup = (htmlString: string) => {
    return { __html: htmlString };
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Button variant="text" startIcon={<BookMarkIcon />}>
          Bookmark
        </Button>
        <Typography variant="h1" sx={{ textTransform: 'capitalize' }}>
          {details?.article?.title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex' }}>
          <Box>
            <UserCard
              name={details?.user?.name}
              username={details?.user?.username}
              showDate={details?.article?.publicationDate}
            />
          </Box>
          <Box sx={{ padding: '20px 10px' }}>
            <Button
              variant="outlined"
              size="small"
              sx={{ borderRadius: '30px', padding: '3px 15px' }}
              onClick={() => {
                updatefollowUnfolow(details?.user?.username);
              }}
            >
              {details?.user?.isFollowed ? 'Follow' : 'UnFollow'}
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            padding: '20px 0px',
            width: 'auto',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="outlined"
            size="small"
            startIcon={<StarIcon />}
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <Typography variant="button">
              {`${pointsEarned} Points`}{' '}
            </Typography>
          </Button>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Box>
              <Box>
                <Typography sx={{ p: 1 }} variant="button">
                  Past Payouts {pointsEarned} points
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ p: 1 }} variant="button">
                  - Author{' '}
                  {totalEarningPoints?.totalEarnings[0]?.articleEarnedAmount ||
                    0}{' '}
                  points
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ p: 1 }} variant="button">
                  - Voters{' '}
                  {totalEarningPoints?.totalEarnings[0]?.userEarnedAmount || 0}{' '}
                  points
                </Typography>
              </Box>
            </Box>
          </Popover>
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Grid container>
          {details?.article?.tags &&
            details?.article?.tags.map((val: any, index: number) => (
              <Grid
                item
                xs="auto"
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '50px',
                  border: '1px solid white',
                  padding: '10px 20px',
                  width: 'fit-Content',
                  margin: '10px',
                }}
              >
                <Typography variant="body2">#{val}</Typography>
              </Grid>
            ))}
        </Grid>
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <img src={details?.article?.coverPhotoPath} width={'100%'} />
      </Box>
      <Box sx={{ marginTop: '20px', wordWrap: 'break-word' }}>
        {CONTENT &&
          CONTENT.map((val: any, index: number) => (
            <Box sx={{ padding: '10px 0' }} key={`articleDetail${index}`}>
              {val?.type === 'paragraph' ? (
                <Typography variant="body1">
                  <div dangerouslySetInnerHTML={createMarkup(val?.value)} />
                </Typography>
              ) : (
                <Typography variant="h2">
                  <div dangerouslySetInnerHTML={createMarkup(val?.value)} />
                </Typography>
              )}
            </Box>
          ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Button variant="text">
            <Typography variant="subtitle2">Edit</Typography>
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ marginRight: '5px' }}>
            <Typography variant="body1">Share:</Typography>
          </Box>
          <Box sx={{ marginRight: '5px' }}>
            <FaceBookIcon />
          </Box>
          <Box sx={{ marginRight: '5px' }}>
            <LinkedinIcon />
          </Box>
          <Box sx={{ marginRight: '5px' }}>
            <TwitterIcon />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
