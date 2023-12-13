'use client';
import { useState } from 'react';
import { Box, Container, Divider, Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import UserCard, { UserCardBox } from '../UserCard';

const FriendActivitySection = styled(Box)(() => ({
  marginLeft: '10px',
  marginTop: '20px',
  alignItems: 'center',
  padding: '0px',
}));

const FriendActivityMainSection = styled(Container)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.boxBorder}`,
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
    userName: 'John',
    activity: 'Michele added 4 Arcticles in the last 24 hour',
  },
  {
    name: 'John Wick',
    userName: 'saddam_beta',
    activity: 'John added 4 Arcticles in the last 48 hour',
  },
  {
    name: 'John Wick',
    userName: 'saddam_beta',
    activity: 'John added 4 Arcticles in the last 48 hour',
  },
  {
    name: 'John Wick',
    userName: 'saddam_beta',
    activity: 'John added 4 Arcticles in the last 48 hour',
  },
];

interface ActivityProps {
  name: string;
  userName: string;
  activity: string;
}

const showEmptySkelton = ['', '', '', ''];

export default function FriendsActivity() {
  const [friendActivity, setFriendActivity] = useState<ActivityProps[] | null>(
    null
  );

  const myPromise = new Promise(resolve => {
    setTimeout(resolve, 1000);
  });

  myPromise.then(() => setFriendActivity(ACTIVITY_CARD));

  return (
    <FriendActivitySection>
      <Typography variant="body1">Newly Registered Users</Typography>
      <FriendActivityMainSection>
        {friendActivity ? (
          friendActivity.map((card, index) => (
            <Container className="card" key={`friendActivity${index}`}>
              <Box>
                <UserCard name={card.name} username={card.userName} />
              </Box>
              {!(index === friendActivity.length - 1) && <Divider />}
            </Container>
          ))
        ) : (
          <>
            {showEmptySkelton.map((val, index) => (
              <Box key={`emptyRecent${index}`}>
                <Container className="card">
                  <UserCardBox>
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
                  </UserCardBox>
                </Container>
                {showEmptySkelton?.length !== index + 1 && <Divider />}
              </Box>
            ))}
          </>
        )}
      </FriendActivityMainSection>
    </FriendActivitySection>
  );
}
