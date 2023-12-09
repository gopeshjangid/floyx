/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Image from 'next/image';
import {
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import UserAvatar from '../UserAvatar';
import { iconFloyx, iconLinkMessage } from '@/assets/images';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';
import { getRelativeTime } from '@/lib/utils';
import { INotification } from '@/app/(secured)/notifications/types';
import { PARENTHESES_AND_BRACKETS_REGEX, PROFILE_REGEX } from '@/constants';
import { notificationService } from '@/lib/services/new/notificationService';

const ListItemItem = styled(ListItem)<{ active: number }>(
  ({ theme, active }) => ({
    alignItems: 'center',
    gap: '10px',
    padding: '9px 21px',
    backgroundColor: active
      ? theme.palette?.mode === 'light'
        ? '#eef5ff'
        : '#110d29'
      : 'transparent',
    // '&:not(:last-child)': { marginBottom: '20px' },
    '& .MuiListItemText-root': {
      margin: '0',
      cursor: 'pointer',
    },
    '& .MuiListItemAvatar-root': {
      position: 'relative',
      '& span': {
        position: 'absolute',
        right: '0',
        bottom: '-3px',
        borderRadius: '100%',
        width: '25px',
        height: '25px',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    [theme.breakpoints.up('md')]: {
      gap: '18px',
      padding: '13px 31px 13px 0px',

      // '&:not(:last-child)': { marginBottom: '28px' },
      '& .MuiListItemAvatar-root': {
        '& span': {
          right: '-7px',
          bottom: '0',
          width: '27px',
          height: '27px',
        },
      },
    },
  })
);

const NotificationCard = ({
  publisher,
  date,
  id,
  image,
  text,
  type,
  state,
  objectId,
  origin,
}: INotification) => {
  const { palette } = useTheme();
  const router = useRouter();
  const [markAsReadLoading, setMarkAsReadLoading] = useState(false);

  const addLinksAndFormat = (content: string) => {
    if (!content) {
      return '';
    }
    const link = '<a href="/profile/$2">$1</a>';
    const text = formatText(content);
    return text.replace(PROFILE_REGEX, link);
  };

  const formatText = (text: string) => {
    const formattedText: string = text.replace(
      PARENTHESES_AND_BRACKETS_REGEX,
      ''
    );
    return formattedText;
  };

  const getShortText = (text: string) => {
    const endingIndex: number = text.indexOf('is liked by');
    if (endingIndex > 60) {
      let firstPart: string = text.substring(0, endingIndex);
      firstPart = firstPart.substring(0, 57) + '..."';
      const secondPart: string = text.substring(endingIndex);
      return firstPart + ' ' + secondPart;
    } else {
      return text;
    }
  };

  const markAsRead = async (
    id: any,
    objectId: string,
    username: string,
    origin: number
  ) => {
    setMarkAsReadLoading(true);
    const response = await notificationService.markAsRead(id);
    setMarkAsReadLoading(false);

    if (objectId) {
      let url = '';
      switch (origin) {
        case 0:
          url = '/post/' + objectId;
          break;
        case 1:
          url = '/article/' + objectId;
          break;
        case 2:
          url = '/event/' + objectId;
          break;
        case 3:
          url = '/profile/' + username;
          break;
        default:
          url = '/profile/' + username;
          break;
      }
      if (url && response.value.code === 'success') {
        router.push(url);
      }
    }
  };

  return (
    <ListItemItem active={state ? 1 : 0}>
      <ListItemAvatar>
        <Link href={`/profile/${publisher.username}/posts'`}>
          <UserAvatar
            src={
              type === 6
                ? iconFloyx
                : `${ApiEndpoint.ProfileDetails}/avatar/${publisher.username}`
            }
            alt={publisher?.name}
            sx={{
              width: { md: '59px', xs: '50px' },
              height: { md: '59px', xs: '50px' },
            }}
          />
          {/* TODO: as types and how to define it */}
          <span>
            <Image src={iconLinkMessage} alt="icon" />
          </span>
        </Link>
      </ListItemAvatar>
      <ListItemText
        onClick={() => markAsRead(id, objectId, publisher.username, origin)}
        primary={
          <Typography
            color={palette?.mode === 'light' ? '#2F2E41' : '#fff'}
            fontSize="16px"
            fontWeight={400}
            dangerouslySetInnerHTML={{
              __html: addLinksAndFormat(getShortText(text)),
            }}
          />
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
            {getRelativeTime(date)}
          </Typography>
        }
      />
      {markAsReadLoading && (
        <ListItemIcon>
          <CircularProgress size={20} />
        </ListItemIcon>
      )}
    </ListItemItem>
  );
};

export default NotificationCard;
