'use client';
import {useEffect, useState} from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';
import UserCard from "../UserCard";

  const FriendActivitySection = styled(Box)(({ theme }) => ({
    marginLeft: '10px',
    alignItems: 'center',
  }));

  const FriendActivityMainSection = styled(Container)(({ theme }) => ({
    border: '1px solid ',
    borderRadius: '10px',
    marginTop: '5px',
    '& .card-button': {
      padding: '10px 0px ',
    },
  }));

  const ACTIVITY_CARD = [
    {
      name: 'Michele rene',
      userName: 'Mrene',
      displayPicture: '',
      postTime: 1698823670000,
      activity: 'Michele added 4 Arcticles in the last 24 hour',
    },
    {
      name: 'John Wick',
      userName: 'Jwick',
      displayPicture: '',
      postTime: 1696743654000,
      activity: 'John added 4 Arcticles in the last 48 hour',
    },
  ];

interface ActivityProps {
  name: string;
  userName: string;
  displayPicture: string;
  postTime: number;
  activity: string;
}
export default function FriendsActivity({}) {
  const [friendActivity, setFriendActivity] = useState<ActivityProps[] | null>(null)

  useEffect(() => {
    setFriendActivity(ACTIVITY_CARD);
  }, [])

  return (
    <FriendActivitySection>
      <Typography variant="body1">Your friend’s activities</Typography>
      <FriendActivityMainSection>
        {friendActivity && friendActivity.map(card => (
          <>
            <UserCard
              name={card.name}
              username={card.userName}
              timestamp={card.postTime}
              displayPicture={card.displayPicture}
            />
            <Box>
              <Typography variant="body1">{card.activity}</Typography>
            </Box>
            <Button className="card-button" endIcon={<ArrowForwardIosIcon />}>
              <Typography variant="body1">Check Now</Typography>
            </Button>
            <Divider />
          </>
        ))}
        <Button
          variant="outlined"
          sx={{
            border: '1px solid',
            width: '100%',
            padding: 0,
            marginBottom: '10px',
          }}
        >
          <Typography variant="body1">Check all last 24h activities</Typography>
        </Button>
      </FriendActivityMainSection>
    </FriendActivitySection>
  );
}
