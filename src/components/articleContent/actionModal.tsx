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

const BlockUserDisclaimer = () => {
  return (
    <Box>
      <Typography variant="h6" textAlign="center">
        If you block this user you will no be able to :
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Stack gap={1}>
        <Typography variant="body2" component={'li'}>
          View their profile, posts, articles and events
        </Typography>
        <Typography variant="body2" component={'li'}>
          You will both unfollow each other
        </Typography>
        <Typography variant="body2" component={'li'}>
          To see the user content you have to follow him again after unblocking.
        </Typography>
        <Typography variant="body2" component={'li'}>
          Do you really wish to block this user?
        </Typography>
      </Stack>
    </Box>
  );
};

const reportChecks = [
  'Their Materials are abusive or hateful',
  "It's suspicious or spam",
  'It appears their account is hacked',
  "They're pretending to be me or someone else",
  'Their profile info and/or images includes abusive or hateful content',
];

const ReportUserDisclaimer = ({ handleReportChange }) => {
  const [radioValue, setRadioValue] = useState('');

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
      <Typography variant="h6" textAlign="center">
        Help us understand the problem Why do you want to report this User?
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
          If the user violates the Floyx rules in other ways, Please write to us
          below :
        </Typography>

        <TextareaAutosize onChange={handleChange} placeholder="Type here..." />
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
      toast.success('BLOCKED');
      setOpenDialog(false);
    } catch (error) {
      toast.error('Error occured in blocking the user');
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
      toast.error('This article has already been shared');
    } else {
      await publishArticle({ articleId: articleDetails.id, status, payload });
      toast.success('Article is Published Succesfully ');
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
            <FlagIcon /> <Typography variant="h6">Report Issue</Typography>
          </Stack>
        );
      case 1:
        return (
          <Stack direction={'row'} justifyContent="center" gap={1}>
            <BlockOutlinedIcon />{' '}
            <Typography variant="h6">Block User</Typography>
          </Stack>
        );
      case 3:
        return (
          <Stack direction={'row'} justifyContent="center" gap={1}>
            <ShareIcon /> <Typography variant="h6">Share Article</Typography>
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
              {!isLoading &&  "Report"}
            </Button>
            <Button onClick={handleClose} variant="text">
              Close
            </Button>
          </>
        );
      case 1:
        return (
          <>
            <Button variant="contained" autoFocus onClick={handleBlockUser}>
              Yes
            </Button>
            <Button variant="text" onClick={handleClose} autoFocus>
              No
            </Button>
          </>
        );
      case 3:
        return (
          <>
            <Button variant="contained" autoFocus onClick={handlePublish}>
              Publish
            </Button>
            <Button variant="text" onClick={handleClose} autoFocus>
              Close
            </Button>
          </>
        );
      case 4: 
        return (
          <>
            <Button variant="text" onClick={handleClose} autoFocus>
              Done
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
