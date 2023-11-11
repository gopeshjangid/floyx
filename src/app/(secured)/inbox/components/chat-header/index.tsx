import {
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Theme,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import React from 'react';
// import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import Image from 'next/image';

import { allRoutes } from '@/constants/allRoutes';
import UserAvatar from '@/components/UserAvatar';
import { iconTrash, imgUser } from '@/assets/images';

const ChatWrapper = styled(ListItem)(({ theme }: { theme: Theme }) => ({
  alignItems: 'center',
  gap: '10px',
  padding: '12px 14px',
  borderBottom: `1px solid ${
    theme.palette?.mode === 'light' ? '#E7F0FC' : 'rgba(255, 255, 255, 0.15)'
  }`,
  '& .MuiListItemText-root': {
    margin: '0',
  },
  [theme.breakpoints.up('md')]: {
    padding: '12px 26px',
    gap: '18px',
  },
}));

const ChatHeader = () => {
  const { palette } = useTheme();

  return (
    <ChatWrapper>
      <Link href={allRoutes.messages}>
        <ListItemAvatar>
          <UserAvatar
            alt="Travis Howard"
            src={imgUser}
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
            <Link href={allRoutes.messages}>
              <Typography
                color={palette?.mode === 'light' ? '#2F2E41' : '#fff'}
                fontSize="16px"
                fontWeight={500}
                component="span"
              >
                Michele
              </Typography>
              <Typography
                fontSize="14px"
                fontWeight={400}
                component="span"
                className="gradient-text"
              >
                @mich23
              </Typography>
            </Link>

            <Button
              size="small"
              sx={{
                color: '#FA6B7C',
                fontWeight: 500,
                alignItems: 'flex-start',
              }}
              startIcon={<Image src={iconTrash} alt="trash" />}
            >
              Delete
            </Button>
          </Box>
        }
        secondary={
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color={palette?.mode === 'light' ? '#85838F' : '#777D88'}
            fontSize="14px"
            fontWeight={500}
          >
            Last seen 1 hour ago
          </Typography>
        }
      />
    </ChatWrapper>
  );
};

export default ChatHeader;
