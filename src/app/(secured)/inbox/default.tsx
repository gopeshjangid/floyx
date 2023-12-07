'use client';

import { Box, IconButton, InputAdornment, TextField, debounce, useMediaQuery, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { SVGSearch } from '@/assets/images';
import ChatCard from './components/chat-item';
import Wrapper from '@/components/wrapper';
import { messageService } from '@/lib/services/new/messageService';
import { tokenService } from '@/lib/services/new/tokenService';
import { IInboxData, IThread, IUser } from './types';
import MessageLoader from './components/message-loader';
import useQuery from '@/lib/hooks/useFetch';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';

const Default = () => {
  const { data = [], isLoading, fetchData } = useQuery();
  const params = useParams();
  const { palette, breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('md'));
  const isChatOpen = params?.username;

  const [searchText, setSearchText] = useState<string>('');
  const [inboxData, setInboxData] = useState<IInboxData>({
    threads: [],
    currentLoggedUser: {},
    currentIndex: -1,
    users: [],
    dataLoading: true,
  });

  const saveConversations = (threads: IThread[]) => {
    setInboxData(prevState => ({ ...prevState, threads, dataLoading: false }));
  };

  useEffect(() => {
    tokenService.init();
  }, []);

  useEffect(() => {
    messageService.reloadAll();

    const loadAll = (data: IThread[]) => {
      saveConversations(data);
      setInboxData(prevState => ({ ...prevState, dataLoading: false }));
    };

    tokenService.onNewToken.on('USER', setCurrentUser);
    messageService.publisher.on('threads', loadAll);

    tokenService.emmitCurrentUser();
    return () => {
      tokenService.onNewToken.removeListener('USER', setCurrentUser);
      messageService.publisher.removeListener('threads', loadAll);
    };
  }, [params?.username]);

  useEffect(() => {
    const newUsers: any = [];
    const currentLoggedUser = inboxData.currentLoggedUser?.username;

    if ((data as any)?.value?.data?.length) {
      (data as any)?.value?.data?.map((user: IUser) => {
        if (
          user.username !== currentLoggedUser &&
          (user.accountType === 0 || user.official === true || user.allowPrivateMassages === true)
        ) {
          newUsers.push({ user });
        }
      });
    }
    setInboxData(prevState => ({ ...prevState, users: newUsers }));
  }, [data]);

  const setCurrentUser = (user: IUser) => {
    setInboxData(prevState => ({ ...prevState, currentLoggedUser: user }));
  };

  const userSearch = (text: string) => {
    if (text) {
      fetchData({
        method: 'GET',
        urlEndPoint: `${ApiEndpoint.FindUserByName}/${text}/true`,
      });
    } else {
      setInboxData(prevState => ({ ...prevState, users: [] }));
    }
  };

  const debouncedUserSearch = useCallback(
    debounce(text => text && userSearch(text), 500),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedUserSearch(e.target.value);
    setSearchText(e.target.value);
  };

  if (isMobile && isChatOpen) {
    return null;
  }

  return (
    <Wrapper>
      <Box borderBottom={`1px solid ${palette?.mode === 'light' ? '#E7F0FC' : 'rgba(255, 255, 255, 0.15)'}`} padding="18px 20px 15px">
        <TextField
          name="search"
          fullWidth
          hiddenLabel
          placeholder="Search people..."
          value={searchText}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" color="primary">
                  <SVGSearch />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {(inboxData?.dataLoading || isLoading) && <MessageLoader />}

      {!inboxData?.dataLoading && (
        <Box
          sx={{
            height: '620px',
            overflowY: 'auto',
            pr: 1,
          }}
        >
          {inboxData?.users?.map(({ user }: any, index: number) => {
            return <ChatCard key={index} username={user.username} name={user.name} />;
          })}

          {inboxData?.threads?.map((thread: IThread, index: number) => {
            return (
              <ChatCard key={index} username={thread.user?.username} name={thread?.user?.name} lastMessageDate={thread.lastMessageDate} />
            );
          })}
        </Box>
      )}
    </Wrapper>
  );
};

export default Default;
