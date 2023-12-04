/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import * as React from 'react';
import {
  Box,
  Card,
  Typography,
  IconButton,
  styled,
  Stack,
  useMediaQuery,
  Paper,
  useTheme,
  Chip,
  Skeleton,
  Avatar,
} from '@mui/material';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DailTaskSTatusIcon from '@/iconComponents/dailyTaskStatusIcon';
import {
  useGetCurrentProfileDetailsQuery,
  useGetProfileDetailsQuery,
} from '@/lib/redux/slices/profile';
import { useGetCurrentUserQuery } from '@/lib/redux/slices/user';
import { useParams } from 'next/navigation';
import Image from 'next/image';

// Styled components
const ProfileCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary[700],
  borderRadius: '10px',
  border: !isMobile ? '1px solid ' + palette.action['border'] : '',
}));

const GradientTextChip = styled(Chip)(({ theme }) => ({
  // Apply a gradient background
  background: 'linear-gradient(90deg, #AB59FF 0%, #858FFF 50%, #4D9AFF 100%)',
  // Set the text color to transparent for the gradient to be visible
  color: 'transparent',
  // Use the background as the text fill
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text', // For webkit browsers like Chrome and Safari
  WebkitTextFillColor: 'transparent', // For webkit browsers
  // Add more styling if needed to match the uploaded image
  // Adjust other styles as needed (border-radius, padding, etc.)
}));

const Item = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1.5),
  '&:last-child': {
    marginBottom: 0,
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(16),
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.5),
}));

const SectionContent = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  color: theme.palette.text.primary,
}));

// Example usage of the styled components
const ProfileSection: React.FC = () => {
  const params = useParams();
  console.log('params', params);
  const {
    data: profile,
    isLoading,
    error,
  } = useGetProfileDetailsQuery({ username: 'saddam_beta' });
  const {
    data: currentProfile,
    isLoading: currnetProfileLoading,
    error: currentProfileError,
  } = useGetCurrentProfileDetailsQuery();
  const [_value, setValue] = React.useState(0);
  const { palette } = useTheme();
  const isMobile = useMediaQuery('(max-width:480px)');
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box mt={4}>
      <Paper
        sx={{
          borderRadius: '10px',
          border: '1px solid ' + palette.action['border'],
        }}
      >
        <Box
          sx={{
            height: '200px',
            borderRadius: '10px',
            width: '100%',
            border: '1px solid grey',
          }}
        >
          {isLoading && !profile ? (
            <Skeleton
              variant="rectangular"
              sx={{ width: '100%', height: '200px' }}
            />
          ) : (
            <>
              {' '}
              {/* <Image
                alt="profile image"
                width={300}
                height={200}
                src={profile?.backgroundImage}
              /> */}
              <Avatar src={profile?.avatar} />
            </>
          )}
        </Box>
        <Box mt={2} p={2} textAlign="center">
          <Stack direction="row" spacing={{ xs: 1, sm: 1, md: 1 }}>
            <Typography variant="body2" color="textPrimary">
              {isLoading ? <Skeleton variant="text" /> : profile?.name}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              @{isLoading ? <Skeleton variant="text" /> : profile?.username}
            </Typography>
          </Stack>
          <Box my={2}>
            <Typography
              textAlign="justify"
              variant="subtitle2"
              color="textPrimary"
            >
              {isLoading ? (
                <Skeleton variant="rectangular" height="60px" />
              ) : (
                profile?.shortDescription
              )}
            </Typography>
          </Box>
          <Stack direction="row" spacing={{ xs: 1, sm: 3, md: 4 }}>
            <Typography variant="subtitle2" color="textPrimary">
              Canada
            </Typography>
            <Typography variant="subtitle2" color="primary">
              www.tourist.com
            </Typography>
            <Typography variant="subtitle2" color="primary">
              Joined Sept 1990
            </Typography>
          </Stack>
          <Box my={2}>
            <Typography textAlign="left" variant="body1">
              Skills
            </Typography>
            <Stack
              flexWrap="wrap"
              my={2}
              display="flex"
              direction="row"
              justifyContent="flex-start"
              rowGap={2}
              spacing={{ xs: 1, sm: 3, md: 4 }}
            >
              <GradientTextChip
                label="Blockchain"
                href="#basic-chip"
                clickable
                sx={{ backgroundColor: palette.primary[700] }}
              />
              <Chip
                label="Blockchain"
                component="a"
                href="#basic-chip"
                clickable
              />
              <Chip
                label="Blockchain"
                component="a"
                href="#basic-chip"
                clickable
              />
              <Chip
                label="Blockchain"
                component="a"
                href="#basic-chip"
                clickable
              />
              <Chip
                label="Blockchain"
                component="a"
                href="#basic-chip"
                clickable
              />{' '}
              <Chip
                label="Blockchain"
                component="a"
                href="#basic-chip"
                clickable
              />
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileSection;
