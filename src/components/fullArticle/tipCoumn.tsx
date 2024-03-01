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
import { useTranslation } from 'react-i18next';

export default function TipColumn({
  details,
  articlePuclicUrl,
  articleId,
}: any) {
  const session = useSession();
  const [value, setValue] = useState<number>(30);
  const pathname = usePathname();
  const isSameUser = details.user.username === session.data?.user.username;
  const [updateTip, { isLoading: tipLoading, isError, error, isSuccess }] =
    useSetTipMutation();
  const {
    data: fetchedTipHistory,
    isFetching,
    isLoading,
  } = useGetTipHistoryQuery(undefined, {
    skip:
      session?.status === 'loading' ||
      session?.status === 'unauthenticated' ||
      isSameUser,
  });
  const toast = useToast();
  const { t } = useTranslation();
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

  useEffect(() => {
    if (isError) {
      if (error) {
        let message = '';
        switch (error as string) {
          case 'already_tipped_article':
            message = t('comp.fullArticle.toastMsg.msg5');
            break;
          case 'Please_tip_after_10_minutes':
            message = t('comp.fullArticle.toastMsg.msg6');
            break;
          case 'you_cannot_tip_your_own_article':
            message = t('comp.fullArticle.toastMsg.msg7');
            break;
          case 'tip_limit_exceeded_for_today':
            message = t('comp.fullArticle.toastMsg.msg8');
            break;
          default:
            message = t('comp.fullArticle.toastMsg.msg9');
        }
        toast.error(message);
      }
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      //refetch();
      toast.success(t('comp.fullArticle.toastMsg.msg10'));
      revalidateArticleDetail(pathname);
    }
  }, [isSuccess, pathname]);

  console.log(
    "session.status === 'loading' || isFetching || isLoading  session->",
    session.status === 'loading',
    '->isfetching',
    isFetching,
    'isloding-->',
    isLoading
  );

  if (session.status === 'loading' || isFetching || isLoading) {
    return (
      <Box textAlign={'center'} width={'100%'}>
        <CircularProgress />
      </Box>
    );
  }

  if (isSameUser) return null;

  console.log('fetchedTipHistory: ', fetchedTipHistory);

  const history = (fetchedTipHistory ?? []).filter(
    val => val?.articleId === articleId
  );
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
      {history.length === 0 ? (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography
              translate="no"
              variant="body1"
              sx={{ textAlign: 'center', color: palette.primary[300] }}
            >
              {t('comp.fullArticle.split')}
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
              <Button translate="no" variant="contained" onClick={handleTip}>
                {t('comp.fullArticle.tip')}
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
            <Typography
              translate="no"
              variant="body1"
              sx={{ textAlign: 'center' }}
            >
              {t('comp.fullArticle.startPoints')}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box display="flex" gap={1}>
          <Typography translate="no" variant="body1">
            {t('comp.fullArticle.toastMsg.msg5')}
          </Typography>
          <TaskAltSharpIcon />
        </Box>
      )}
    </Box>
  );
}
