'use client';
import React, { useState } from 'react';
import {
  styled,
  useTheme,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Skeleton,
  Theme,
} from '@mui/material';
import useQuery from '@/lib/hooks/useFetch';
interface Profile {
  name: string;
  handle: string;
  description: string;
  followers: number;
  posts: number;
  articles: number;
  initials: string;
}

interface SearchResultProps {
  profile: Profile;
  isLoading: boolean;
}

const StyledCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.background.default
      : theme.palette.background.paper,
  marginBottom: theme.spacing(2),
}));

const StyledAvatar = styled(Avatar)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  marginRight: theme.spacing(2),
}));

const SearchResult: React.FC<SearchResultProps> = ({ profile, isLoading }) => {
  const theme = useTheme();

  return (
    <StyledCard>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        {isLoading ? (
          <Skeleton variant="circular" width={40} height={40} />
        ) : (
          <StyledAvatar>{profile.initials}</StyledAvatar>
        )}
        <Box sx={{ flexGrow: 1 }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Skeleton width="30%" />
              <Skeleton width="10%" />
            </Box>
          ) : (
            <>
              <Typography variant="subtitle1">{profile.name}</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {profile.handle}
              </Typography>
            </>
          )}
          
          {isLoading ? (
            <Skeleton width="80%" />
          ) : (
            <Typography variant="body2">{profile.description}</Typography>
          )}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 1,
              '& svg': {
                fontSize: '1.2rem',
                marginRight: theme.spacing(0.5),
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                {isLoading ? (
                  <Skeleton width={60} />
                ) : (
                  <Typography variant="body2" sx={{ marginRight: 2 }}>
                    {`Followers: ${profile.followers}`}
                  </Typography>
                )}
              </Box>{' '}
              <Box sx={{ flexGrow: 1 }}>
                {isLoading ? (
                  <Skeleton width={60} />
                ) : (
                  <Typography variant="body2" sx={{ marginRight: 2 }}>
                    {`Posts: ${profile.posts}`}
                  </Typography>
                )}
              </Box>{' '}
              <Box sx={{ flexGrow: 1 }}>
                {isLoading ? (
                  <Skeleton width={60} />
                ) : (
                  <Typography variant="body2">{`Articles: ${profile.articles}`}</Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

interface SearchResultsComponentProps {
  results: Profile[];
  isLoading: boolean;
}

const SearchResultsComponent: React.FC<SearchResultsComponentProps> = ({
  results,
  isLoading,
}) => {
  const data = isLoading ? [{ name: '' }, { name: '' }, { name: '' }] : results;
  return (
    <Box>
      {data.map((item, key) => (
        <SearchResult
          key={key + '-search'}
          profile={item}
          isLoading={isLoading}
        />
      ))}
    </Box>
  );
};


export default SearchResultsComponent;
