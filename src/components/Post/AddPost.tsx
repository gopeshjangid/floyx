'use client';

import {
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
  CircularProgress,
  Divider,
  useTheme,
  IconButton,
} from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { userDetail } from '../../constant/payload';
import { MentionsInput, Mention } from 'react-mentions';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import { PostBox } from './styledPostBox';
import { useCreatePostMutation } from '@/lib/redux';
import { useSession } from 'next-auth/react';
import UserAvatar from '../UserAvatar';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';
import { useToast } from '../Toast/useToast';
import { useLazyGetUserSuggestionQuery } from '@/lib/redux/slices/comments';
import MentionItem from '../MentionItem';
import { GradientText } from '../usernameLink';
import { CloseOutlined } from '@mui/icons-material';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import MoodIcon from '@mui/icons-material/Mood';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import CustomEmojiPopup from '../CustomEmojiPopup';

const initialPostObj = {
  postText: '',
  postTextLeft: 2000,
  publishButtonDisabled: false,
};

interface MyComponentProps {
  writeDialog?: boolean; // Optional prop
  setOpenWriteDialog?: any;
}

function AddPost({
  writeDialog = false,
  setOpenWriteDialog,
}: MyComponentProps) {
  const toast = useToast();
  const router = useRouter();
  const imageFileInput = useRef<HTMLInputElement>(null);
  const [postObj, setPostObj] = useState(initialPostObj);
  const session = useSession();
  const { palette } = useTheme();
  const value = 0;
  const [imagePreview, setImagePreview] = useState<any>('');
  const [imageToUpload, setImageToUpload] = useState<string | Blob>('');
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [createPost, { error, isLoading, isSuccess: successPublishedPost }] =
    useCreatePostMutation();
  const [getUserSuggestion] = useLazyGetUserSuggestionQuery();
  const getUserDetails = async (mentionValue: string, callback: any) => {
    let userList: any = [];
    if (mentionValue) {
      const renderSuggestions = await getUserSuggestion(mentionValue);
      if (renderSuggestions && Array.isArray(renderSuggestions?.data)) {
        userList = renderSuggestions?.data;
      }
      callback(userList);
    }
    callback(userList);
  };

  const handleImg = (e: any) => {
    e.preventDefault();
    if (e.target.files.length) {
      const reader = new FileReader();
      const img = e.target.files[0];
      reader.readAsDataURL(img);
      reader.onloadend = () => {
        setImageToUpload(img);
        setImagePreview(reader.result || '');
      };
    }
    e.target.value = ''; // Clear the input value
  };

  const calulcateLength = (str: string) => {
    const output = str.replace(
      /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g,
      ''
    );
    const total = fancyCount(str) - fancyCount(output) + fancyCount(output);
    return total;
  };

  const handlePostText = useCallback(
    (e: any, newValue: any, newPlainTextValue: any, emoji?: any) => {
      let text = '';
      if (e && e.target) {
        text = e.target.value;
      } else if (emoji) {
        text = `${postObj.postText}${emoji.native}`;
      }
      // const text = e.target.value;
      const newTextCount = calulcateLength(text); //newPlainTextValue
      const remaining = 2000 - newTextCount;
      if (remaining < 0) {
        return;
      }
      setPostObj(prev => {
        return {
          ...prev,
          postText: newTextCount > remaining ? text : text.slice(0, remaining),
          postTextLeft: remaining,
          publishButtonDisabled: newTextCount > 0,
        };
      });
    },
    [setPostObj, calulcateLength]
  );

  const fancyCount = (str: any) => {
    return Array.from(str.split(/[\ufe00-\ufe0f]/).join('')).length;
  };

  const publishImage = async () => {
    const formData = new FormData();
    formData.append('text', postObj.postText);
    formData.append('file', imageToUpload);
    await createPost(formData);
  };

  useEffect(() => {
    if (successPublishedPost) {
      setPostObj(initialPostObj);
      setImagePreview('');
      setImageToUpload('');
      toast.success(t('Home.createPost.tab1.successMsg'));
      if (writeDialog) setOpenWriteDialog(false);
      //window.location.reload();
    }
  }, [successPublishedPost]);

  const publishPost = () => {
    setPostObj(prev => ({ ...prev, publishButtonDisabled: true }));
    publishImage();
    setIsVisible(false);
  };

  const renderUserSuggestion = (user: any) => {
    return <MentionItem user={user} />;
  };
  return (
    <>
      <PostBox translate="no">
        {!writeDialog && (
          <Tabs
            value={value}
            aria-label="icon tabs example"
            sx={{ paddingX: 2 }}
          >
            <Tab
              sx={{ paddingX: 2 }}
              label={
                <GradientText translate="no">
                  {t('Home.createPost.tab1.title')}
                </GradientText>
              }
            />
            <Tab
              component={Link}
              label={
                <Typography translate="no" variant="subtitle2">
                  {t('Home.createPost.tab2.title')}
                </Typography>
              }
              sx={{ marginTop: '8px' }}
              href="/composer/create"
            />
          </Tabs>
        )}
        <Box
          className={`input-container ${
            postObj.postTextLeft < 0
              ? 'danger-text'
              : postObj.postTextLeft < 30
                ? 'warning-text'
                : ''
          }`}
        >
          <Box gap={1} className="styled-input-container">
            <UserAvatar
              src={`${ApiEndpoint.ProfileDetails}/avatar/${
                (session as any)?.data?.user?.username
              }`}
              alt={(session as any)?.data?.user?.username}
              sx={{ width: '49px', height: '49px' }}
            />
            <Box className="mention-input">
              <MentionsInput
                className="mention-input-container"
                singleLine={false}
                value={postObj.postText}
                onChange={handlePostText}
                placeholder={
                  userDetail.sharedPost && !userDetail.sharedEvent
                    ? t('Home.createPost.tab1.happenPlaceholder')
                    : t('Home.createPost.tab1.addPlaceholder')
                }
              >
                <Mention
                  trigger="@"
                  displayTransform={(id: string) => `@${id}`}
                  data={getUserDetails}
                  renderSuggestion={renderUserSuggestion}
                  appendSpaceOnAdd={true}
                />
              </MentionsInput>
              <Box textAlign={'right'}>
                <Typography
                  color={postObj.postTextLeft < 30 ? 'error' : 'textPrimary'}
                  variant="caption"
                >
                  {postObj.postTextLeft}/2000
                </Typography>
              </Box>
            </Box>
          </Box>
          {error && !isLoading && (
            <Typography translate="no" component={'span'} color={'error'}>
              {t('Home.createPost.tab1.missingDiscription')}
            </Typography>
          )}
          {imagePreview && (
            <Box position={'relative'} mt={2}>
              <Image
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto', borderRadius: '10px' }} // optional
                src={imagePreview}
                alt="thumbnail"
              />
              <IconButton
                sx={{ position: 'absolute', top: '-22px', right: '-22px' }}
                onClick={() => setImagePreview('')}
              >
                <CloseOutlined />
              </IconButton>
            </Box>
          )}
        </Box>
        <Divider />
        <Box sx={{ display: 'inline-flex' }}>
          <Box className="upload-media">
            <Box>
              <input
                className="file-imput"
                type="file"
                onChange={handleImg}
                accept="image/x-png,image/gif,image/jpeg"
                ref={imageFileInput}
              />
              <label
                className="image-upload"
                onClick={() => {
                  imageFileInput?.current?.click();
                }}
              >
                <CropOriginalIcon />
                <Typography translate="no" variant="subtitle1">
                  {t('Home.createPost.tab1.photoLabel')}
                </Typography>
              </label>
            </Box>
          </Box>
          <Box sx={{ padding: '9px 0px' }}>
            <CustomEmojiPopup onEmojiChange={(emoji) => handlePostText(null,null,null,emoji) } />
          </Box>
        </Box>
      </PostBox>
      <Box translate="no" mt={2} position={'relative'}>
        {(imagePreview || postObj.postText !== '') && (
          <Button
            translate="no"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              marginTop: 1,
              color:
                palette.mode === 'light'
                  ? palette.common.white
                  : palette.common.black,
              textTransform: 'capitalize',
            }}
            onClick={publishPost}
          >
            {!isLoading
              ? t('Home.createPost.tab1.publish')
              : t('Home.createPost.tab1.wait')}
          </Button>
        )}
        {isLoading && (
          <CircularProgress
            sx={{
              color: palette.secondary.main,
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </>
  );
}

export default React.memo(AddPost);
