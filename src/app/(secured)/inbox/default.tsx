'use client';

import { Box, IconButton, InputAdornment, TextField, debounce, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { SVGSearch } from '@/assets/images';
import ChatCard from './components/chat-item';
import Wrapper from '@/components/wrapper';
import { messageService } from '@/lib/services/new/messageService';
import { tokenService } from '@/lib/services/new/tokenService';
import { IInboxData, IThread, IUser } from './types';
import MessageLoader from './components/message-loader';
import useQuery from '@/lib/hooks/useFetch';

const Default = () => {
  // const { data = [], isLoading, error, fetch } = useQuery<[]>(ApiEndpoint.SearchPeople);
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
  console.log('Default ~ inboxData:', inboxData);

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

  const setCurrentUser = (user: IUser) => {
    setInboxData(prevState => ({ ...prevState, currentLoggedUser: user }));
  };

  // const debouncedUserSearch = debounce(userSearch, 500);

  // const userSearch = (searchText: string) => {};

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  if (isMobile && isChatOpen) {
    return null;
  }

  return (
    <Wrapper>
      <Box borderBottom={`1px solid ${palette?.mode === 'light' ? '#E7F0FC' : 'rgba(255, 255, 255, 0.15)'}`} padding="18px 20px 15px">
        <TextField
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

      {inboxData?.dataLoading && <MessageLoader />}

      {!inboxData?.dataLoading && (
        <Box
          sx={{
            height: '620px',
            overflowY: 'auto',
            pr: 1,
          }}
        >
          {inboxData?.threads?.map((thread: IThread, index: number) => {
            return <ChatCard key={index} {...thread} />;
          })}
        </Box>
      )}
    </Wrapper>
  );
};

export default Default;
