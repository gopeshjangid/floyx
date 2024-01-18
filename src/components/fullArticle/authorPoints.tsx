'use client';
import React from 'react';
import { Box, Typography, Button, Popover, useTheme, Stack } from '@mui/material';
import StarIcon from '@/images/image/star';
import { useGetArticleTotalEarningsQuery } from '@/lib/redux/slices/articleDetails';
import { RoundPrimaryButton } from '../CustomButtons';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function AuthorPoints({ details }: any) {
  const session = useSession();
  const router = useRouter();
  const articleId = details?.article?.id || '';
  const { data: totalEarningPoints } = useGetArticleTotalEarningsQuery(
    articleId,
    { skip: session.status !== 'unauthenticated' }
  );
  const pointsEarned = totalEarningPoints
    ? (
        totalEarningPoints?.totalEarnings[0]?.articleEarnedAmount +
        totalEarningPoints?.totalEarnings[0]?.userEarnedAmount
      ).toFixed(3)
    : 0;

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Stack
      justifyContent={'flex-end'}
      alignItems={'flex-end'}
      gap={1}
    >
      <Button
        variant="outlined"
        size="small"
        aria-haspopup="true"
        sx={{ borderRadius: '3px' }}
        onClick={() => {
          router.back();
        }}
      >
        <Typography mb={0} variant="button">
          {`Go To Back`}
        </Typography>
      </Button>
      <RoundPrimaryButton
        size="small"
        startIcon={<StarIcon />}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ borderRadius: '3px' }}
      >
        <Typography mb={0} variant="button">
          {`${pointsEarned} Points`}{' '}
        </Typography>
      </RoundPrimaryButton>
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
              {totalEarningPoints?.totalEarnings[0]?.articleEarnedAmount || 0}{' '}
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
    </Stack>
  );
}
