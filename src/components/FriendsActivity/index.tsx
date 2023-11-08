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
    '& .card': {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '20px 0px',
      '& .display-flex': {
        display: 'flex',
        alignItems: 'center',
      },
    },
  }));

  const ACTIVITY_CARD = [
    {
      name: 'Michele rene',
      userName: 'Mrene',
      displayPicture: '',
      postTime: 1,
      activity: 'Michele added 4 Arcticles in the last 24 hour',
    },
    {
      name: 'John Wick',
      userName: 'Jwick',
      displayPicture: '',
      postTime: 2,
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
            <Box className="card">
              <Box>
                <Avatar
                  alt={card.name}
                  src={card.displayPicture}
                  sx={{ width: 50, height: 50, marginRight: '10px' }}
                />
              </Box>
              <Box>
                <Box className="display-flex">
                  <Typography variant="h5" marginRight={1}>{card.name}</Typography>
                  <Typography variant="body2" className="card-username">
                    @{card.userName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption">
                    {card.postTime} hour ago
                  </Typography>
                </Box>
              </Box>
            </Box>
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
