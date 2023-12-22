'use client';
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import UserAvatar from '../UserAvatar';
import { useGetFollowMoreAccountQuery } from '@/lib/redux/slices/articleDetails';
import UsernameLink from '../usernameLink';
import { RoundPrimaryButton } from '../CustomButtons';

export default function WhoToFollow() {
  const { palette } = useTheme();
  const { data: whoToFollow } = useGetFollowMoreAccountQuery();

  return (
    <Box mt={4}>
      <Typography
        sx={{ marginLeft: '12px', color: palette.primary.fontLightColor }}
      >
        Who to follow
      </Typography>
      {whoToFollow !== undefined &&
        whoToFollow?.result &&
        whoToFollow?.result?.length > 0 &&
        whoToFollow?.result.map((val, index) => (
          <Box p={1} key={`whoToFollow${index}`}>
            <Stack pb={1} direction="row" gap={1}>
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
                <Stack direction="row" gap={1}>
                  <Box width="60%">
                    <Typography
                      sx={{ color: palette.primary.fontLightColor }}
                      variant="subtitle2"
                    >
                      {val?.name}
                      <br />
                      <UsernameLink username={val.username} />
                    </Typography>
                  </Box>
                  <Box>
                    <RoundPrimaryButton size="small">Follow</RoundPrimaryButton>
                  </Box>
                </Stack>
                <Box>
                  <Typography color="textPrimary" variant="caption">
                    {val?.shortDescription?.slice(0, 30)}...
                  </Typography>
                </Box>
              </Box>
            </Stack>
            <Divider />
          </Box>
        ))}
    </Box>
  );
}
