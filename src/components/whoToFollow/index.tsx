import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import UserAvatar from '../UserAvatar';

const whoToFollowData = [
  {
    name: 'hugo4',
    username: 'hugo4',
    avatar:
      'https://s3.us-east-2.amazonaws.com/floyx-beta/profile/avatar.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231118/us-east-2/s3/aws4_request&X-Amz-Date=20231118T064925Z&X-Amz-SignedHeaders=host&X-Amz-Signature=2b189d8c97dbf56a280e929f87f9c61803427cbbfbc21a56213ff753730cb777',
    shortDescription: 'Example description of user hugo4',
    backgroundImage:
      'https://s3.us-east-2.amazonaws.com/floyx-beta/profile/background-default.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231118/us-east-2/s3/aws4_request&X-Amz-Date=20231118T064925Z&X-Amz-SignedHeaders=host&X-Amz-Signature=f757eae51401c7de84c367378d3e2b92eb7c6e0cea1de332f7ac01dfafcbf1e9',
    numberOfFollowers: 3,
    numberOfFollowing: 2,
    numberOfArticles: 0,
    numberOfPosts: 0,
    numberOfEvents: 0,
    experienced: false,
    followed: false,
    official: false,
    accountType: 0,
    id: '632338dda2bd0c0001609f1b',
    numberOfMilestones: 0,
    allowPrivateMassages: true,
  },
  {
    name: 'candle',
    username: 'candle',
    avatar:
      'https://s3.us-east-2.amazonaws.com/floyx-beta/profile/avatar.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231118/us-east-2/s3/aws4_request&X-Amz-Date=20231118T064925Z&X-Amz-SignedHeaders=host&X-Amz-Signature=2b189d8c97dbf56a280e929f87f9c61803427cbbfbc21a56213ff753730cb777',
    shortDescription: 'Example description of user candle',
    backgroundImage:
      'https://s3.us-east-2.amazonaws.com/floyx-beta/profile/background-default.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231118/us-east-2/s3/aws4_request&X-Amz-Date=20231118T064925Z&X-Amz-SignedHeaders=host&X-Amz-Signature=f757eae51401c7de84c367378d3e2b92eb7c6e0cea1de332f7ac01dfafcbf1e9',
    numberOfFollowers: 1,
    numberOfFollowing: 0,
    numberOfArticles: 0,
    numberOfPosts: 2,
    numberOfEvents: 0,
    experienced: false,
    followed: false,
    official: false,
    accountType: 0,
    id: '652850ca7a0e45335647fcab',
    numberOfMilestones: 0,
    allowPrivateMassages: true,
  },
  {
    name: 'Crypto',
    username: 'vizard',
    avatar:
      'https://s3.us-east-2.amazonaws.com/floyx-beta/profile/avatar.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231118/us-east-2/s3/aws4_request&X-Amz-Date=20231118T064925Z&X-Amz-SignedHeaders=host&X-Amz-Signature=2b189d8c97dbf56a280e929f87f9c61803427cbbfbc21a56213ff753730cb777',
    shortDescription: 'Example description of user vizard',
    backgroundImage:
      'https://s3.us-east-2.amazonaws.com/floyx-beta/profile/background-default.png?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZOGNDJSQSFOTYWIR/20231118/us-east-2/s3/aws4_request&X-Amz-Date=20231118T064925Z&X-Amz-SignedHeaders=host&X-Amz-Signature=f757eae51401c7de84c367378d3e2b92eb7c6e0cea1de332f7ac01dfafcbf1e9',
    numberOfFollowers: 3,
    numberOfFollowing: 11,
    numberOfArticles: 0,
    numberOfPosts: 3,
    numberOfEvents: 0,
    experienced: false,
    followed: false,
    official: false,
    accountType: 0,
    id: '61046e5c246b280001b8b7f4',
    numberOfMilestones: 0,
    allowPrivateMassages: true,
  },
];
export default async function WhoToFollow() {

    await new Promise (res=>setTimeout(res, 10000))

  return (
    <Box sx={{ marginTop: '40px' }}>
      <Typography>Who to follow</Typography>
      <Box sx={{ marginTop: '30px', padding: '0 10px 10px 0' }}>
        {whoToFollowData.map((val, index) => (
          <>
            <Box sx={{ display: 'flex', marginTop: '10px' }}>
              <Box>
                <UserAvatar
                  alt={val?.name}
                  src={val?.avatar}
                  sx={{
                    width: { md: '40px', xs: '40px' },
                    height: { md: '40px', xs: '40px' },
                  }}
                />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h5">{val?.name}</Typography>
                    <Typography variant="body2">@{val?.username}</Typography>
                  </Box>
                  <Box>
                    <Button variant="outlined" size="small">
                      Follow
                    </Button>
                  </Box>
                </Box>
                <Box>
                  <Typography>{val?.shortDescription}</Typography>
                </Box>
              </Box>
            </Box>
            <Divider />
          </>
        ))}
      </Box>
    </Box>
  );
}
