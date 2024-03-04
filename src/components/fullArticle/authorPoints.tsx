'use client';
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Popover,
  Stack,
  CircularProgress,
} from '@mui/material';
import StarIcon from '@/images/image/star';
import { useGetArticleTotalEarningsQuery } from '@/lib/redux/slices/articleDetails';
import { RoundPrimaryButton } from '../CustomButtons';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function AuthorPoints({ details }: any) {
  const session = useSession();
  const router = useRouter();
  const articleId = details?.article?.id || '';
  const { data: totalEarningPoints } = useGetArticleTotalEarningsQuery(
    articleId,
    {
      skip:
        session.status === 'unauthenticated' || session.status === 'loading',
    }
  );

  const pointsEarned = totalEarningPoints
    ? totalEarningPoints.totalEarnings
        .reduce((a, c) => a + c.articleEarnedAmount + c.userEarnedAmount, 0)
        .toFixed(3)
    : 0;

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const { t } = useTranslation();

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  if (session.status === 'loading') {
    return <CircularProgress />;
  }
  return (
    <Stack justifyContent={'flex-end'} alignItems={'flex-end'} gap={1}>
      <Button
        variant="outlined"
        size="small"
        aria-haspopup="true"
        sx={{ borderRadius: '3px' }}
        onClick={() => {
          router.back();
        }}
      >
        <Typography translate="no" mb={0} variant="button">
          {t('comp.fullArticle.back')}
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
        <Typography translate="no" mb={0} variant="button">
          {t('comp.fullArticle.earnPoints', { pointsEarned })}
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
        <Box sx={{ p: 1.5 }}>
          <Typography translate="no" variant="subtitle2">
            {t('comp.fullArticle.pastPoints', { pointsEarned })}
          </Typography>
          <Typography variant="subtitle2">
            Author -
            {totalEarningPoints?.totalEarnings[0]?.articleEarnedAmount || 0}{' '}
            points
          </Typography>
          <Typography variant="subtitle2">
            Voters-{' '}
            {totalEarningPoints?.totalEarnings[0]?.userEarnedAmount || 0} points
          </Typography>
        </Box>
      </Popover>
    </Stack>
  );
}
