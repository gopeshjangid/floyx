'use client';
import { useState } from 'react';
import {
  Avatar,
  Box,
  Container,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { UserCardBox } from '../UserCard';
import UsernameLink from '../usernameLink';
import { useTranslation } from 'react-i18next';

const FriendActivitySection = styled(Box)(() => ({
  marginTop: '20px',
  alignItems: 'center',
  padding: '0px',
}));

const UserBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.boxBorder}`,
  background: theme.palette.primary.mainBackground,
  borderRadius: '10px',
}));
const { t } = useTranslation();
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
      <Typography translate="no" variant="body1">
        {t('comp.friendActivity.newUser')}
      </Typography>
      <Box my={2}>
        {friendActivity ? (
          <Stack gap={1}>
            {friendActivity.map((card, index) => (
              <UserBox key={`friendActivity${index}`} p={1}>
                <Stack direction={'row'} gap={1} py={1} pl={2}>
                  <Avatar />
                  <Stack justifyContent={'center'}>
                    <Typography variant="subtitle2">{card.name}</Typography>
                    <UsernameLink variant="caption" username={card.userName} />
                  </Stack>
                </Stack>
              </UserBox>
            ))}
          </Stack>
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
      </Box>
    </FriendActivitySection>
  );
}
