'use client';
import React from 'react';
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
  Stack,
  Divider,
} from '@mui/material';
import { UserDetailsType } from '@/lib/redux/slices/profile';
import UsernameLink, { ProfileName } from '../usernameLink';
import { SVGUser } from '@/assets/images';
import CustomTypographyWithIcon from '../typographyWithIcon';
import DailyTaskIcon from '@/iconComponents/dailyTaskIcon';
import ArticleSvgIcon from '@/iconComponents/articleSvgIcon';
import Link from 'next/link';
import CustomDescription from '../customDescription';
import { useTranslation } from 'react-i18next';

interface SearchResultProps {
  profile: UserDetailsType;
  isLoading: boolean;
}

const StyledCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.primary.mainBackground,
  marginBottom: theme.spacing(2),
}));

const StyledAvatar = styled(Avatar)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  marginRight: theme.spacing(2),
}));

const SearchResult: React.FC<SearchResultProps> = ({ profile, isLoading }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <StyledCard>
      <CardContent>
        <Box>
          <Stack direction="row" gap={1}>
            {isLoading ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : (
              <StyledAvatar alt={profile.name} src={profile.avatar} />
            )}
            {isLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Skeleton width="30%" height="30px" />
                <Skeleton width="40%" height="30px" />
              </Box>
            ) : (
              <Box mb={2}>
                <Stack alignItems="center" direction="row" gap={1}>
                  <Link href={`/profile/${profile.username}`}>
                    <ProfileName
                      sx={{
                        color: theme.palette.primary.fontLightColor,
                      }}
                      variant="h6"
                    >
                      {profile.name}
                    </ProfileName>
                  </Link>
                  <UsernameLink username={profile.username} />
                </Stack>
                {(profile.followed || profile.following) && (
                  <Stack alignItems="center" direction="row" gap={1}>
                    {profile.following && (
                      <Typography translate="no" variant="caption">
                        {' '}
                        {t('comp.recommTopic.followed')}
                      </Typography>
                    )}
                    {profile.followed && (
                      <Typography translate="no" variant="caption">
                        | &nbsp; {t('comp.recommTopic.followYou')}
                      </Typography>
                    )}
                  </Stack>
                )}
                <CustomDescription variant="subtitle2">
                  {profile.shortDescription}
                </CustomDescription>
              </Box>
            )}
          </Stack>
          <Divider />
          <Box
            mt={1}
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
                  <CustomTypographyWithIcon
                    fontWeight={'400'}
                    icon={<SVGUser fill="#A75FFF" height={'20px'} />}
                    variant="body2"
                  >
                    {' '}
                    {`Followers: ${profile.numberOfFollowers}`}
                  </CustomTypographyWithIcon>
                )}
              </Box>{' '}
              <Box sx={{ flexGrow: 1 }}>
                {isLoading ? (
                  <Skeleton width={60} />
                ) : (
                  <CustomTypographyWithIcon
                    fontWeight={'400'}
                    icon={
                      <DailyTaskIcon
                        fill="#A75FFF"
                        width={'18px'}
                        height={'18px'}
                      />
                    }
                    variant="body2"
                  >
                    {`Posts: ${profile.numberOfPosts}`}
                  </CustomTypographyWithIcon>
                )}
              </Box>{' '}
              <Box sx={{ flexGrow: 1 }}>
                {isLoading ? (
                  <Skeleton width={60} />
                ) : (
                  <CustomTypographyWithIcon
                    fontWeight={'400'}
                    icon={<ArticleSvgIcon stroke="#A75FFF" width="18px" />}
                    variant="body2"
                  >{`Articles: ${profile.numberOfArticles}`}</CustomTypographyWithIcon>
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
  results: UserDetailsType[];
  isLoading: boolean;
}

const SearchResultsComponent: React.FC<SearchResultsComponentProps> = ({
  results,
  isLoading,
}) => {
  const data = isLoading ? [{ name: '' }, { name: '' }, { name: '' }] : results;
  return (
    <Box p={0.5}>
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
