'use client';
import { useEffect, useState, Suspense } from 'react';
import { Box, Button, Container, Divider, Skeleton, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';
import UserCard from '../UserCard';

const FriendActivitySection = styled(Box)(({ theme }) => ({
  marginLeft: '10px',
  alignItems: 'center',
  padding: '0px',
}));

const FriendActivityMainSection = styled(Container)(({ theme }) => ({
  border: '1px solid ',
  borderRadius: '10px',
  marginTop: '25px',
  '& .card-button': {
    padding: '10px 0px ',
  },
  '& .card': {
    padding: '0px',
    marginTop: '20px',
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
  const [friendActivity, setFriendActivity] = useState<ActivityProps[] | null>(
    null
  );

  const myPromise = new Promise((resolve, reject) => {
    setTimeout(resolve, 3000);
  });

  myPromise.then(() => setFriendActivity(ACTIVITY_CARD));

  return (
    <FriendActivitySection>
      <Typography variant="body1">Your friend’s activities</Typography>
      <FriendActivityMainSection>
        {friendActivity ? (
          friendActivity.map((card, index) => (
            <Container className="card" key={`friendActivity${index}`}>
              <Box>
                <UserCard
                  name={card.name}
                  username={card.userName}
                  timestamp={card.postTime}
                  displayPicture={card.displayPicture}
                />
              </Box>
              <Box>
                <Typography variant="body1">{card.activity}</Typography>
              </Box>
              <Button className="card-button" endIcon={<ArrowForwardIosIcon />}>
                <Typography variant="body1">Check Now</Typography>
              </Button>
              {!(index === friendActivity.length - 1) && <Divider />}
            </Container>
          ))
        ) : (
          <>
            <Container className="card">
              <Box sx={{ display: 'flex' }}>
                <Box>
                  <Skeleton
                    variant="circular"
                    width={50}
                    height={50}
                    sx={{ marginRight: '10px' }}
                    animation="wave"
                  />
                </Box>
                <Box>
                  <Box>
                    <Skeleton
                      variant="text"
                      height={20}
                      width={180}
                      animation="wave"
                    />
                  </Box>
                  <Box>
                    <Skeleton
                      variant="text"
                      height={20}
                      width={80}
                      animation="wave"
                    />
                  </Box>
                </Box>
              </Box>
              <Box>
                <Skeleton
                  variant="text"
                  height={80}
                  width={'100%'}
                  animation="wave"
                />
              </Box>
            </Container>
            <Divider />
            <Container className="card">
              <Box sx={{ display: 'flex' }}>
                <Box>
                  <Skeleton
                    variant="circular"
                    width={50}
                    height={50}
                    sx={{ marginRight: '10px' }}
                    animation="wave"
                  />
                </Box>
                <Box>
                  <Box>
                    <Skeleton
                      variant="text"
                      height={20}
                      width={180}
                      animation="wave"
                    />
                  </Box>
                  <Box>
                    <Skeleton
                      variant="text"
                      height={20}
                      width={80}
                      animation="wave"
                    />
                  </Box>
                </Box>
              </Box>
              <Box>
                <Skeleton
                  variant="text"
                  height={80}
                  width={'100%'}
                  animation="wave"
                />
              </Box>
            </Container>
          </>
        )}
        {friendActivity && (
          <Button
            variant="outlined"
            sx={{
              width: '100%',
              padding: '15px 0px',
              margin: '25px 0px',
            }}
          >
            <Typography variant="body1" sx={{textTransform:'capitalize'}}>
              Check all last 24h activities
            </Typography>
          </Button>
        )}
      </FriendActivityMainSection>
    </FriendActivitySection>
  );
}
