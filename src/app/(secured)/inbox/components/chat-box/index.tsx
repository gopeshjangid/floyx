import { Box, Button, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import moment from 'moment';

import ChatReceiverCard from '../chat-receiver-card';
import ChatSenderCard from '../chat-sender-card';
import { IMessage } from '../../types';

interface IChatBox {
  conversations: IMessage[];
  receiverUsername: string | string[];
  loadMore: () => void;
  loadMoreMessageBtn?: boolean;
}

interface GroupedMessages {
  [key: string]: IMessage[];
}

const groupMessagesByDate = (conversations: IMessage[]): GroupedMessages => {
  const grouped: GroupedMessages = {};
  conversations.forEach(message => {
    let dateLabel;
    const messageDate = moment(message.time);
    if (messageDate.isSame(moment(), 'day')) {
      dateLabel = 'Today';
    } else if (messageDate.isSame(moment().subtract(1, 'days'), 'day')) {
      dateLabel = 'Yesterday';
    } else {
      dateLabel = messageDate.format('MMM DD');
    }

    if (!grouped[dateLabel]) {
      grouped[dateLabel] = [];
    }
    grouped[dateLabel].push(message);
  });
  return grouped;
};

const ChatBox = ({ conversations, receiverUsername, loadMore, loadMoreMessageBtn }: IChatBox) => {
  const groupedConversations = groupMessagesByDate(conversations);

  return (
    <Box display="flex" flexDirection="column" justifyContent="flex-end" gap={2}>
      {loadMoreMessageBtn && (
        <Button
          color="secondary"
          onClick={loadMore}
          sx={{
            borderRadius: '20px',
            width: 'fit-content',
            alignSelf: 'center',
            border: theme => `1px solid ${theme.palette.primary.main}`,
          }}
        >
          Load older messages
        </Button>
      )}
      {Object.keys(groupedConversations).map(dateLabel => (
        <Fragment key={dateLabel}>
          <Typography
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              padding: '5px 0',
            }}
            textAlign="center"
            color="#878D9A"
            fontSize="15px"
            fontWeight="500"
          >
            {dateLabel}
          </Typography>

          {groupedConversations?.[dateLabel].map(conversation => (
            <Fragment key={conversation.id}>
              {conversation.oppositUser.username === receiverUsername ? (
                <ChatSenderCard message={conversation.text} time={conversation.time} />
              ) : (
                <ChatReceiverCard message={conversation.text} time={conversation.time} />
              )}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </Box>
  );
};

export default ChatBox;
