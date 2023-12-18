"use client"
import { Box, Button, Divider, Typography } from '@mui/material';
import UserAvatar from '../UserAvatar';
import { useGetFollowMoreAccountQuery } from "@/lib/redux/slices/articleDetails";

export default function WhoToFollow() {
  const {data: whoToFollow } = useGetFollowMoreAccountQuery()

  return (
    <Box sx={{ marginTop: '40px' }}>
      <Typography>Who to follow</Typography>
      <Box sx={{ marginTop: '30px', padding: '0 10px 10px 0' }}>
        {/* {JSON.stringify(whoToFollow)} */}
        {whoToFollow !== undefined && whoToFollow?.result && whoToFollow?.result?.length > 0 && whoToFollow?.result.map((val, index) => (
          <div key={`whoToFollow${index}`}>
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
          </div>
        ))}
      </Box>
    </Box>
  );
}
