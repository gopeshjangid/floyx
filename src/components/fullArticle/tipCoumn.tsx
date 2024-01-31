'use client';
import { useGetTipHistoryQuery } from '@/lib/redux/slices/earnings';
import {
  Box,
  Typography,
  Slider,
  Button,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import { useSetTipMutation } from '@/lib/redux/slices/articleDetails';
import { useToast } from '../Toast/useToast';
import { useSession } from 'next-auth/react';
import { revalidateArticleDetail } from '@/actions/actions';
import { usePathname } from 'next/navigation';

export default function TipColumn({
  details,
  articlePuclicUrl,
  articleId,
}: any) {
  const session = useSession();
  const [value, setValue] = useState<number>(30);
  const pathname = usePathname();
  const [updateTip, { isLoading: tipLoading, isError, error, isSuccess }] =
    useSetTipMutation();
  const { refetch, data: tipHistory } = useGetTipHistoryQuery(undefined, {
    skip:
      session?.status === 'loading' || session?.status === 'unauthenticated',
  });
  const toast = useToast();
  const { palette } = useTheme();

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleTip = () => {
    const payload: any = {
      articleId: details?.article?.id,
      articlePublicUrl: articlePuclicUrl,
      articleTipAmount: value / 10000,
      articleUserId: details?.user?.id,
      userTipAmount: (100 - value) / 10000,
    };
    updateTip(payload);
  };
  const tippedOrNot = () => {
    const check = tipHistory?.filter(val => val?.articleId === articleId);
    if (check?.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (isError) {
      if (error) {
        let message = '';
        switch (error as string) {
          case 'already_tipped_article':
            message = 'Already tipped this article';
            break;
          case 'Please_tip_after_10_minutes':
            message = 'You must wait 10 minutes to tip again';
            break;
          case 'you_cannot_tip_your_own_article':
            message = 'You cannot tip your own articles';
            break;
          case 'tip_limit_exceeded_for_today':
            message = 'Your tip limit exceeded for today';
            break;
          default:
            message = 'Something went wrong! Please try again';
        }
        toast.error(message);
      }
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success('You tipped!');
      revalidateArticleDetail(pathname);
    }
  }, [isSuccess, pathname]);

  if (!tipHistory) return null;
  return (
    <Box
      p={2}
      sx={{
        width: '100%',
        border: '1px solid ' + palette.primary.boxBorder,
        borderRadius: '10px',
        background: palette.primary.mainBackground,
      }}
    >
      {!tippedOrNot() ? (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography
              variant="body1"
              sx={{ textAlign: 'center', color: palette.primary[300] }}
            >
              Split the amount of 0.01 points for you and the author, we pay the
              tips from our rewards pool.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '25px',
            }}
          >
            <Slider
              // aria-label="Disabled slider"
              sx={{ width: '50%' }}
              value={value}
              onChange={handleChange}
              aria-labelledby="discrete-slider-small-steps"
              step={10}
              marks
              min={20}
              max={100}
              valueLabelDisplay="auto"
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '15px',
            }}
          >
            <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
              {value}% to author / {100 - value}% to me
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '25px',
            }}
          >
            {tipLoading ? (
              <CircularProgress color="secondary" />
            ) : (
              <Button variant="contained" onClick={handleTip}>
                Tip
              </Button>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              Start earning money by reading articles!
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box display="flex" gap={1}>
          <Typography variant="body1">
            You have already tipped this article
          </Typography>
          <TaskAltSharpIcon />
        </Box>
      )}
    </Box>
  );
}
