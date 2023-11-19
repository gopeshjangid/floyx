'use client';
import { Box, Skeleton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';

import ChatHeader from '@/app/(secured)/inbox/components/chat-header';
import ChatInput from '@/app/(secured)/inbox/components/chat-input';
import Wrapper from '@/components/wrapper';
import { tokenService } from '@/lib/services/new/tokenService';
import { messageService } from '@/lib/services/new/messageService';
import useQuery from '@/lib/hooks/useFetch';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';
import MessageLoading from '../../loading';
import ChatBox from '../../components/chat-box';
import { IUser } from '../../types';

interface IChatPageData {
  conversation: any[];
  currentLoggedUser: any;
  text: string;
  toggleModal: boolean;
  showEmojiPicker: boolean;
  allPostReceived: boolean;
  disabledSendButton: boolean;
}

const ChatPage = () => {
  const { data = [], isLoading: chatUserDataLoading, fetchData } = useQuery();
  const [chatUserData, setChatUserData] = useState<IUser>(data as any);
  const params = useParams();
  const username: string = params?.username?.toString() || '';
  const [chatPageData, setChatPageData] = useState<IChatPageData>({
    conversation: [],
    currentLoggedUser: {},
    text: '',
    toggleModal: false,
    showEmojiPicker: false,
    allPostReceived: false,
    disabledSendButton: false,
  });

  const mountedRef = useRef(true);
  // const disabledSendButton = useRef(false);
  const wrapperRef = useRef<HTMLElement>(null);

  // useEffect(() => {
  //   setUserState(username);
  // }, [username]);

  useEffect(() => {
    setChatUserData((data as any)?.value?.data?.[0]);
  }, [data]);

  useEffect(() => {
    if (chatPageData?.conversation?.length > 0) {
      scrollToEndList();
    }
  }, [chatPageData?.conversation]);

  useEffect(() => {
    tokenService.onNewToken.on('USER', getUserInfo);
    messageService.publisher.on('messages', newMessage);
    tokenService.emmitCurrentUser();

    return () => {
      mountedRef.current = false;
    };
  }, []);

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

  const newMessage = (data: { user: { username: any }; oppositUser: { username: any }; id: any }) => {
    if (!mountedRef.current) {
      return;
    }
    if (data.user.username === username || data.oppositUser.username === username) {
      setChatPageData(prevState => ({
        ...prevState,
        conversation: [...prevState.conversation, data],
      }));
      messageService.markAsRead(data.id);
    }
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
        conversation: resp.value.data,
        allPostReceived: resp.value.data.length < 10,
      }));
      messageService.reloadAll();
      scrollToEndList();
    });
  };

  // const loadMore = () => {
  //   const user = userState.username;
  //   const date = moment(chatPageData.conversation[0].time).utc();
  //   messageService.loadMessages(user, date).then((resp: { data: string | any[] }) => {
  //     setChatPageData(prevState => ({
  //       ...prevState,
  //       conversation: [...resp.value.data, ...prevState.conversation],
  //       allPostReceived: resp.value.data.length < 10,
  //     }));
  //   });
  // };

  // const handleText = (e: { target: { name: any; value: any } }) => {
  //   const { name, value } = e.target;
  //   setChatPageData(prevState => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const toggleModal = (toggle: boolean) => {
  //   setChatPageData(prevState => ({
  //     ...prevState,
  //     toggleModal: toggle,
  //   }));
  // };

  // const deleteConversation = () => {
  //   // TODO:
  //   // requestService.delete(`${ApiEndpoint.DeleteMessage}/${userState.username}`).success(() => {
  //   //   props.history.push('/inbox');
  //   // });
  //   toggleModal(false);
  // };

  // const sendMessage = () => {
  //   let currentDisabledSendButton = chatPageData.disabledSendButton;
  //   if (chatPageData.text.trim() !== '') {
  //     currentDisabledSendButton = true;
  //     messageService
  //       ?.sendMessage(username, chatPageData.text)!
  //       .catch(err => {
  //         currentDisabledSendButton = false;
  //         setChatPageData(prevState => ({
  //           ...prevState,
  //           disabledSendButton: currentDisabledSendButton,
  //         }));
  //       })
  //       .then(() => {
  //         currentDisabledSendButton = false;
  //         setChatPageData(prevState => ({
  //           ...prevState,
  //           text: '',
  //           disabledSendButton: currentDisabledSendButton,
  //         }));
  //       });
  //   }
  // };

  // const selectEmoji = (emoji: { native: any }) => {
  //   setChatPageData(prevState => ({
  //     ...prevState,
  //     showEmojiPicker: false,
  //     text: `${prevState.text}${emoji.native}`,
  //   }));
  // };

  // const showEmojiPickers = () => {
  //   setChatPageData(prevState => ({
  //     ...prevState,
  //     showEmojiPicker: !prevState.showEmojiPicker,
  //   }));
  // };

  const handleClick = (e: { target: any }) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setChatPageData(prevState => ({
        ...prevState,
        showEmojiPicker: false,
      }));
    }
  };

  const scrollToEndList = () => {
    document.getElementsByClassName('message-list-end')[0].scrollIntoView();
  };

  const getUserByUserName = (username: string) => {
    fetchData({
      method: 'GET',
      urlEndPoint: `${ApiEndpoint.FindUserByName}/${username}/true`,
    });
  };

  const isChatLoading = chatUserDataLoading || !chatUserData?.name;

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
          <ChatHeader
            name={chatUserData?.name}
            username={chatUserData?.username}
            lastMessageDate={chatPageData?.conversation?.[chatPageData?.conversation?.length - 1]?.time}
          />
        )}
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
            {!isChatLoading && <ChatBox conversations={chatPageData.conversation} recieverUsername={username} />}
            <div className="message-list-end" style={{ float: 'left', clear: 'both' }} />
          </Box>
        </Box>
      </Wrapper>
      <ChatInput />
    </>
  );
};

export default ChatPage;
