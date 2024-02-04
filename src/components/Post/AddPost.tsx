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
import React, { useCallback, useRef, useState } from 'react';
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
  const imageFileInput = useRef<HTMLInputElement>(null);
  const [postObj, setPostObj] = useState(initialPostObj);
  const session = useSession();
  const { palette } = useTheme();
  const value = 0;
  const [imagePreview, setImagePreview] = useState<any>('');
  const [imageToUpload, setImageToUpload] = useState<string | Blob>('');
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [createPost, { error, isLoading }] = useCreatePostMutation();
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
    setPostObj(initialPostObj);
    setImagePreview('');
    setImageToUpload('');
    toast.success('Post is published successfully');
    if (writeDialog) setOpenWriteDialog(false);
  };

  const publishPost = () => {
    setPostObj(prev => ({ ...prev, publishButtonDisabled: true }));
    publishImage();
  };

  const renderUserSuggestion = (user: any) => {
    return <MentionItem user={user} />;
  };
  return (
    <>
      <PostBox>
        {!writeDialog && (
          <Tabs
            value={value}
            aria-label="icon tabs example"
            sx={{ paddingX: 2 }}
          >
            <Tab
              sx={{ paddingX: 2 }}
              label={<GradientText>Post</GradientText>}
            />
            <Tab
              component={Link}
              label={
                <Typography variant="subtitle2">Write an article</Typography>
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
              src={`${ApiEndpoint.ProfileDetails}/avatar/${(session as any)
                ?.data?.user?.username}`}
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
                    ? 'What is happening?'
                    : 'Want to add something to your post?'
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
              <Box>
                <IconButton onClick={toggleVisibility}>
                  <MoodIcon />
                </IconButton>
                {isVisible ? <Picker data={data} onEmojiSelect={(emoji)=>handlePostText(null, null, null, emoji)} /> : <></>}
              </Box>
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
            <Typography component={'span'} color={'error'}>
              {'Please add photo description to publish it.'}
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
              <Typography variant="subtitle1">Photo</Typography>
            </label>
          </Box>
        </Box>
      </PostBox>
      <Box mt={2} position={'relative'}>
        {(imagePreview || postObj.postText !== '') && (
          <Button
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
            {!isLoading ? 'Publish Post' : 'Please wait'}
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
