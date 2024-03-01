'use client';
import ShareIcon from '@/images/image/shareIcon';
import FlagIcon from '@/images/image/flagIcon';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import TextareaAutosize from '@/components/CustomTextArea';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  useAddReportArticleMutation,
  useAddReportUserMutation,
  useBlockUserMutation,
} from '@/lib/redux/slices/profile';
import { useToast } from '../Toast/useToast';
import {
  useCheckArticleIsSharedMutation,
  useShareArticleMutation,
} from '@/lib/redux';
import AddComment from '../Post/AddComment';
import { useTranslation } from 'react-i18next';
const BlockUserDisclaimer = () => {
  const {t}=useTranslation()
  return (
    <Box>
      <Typography translate="no" variant="h6" textAlign="center">
        {t('comp.articleContent.blockMsg')}
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Stack gap={1}>
        <Typography
          translate="no"
          variant="body2"
          component={'li'}
        ></Typography>
        <Typography translate="no" variant="body2" component={'li'}>
          {t('comp.articleContent.willBeUnfollow')}
        </Typography>
        <Typography translate="no" variant="body2" component={'li'}>
          {t('comp.articleContent.haveToFollow')}
        </Typography>
        <Typography translate="no" variant="body2" component={'li'}>
          {t('comp.articleContent.wishToBlock')}
        </Typography>
      </Stack>
    </Box>
  );
};



const ReportUserDisclaimer = ({ handleReportChange }) => {
  const [radioValue, setRadioValue] = useState('');
const {t} =useTranslation()
const reportChecks = [
  t('comp.articleContent.reportCheck1'),
   t('comp.articleContent.reportCheck2'),
    t('comp.articleContent.reportCheck3'),
     t('comp.articleContent.reportCheck4'),
      t('comp.articleContent.reportCheck'),
 
];
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.stopPropagation();
    const value = event.target.value; // No need for optional chaining here
    const name = event.target.name;

    if (name === 'check' && radioValue) {
      setRadioValue('');
    } else if (event.target.name === 'check') {
      setRadioValue(value);
    }
    handleReportChange(value);
  };
  return (
    <Box>
      <Typography translate="no" variant="h6" textAlign="center">
        {t('comp.articleContent.problemUnderstanding')}
       
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Stack gap={1}>
        <RadioGroup
          defaultValue={radioValue}
          defaultChecked={!!radioValue}
          onChange={handleChange}
          name="check"
        >
          {reportChecks.map((check, index) => (
            <FormControlLabel
              key={'label-' + index}
              value={check}
              control={<Radio />}
              label={check}
            />
          ))}
        </RadioGroup>

        <Typography variant="subtitle2">
          {t('comp.articleContent.violates')}
       
        </Typography>

        <TextareaAutosize onChange={handleChange} placeholder={t('comp.articleContent.violatesPlace')} />
      </Stack>
    </Box>
  );
};

export default function ActionModal({
  item,
  openDialog,
  setOpenDialog,
  articleDetails,
  username,
  setItem,
  text
}: any) {
  const { palette } = useTheme();
  const toast = useToast();
  const commentRef = useRef();

  const [reportReason, setReportReason] = useState('');
  const [commentText, setCommentText] = useState('');
  const [message, setMessage] = useState('');

  const [blockUser, { isSuccess: isBlocked, error: blockError }] =
    useBlockUserMutation();
  const [reportUser, { isSuccess: isUserReported, error: userError }] =
    useAddReportUserMutation();
  const [reportArticle, { data: reportArticleData, isSuccess: isArticleReported, error: articleError, isLoading }] =
    useAddReportArticleMutation();
  const [checkIsShared] = useCheckArticleIsSharedMutation();
  const [publishArticle] = useShareArticleMutation();

  const handleReportChange = (event: string) => {
    setReportReason(event);
  };

  const handleReportSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    try {
      if (item === 2) {
        await reportUser({ Username: username, Reason: reportReason });
      } else {
        await reportArticle({
          contentId: articleDetails?.id,
          Reason: reportReason,
        });
      }
      // setOpenDialog(false);
    } catch (error) {
      toast.error(
        `Error occured in reporting the ${item === 2 ? 'user' : 'article'}`
      );
      console.error('Error reporting the user:', error);
    }
  };

  const handleBlockUser = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    try {
      await blockUser({ username });
      toast.success(t('comp.articleContent.blockedMsg'));
      setOpenDialog(false);
    } catch (error) {
      toast.error(t('comp.articleContent.blockMsgErr'));
      console.error('Error blocking the user:', error);
    }
  };

  const handlePublish = async () => {
    const result: any = await checkIsShared(articleDetails.id);
    const status: boolean = result?.data;

    const payload = {
      content: commentText,
    };
    if (status) {
      toast.error(t('comp.articleContent.articleMsgErr'));
    } else {
      await publishArticle({ articleId: articleDetails.id, status, payload });
      toast.success(t('comp.articleContent.articleMsg'));
    }
    setCommentText('');
    setOpenDialog(false);
  };

  const getModalHeading = (item: number) => {
    switch (item) {
      case 0:
      case 2:
      case 4: 
        return (
          <Stack direction={'row'} justifyContent="center" gap={1}>
            <FlagIcon /> <Typography translate="no" variant="h6">{t('comp.articleContent.reportIssue')}</Typography>
          </Stack>
        );
      case 1:
        return (
          <Stack direction={'row'} justifyContent="center" gap={1}>
            <BlockOutlinedIcon />{' '}
            <Typography translate="no" variant="h6">{t('comp.articleContent.blockUser')}</Typography>
          </Stack>
        );
      case 3:
        return (
          <Stack direction={'row'} justifyContent="center" gap={1}>
            <ShareIcon /> <Typography translate="no" variant="h6">{t('comp.articleContent.share')}</Typography>
          </Stack>
        );

      default:
        break;
    }
  };

  const getModalButtons = (item: number) => {
    switch (item) {
      case 0:
      case 2:
        return (
          <>
            <Button
              autoFocus
              variant="contained"
              onClick={handleReportSubmit}
              // disabled={!reportReason}
            >
              {isLoading && <CircularProgress size={20} color="inherit" />}
              {!isLoading && t('comp.articleContent.report')}
            </Button>
            <Button translate="no" onClick={handleClose} variant="text">
              {t('comp.articleContent.close')}
            </Button>
          </>
        );
      case 1:
        return (
          <>
            <Button translate="no" variant="contained" autoFocus onClick={handleBlockUser}>
              {t('comp.articleContent.yes')}
            </Button>
            <Button translate="no" variant="text" onClick={handleClose} autoFocus>
              {t('comp.articleContent.no')}
            </Button>
          </>
        );
      case 3:
        return (
          <>
            <Button translate="no" variant="contained" autoFocus onClick={handlePublish}>
              {t('comp.articleContent.publish')}
            </Button>
            <Button translate="no" variant="text" onClick={handleClose} autoFocus>
              {t('comp.articleContent.close')}
            </Button>
          </>
        );
      case 4: 
        return (
          <>
            <Button translate="no" variant="text" onClick={handleClose} autoFocus>
              {t('comp.articleContent.done')}
            </Button>
          </>
        )
    }
  };

  const getModalContent = (item: number) => {
    switch (item) {
      case 0:
      case 2:
        return <ReportUserDisclaimer handleReportChange={handleReportChange} />;
      case 1:
        return <BlockUserDisclaimer />;

      case 3:
        return (
          <Box>
            <Box sx={{ padding: '10px' }}>
              <AddComment
                id={articleDetails.id}
                commentRef={commentRef}
                commentType={'ArticleComment'}
                commentText={commentText}
                setCommentText={setCommentText}
              />
            </Box>
            <Box sx={{ padding: '10px' }}>
              <Image
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: '100%' }}
                src={articleDetails?.coverPhotoPath}
                alt="thumbnail"
              />
            </Box>
            <Box
              sx={{
                padding: '10px',
                paddingTop: '1px',
                textTransform: 'capitalize',
              }}
            >
              <Typography variant="h1">{articleDetails?.title}</Typography>
            </Box>
            <Divider />
          </Box>
        );
      case 4: 
        return (
          <>
            <div> {message} </div>
            <div>
              The Floyx team will check {text === 'Material' ? 'content posted by user' : 'user profile'}, as soon as possible and will
              take the appropriate steps.
            </div>
          </>
        )
    }
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpenDialog(false);
  };

  useEffect(() => {
    if (isBlocked || isUserReported) {
      if (isBlocked) {
        toast.success('The user has been blocked !');
      }
      if (isUserReported) {
        toast.success('The user has been reported!');
      }
    }
  }, [isBlocked, isUserReported]);

  useEffect(() => {
    if (reportArticleData && reportArticleData) {
      if (typeof reportArticleData === 'string') {
        if (reportArticleData === 'Already_reported') {
          setMessage('The user has been reported!');
        }
        if (reportArticleData === 'Content_has_been_reported_thank_you') {
          setMessage('Content has been reported Successfully!! Thank you.');
        }
        setItem(4);
        setOpenDialog(true);
      }
      console.log(reportArticleData);
    }
  }, [reportArticleData, reportArticleData])
  useEffect(() => {
    if (blockError || articleError || userError)
      if (blockError) {
        toast.error(
          (blockError as any)?.data.value.code[0] || 'Somethinng went wrong'
        );
      }
    if (articleError) {
      toast.error(
        (articleError as any)?.data.value.code[0] || 'Somethinng went wrong'
      );
    }
    if (userError) {
      toast.error(
        (userError as any)?.data.value.code[0] || 'Somethinng went wrong'
      );
    }
  }, [blockError, articleError, userError]);

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{ sx: { background: palette.background.default } }}
      onClick={event => event.stopPropagation()}
    >
      <DialogTitle id="responsive-dialog-title">
        {getModalHeading(item)}
      </DialogTitle>
      <DialogContent>{getModalContent(item)}</DialogContent>
      <DialogActions>{getModalButtons(item)}</DialogActions>
    </Dialog>
  );
}
