import UserAvatar from '@/components/UserAvatar';
import { allRoutes } from '@/constants/allRoutes';
import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Theme,
  Typography,
  styled,
} from '@mui/material';
import Link from 'next/link';
import React, { FC } from 'react';

const ListItemItem = styled(ListItem)(({ theme }: { theme: Theme }) => ({
  padding: '0',
  '& a': {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px 23px',
    width: '100%',
  },
  '& .MuiListItemText-root': {
    margin: '0',
  },
  [theme.breakpoints.up('md')]: {
    '& a': {
      gap: '18px',
    },
  },
}));

const ChatCard: FC = ({
  img,
  username,
  userId,
  date,
  description,
}: ChatItemType) => {
  return (
    <ListItemItem
    // sx={{
    //   background: active ? '#131B3C' : '',
    // }}
    >
      <Link href={allRoutes.messages}>
        <ListItemAvatar>
          <UserAvatar
            src={img}
            alt="Travis Howard"
            sx={{
              width: { md: '59px', xs: '50px' },
              height: { md: '59px', xs: '50px' },
            }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              <Box>
                <Typography
                  color="#fff"
                  fontFamily="Poppins"
                  fontSize="16px"
                  fontWeight={500}
                  component="span"
                >
                  {username}
                </Typography>
                <Typography
                  fontFamily="Poppins"
                  fontSize="14px"
                  fontWeight={400}
                  component="span"
                  className="gradient-text"
                >
                  @{userId}
                </Typography>
              </Box>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="#85838F"
                fontFamily="Poppins"
                fontSize={{ md: '16px', xs: '14px' }}
                fontWeight={500}
              >
                {date}
              </Typography>{' '}
            </Box>
          }
          secondary={
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="#85838F"
              fontFamily="Poppins"
              fontSize={{ md: '16px', xs: '14px' }}
              fontWeight={500}
            >
              {description}
            </Typography>
          }
        />
      </Link>
    </ListItemItem>
  );
};

export default ChatCard;
