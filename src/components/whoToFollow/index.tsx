import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import UserAvatar from '../UserAvatar';

const whoToFollowData = [
  {
    name: 'hugo4',
    username: 'hugo4',
    avatar:
      'https://floyx-beta.s3.amazonaws.com/article/bfa36c00179b4a3495f6186253c17438.png',
    shortDescription: 'Example description of user hugo4',
    backgroundImage:
      'https://floyx-beta.s3.amazonaws.com/article/bfa36c00179b4a3495f6186253c17438.png',
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
      'https://floyx-beta.s3.amazonaws.com/article/bfa36c00179b4a3495f6186253c17438.png',
    shortDescription: 'Example description of user candle',
    backgroundImage:
      'https://floyx-beta.s3.amazonaws.com/article/bfa36c00179b4a3495f6186253c17438.png',
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
      'https://floyx-beta.s3.amazonaws.com/article/bfa36c00179b4a3495f6186253c17438.png',
    shortDescription: 'Example description of user vizard',
    backgroundImage:
      'https://floyx-beta.s3.amazonaws.com/article/bfa36c00179b4a3495f6186253c17438.png',
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
