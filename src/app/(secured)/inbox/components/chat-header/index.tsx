import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Theme,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import React from 'react';
import Link from 'next/link';

import { allRoutes } from '@/constants/allRoutes';
import UserAvatar from '@/components/UserAvatar';
import { getRelativeTime } from '@/lib/utils';
import BlockReportUser from '@/app/(secured)/profile/_components/blockReportUser';

const ChatWrapper = styled(ListItem)(({ theme }: { theme: Theme }) => ({
  alignItems: 'center',
  gap: '10px',
  padding: '12px 14px',
  borderBottom: `1px solid ${theme.palette.primary[800]}
  }`,
  '& .MuiListItemText-root': {
    margin: '0',
  },
  [theme.breakpoints.up('md')]: {
    padding: '12px 26px',
    gap: '18px',
  },
}));
interface IChatCard {
  username: string;
  name: string;
  lastMessageDate?: string;
  deleteLoading?: boolean;
  handleDelete: () => void;
}

const ChatHeader = ({
  name,
  username,
  lastMessageDate,
  handleDelete,
  deleteLoading,
}: IChatCard) => {
  const { palette } = useTheme();

  return (
    <>
      <ChatWrapper>
        <Link href={`${allRoutes.profile}/${username}`}>
          <ListItemAvatar>
            <UserAvatar
              alt="Travis Howard"
              src={`${allRoutes.profile}/${username}`}
              sx={{
                width: { md: '59px', xs: '50px' },
                height: { md: '59px', xs: '50px' },
              }}
            />
          </ListItemAvatar>
        </Link>
        <ListItemText
          primary={
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              <Link href={`${allRoutes.profile}/${username}`}>
                <Typography
                  color={palette?.mode === 'light' ? '#2F2E41' : '#fff'}
                  fontSize="16px"
                  fontWeight={500}
                  component="span"
                >
                  {name?.split(' ')[0]}
                </Typography>
                <Typography
                  fontSize="14px"
                  fontWeight={400}
                  component="span"
                  className="gradient-text"
                  ml={1}
                >
                  @{username}
                </Typography>
              </Link>

              <BlockReportUser
                username={username}
                onSuccess={() => {}}
                isDeleteUser
                handleDelete={handleDelete}
                deleteLoading={deleteLoading}
              />
            </Box>
          }
          secondary={
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color={palette.primary[300]}
              fontSize="14px"
              fontWeight={500}
            >
              {lastMessageDate
                ? `Last chat ${getRelativeTime(lastMessageDate)}`
                : ''}
            </Typography>
          }
        />
      </ChatWrapper>
    </>
  );
};

export default ChatHeader;
