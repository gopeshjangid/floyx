'use client';
import { Box, Skeleton, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import moment from 'moment';

import ChatHeader from '@/app/(secured)/inbox/components/chat-header';
import ChatInput from '@/app/(secured)/inbox/components/chat-input';
import Wrapper from '@/components/wrapper';
import { tokenService } from '@/lib/services/new/tokenService';
import { messageService } from '@/lib/services/new/messageService';
import MessageLoading from '../../loading';
import ChatBox from '../../components/chat-box';
import { IUser } from '../../types';
import { allRoutes } from '@/constants/allRoutes';
import { useDeleteMessageMutation } from '@/lib/redux/slices/notification';
import { useLazyGetProfileDetailsQuery } from '@/lib/redux/slices/profile';

interface IChatPageData {
  conversation: any[];
  currentLoggedUser: any;
  text: string;
  toggleModal: boolean;
  showEmojiPicker: boolean;
  allPostReceived: boolean;
  disabledSendButton?: boolean;
}

const userBlockedMessages = [
  'Unable_to_show_detail_unblock_first',
  'Unable_to_show_data_user_blocked_you',
  'Both_user_blocked_each_other',
];

const ChatPage = () => {
  const router = useRouter();
  const params = useParams();
  const username: string = params?.username?.toString() || '';

  const [fetchUsers, { data, isFetching: chatUserDataLoading }] =
    useLazyGetProfileDetailsQuery();
  const [deleteConversation, { data: deleteData, isLoading: deleteLoading }] =
    useDeleteMessageMutation();

  const [chatUserData, setChatUserData] = useState<IUser>(data as any);
  const [chatPageData, setChatPageData] = useState<IChatPageData>({
    conversation: [],
    currentLoggedUser: {},
    text: '',
    toggleModal: false,
    showEmojiPicker: false,
    allPostReceived: false,
  });
  const [sendBtnDisabled, setSendBtnDisabled] = useState<boolean>(true);
  const [shouldScrollToBottom, setShouldScrollToBottom] =
    useState<boolean>(false);

  const mountedRef = useRef(true);
  const wrapperRef = useRef<HTMLElement>(null);

  const isChatLoading = chatUserDataLoading;

  useEffect(() => {
    if (data) {
      setChatUserData(data as any);
    }
  }, [data]);

  useEffect(() => {
    if ((deleteData as any)?.value?.code === 'success') {
      router.push(allRoutes.inbox);
    }
  }, [deleteData]);

  useEffect(() => {
    tokenService.onNewToken.on('USER', getUserInfo);
    messageService.publisher.on('messages', newMessage);
    tokenService.emmitCurrentUser();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToEndList();
      setShouldScrollToBottom(false);
    }
  }, [shouldScrollToBottom]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false);
    mountedRef.current = true;
    tokenService.emmitCurrentUser();
    loadData();
    getUserByUserName(username);

    return () => {
      document.removeEventListener('mousedown', handleClick, false);
      mountedRef.current = false;
    };
  }, [username]);

  const newMessage = (data: {
    user: { username: any };
    oppositUser: { username: any };
    id: any;
  }) => {
    if (!mountedRef.current) {
      return;
    }
    if (
      data.user.username === username ||
      data.oppositUser.username === username
    ) {
      setChatPageData(prevState => ({
        ...prevState,
        conversation: [...prevState.conversation, data],
      }));
      messageService.markAsRead(data.id);
    }
    setShouldScrollToBottom(true);
  };

  const getUserInfo = (data: any) => {
    if (!mountedRef.current) {
      return;
    }
    setChatPageData(prevState => ({
      ...prevState,
      currentLoggedUser: data,
    }));
  };

  const loadData = () => {
    messageService.loadMessages(username, undefined).then((resp: any) => {
      setChatPageData(prevState => ({
        ...prevState,
        conversation: resp?.value?.data ?? [],
        allPostReceived: (resp?.value?.data.length ?? 0) < 10,
      }));
      messageService.reloadAll();
      scrollToEndList();
    });
  };

  const loadMore = () => {
    const date = moment(chatPageData?.conversation?.[0].time).utc();
    messageService.loadMessages(username, date).then((resp: any) => {
      setChatPageData(prevState => ({
        ...prevState,
        conversation: [...resp.value.data, ...prevState.conversation],
        allPostReceived: resp.value.data.length < 10,
      }));
    });
  };

  const onDeleteConversation = () => {
    deleteConversation({ username });
  };

  const sendMessage = (text: string) => {
    if (text.trim() !== '') {
      setSendBtnDisabled(true);
      messageService?.sendMessage(username, text)?.finally(() => {
        setSendBtnDisabled(false);
        scrollToEndList();
      });
    }
  };

  const handleClick = (e: { target: any }) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setChatPageData(prevState => ({
        ...prevState,
        showEmojiPicker: false,
      }));
    }
  };

  const scrollToEndList = () => {
    if (document.getElementsByClassName('message-list-end')[0]) {
      document.getElementsByClassName('message-list-end')[0].scrollIntoView();
    }
  };

  const getUserByUserName = (username: string) => {
    fetchUsers({ username });
  };

  const onMessageChange = (message: string) => {
    setSendBtnDisabled(message.trim() === '');
  };

  const getBlockedMessage = () => {
    switch (data?.code) {
      case 'Unable_to_show_detail_unblock_first':
        return 'You blocked this user!';
        break;
      case 'Unable_to_show_data_user_blocked_you':
        return 'User has blocked you ! Can not send message';
        break;
      case 'Both_user_blocked_each_other':
        return 'You have blocked each other';
        break;
      default:
        return 'some thing went wrong!';
        break;
    }
  };

  const isBlocked = userBlockedMessages.indexOf(data?.code ?? '') > -1;

  return (
    <>
      <Wrapper mb={2}>
        {isChatLoading ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 14px',
            }}
          >
            <Skeleton variant="circular" width={60} height={60} />
            <Skeleton variant="text" width="60%" height={90} />
            <Skeleton
              variant="rectangular"
              width={60}
              height={19}
              sx={{
                marginLeft: 'auto',
                marginTop: '-30px',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
              }}
            />
          </Box>
        ) : (
          !isBlocked && (
            <ChatHeader
              deleteLoading={deleteLoading}
              name={chatUserData?.name}
              username={chatUserData?.username}
              lastMessageDate={
                chatPageData?.conversation?.[
                  chatPageData?.conversation?.length - 1
                ]?.time
              }
              handleDelete={onDeleteConversation}
            />
          )
        )}
        {!isBlocked ? (
          <Box padding={{ md: '13px 25px', xs: '13px 15px' }}>
            <Box
              sx={{
                height: '460px',
                overflowY: 'auto',
                pr: 1,
              }}
              width="100%"
            >
              {isChatLoading && <MessageLoading />}
              {!isChatLoading && (
                <ChatBox
                  conversations={chatPageData.conversation}
                  receiverUsername={username}
                  loadMore={loadMore}
                  loadMoreMessageBtn={!chatPageData.allPostReceived}
                />
              )}
              <div
                className="message-list-end"
                style={{ float: 'left', clear: 'both' }}
              />
            </Box>
          </Box>
        ) : (
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            p={2}
            sx={{ minHeight: '100px' }}
          >
            <Typography variant="subtitle1" color={'red'}>
              {getBlockedMessage()}
            </Typography>
          </Box>
        )}
      </Wrapper>
      {!isChatLoading && !isBlocked && (
        <ChatInput
          onSubmit={sendMessage}
          disabled={sendBtnDisabled}
          onMessageChange={onMessageChange}
        />
      )}
    </>
  );
};

export default ChatPage;
