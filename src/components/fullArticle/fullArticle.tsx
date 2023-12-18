'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Popover, Stack, useTheme, Menu, MenuItem } from '@mui/material';
import UserCard from '@/components/UserCard';
import StarIcon from '@/images/image/star';
import BookMarkIcon from '@/images/image/bookMarkIcon';
import {
  useGetArticleTotalEarningsQuery,
  useGetFollowStatusMutation,
} from '@/lib/redux/slices/articleDetails';
import Image from 'next/image';
import UsernameLink from "../usernameLink";
import CalendarIcon from "@/images/image/calendarIcon";
import moment from "moment";
import UserAvatar from "../UserAvatar";
import { ApiEndpoint } from "@/lib/API/ApiEndpoints";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, TwitterIcon, FacebookIcon, LinkedinIcon } from 'react-share'
import TranslateIcon from "@/assets/images/svg/translateIcon";

export default function FullArticle({ details }: any) {
  const { palette } = useTheme();
  const colorSvg = palette?.mode === 'light' ? palette.text.primary : palette?.primary?.main;
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [languageEl, setLanguageEl] = React.useState<null | HTMLElement>(null);
  const openLanguage = Boolean(languageEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLanguageEl(event.currentTarget);
  };
  const handleClose = (lang) => {
    if (lang) {
      setSelectedLanguage(lang);
    }
    setLanguageEl(null);
  };

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
        <Stack direction={"row"} gap={1}>
          <Stack direction={"row"}>
            <Box sx={{ marginRight: '10px' }}>
              <UserAvatar
                alt={details?.user?.name}
                src={`${ApiEndpoint.CurrentUserDetails}/avatar/${details?.user?.username}`}
                sx={{ width: '50px', height: '50px' }}
              />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                component={'span'}
                color="textPrimary"
              >
                {details?.user?.name}
              </Typography>
              <UsernameLink variant="subtitle2" username={details?.user?.username} onClick={e => e.stopPropagation()} />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarIcon />
                {moment(details?.article?.publicationDate).format('MMM DD, YY')}
              </Box>
            </Box>
          </Stack>
          <Box>
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
        </Stack>
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
      {details?.article?.coverPhotoPath && (<Box sx={{ marginTop: '20px' }}>
        <Image
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: '100%' }}
          src={details?.article?.coverPhotoPath}
          alt="thumbnail"
        />
      </Box>)}
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
          <Button
            id="basic-button"
            aria-controls={openLanguage ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openLanguage ? 'true' : undefined}
            onClick={handleClick}
            startIcon={<TranslateIcon color={colorSvg} />}
            sx={{textTransform: "none"}}
          >
            Language: {selectedLanguage}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={languageEl}
            open={openLanguage}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => {handleClose('EN')}}>EN</MenuItem>
            <MenuItem onClick={() => {handleClose('GE')}}>GE</MenuItem>
          </Menu>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ marginRight: '5px' }}>
            <Typography variant="body1">Share:</Typography>
          </Box>
          <Box sx={{ marginRight: '5px' }}>
            <FacebookShareButton url={'https://www.floyx.com/article/' + details?.user?.username + '/' + details?.user?.url}>
              <FacebookIcon size={20} round={true} />
            </FacebookShareButton>
          </Box>
          <Box sx={{ marginRight: '5px' }}>
            <LinkedinShareButton url={'https://www.floyx.com/article/' + details?.user?.username + '/' + details?.user?.url}>
              <LinkedinIcon size={20} round={true} />
            </LinkedinShareButton>
          </Box>
          <Box sx={{ marginRight: '5px' }}>
            <TwitterShareButton url={'https://www.floyx.com/article/' + details?.user?.username + '/' + details?.user?.url}>
              <TwitterIcon size={20} round={true} />
            </TwitterShareButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
