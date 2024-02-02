'use client';
import LinkIcon from '@/assets/images/icons/link.svg';
import ProfileTickIcon from '@/images/image/profileTick';
import { Box, Typography, Stack, Divider, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import UsernameLink, { ProfileName } from '../usernameLink';
import UserAvatar from '../UserAvatar';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';
import {
  useGetProfileAboutQuery,
  useGetProfileDetailsQuery,
} from '@/lib/redux/slices/profile';
import { RoundPrimaryButton } from '../CustomButtons';
import { useRouter } from 'next/navigation';
import FollowUser from '../FollowUser';
import AuthorArticles from './authorArticles';
import CustomDescription from '../customDescription';
import { LocationOn } from '@mui/icons-material';
import Image from 'next/image';
import ArticleProfileIcon from '@/assets/images/svg/articleIcon';
import { useSession } from 'next-auth/react';
// import { useGetArticleDetailsQuery } from "@/lib/redux";

export const AuthorDetailBox = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '35px',
  border: '1px solid ' + theme.palette.primary.boxBorder,
  background: theme.palette.primary.mainBackground,
  padding: '20px 30px',
  borderRadius: '10px',
  '& .header': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .position-center': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  '& .author-box': {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    '& .name': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  '& .author-about': {
    marginTop: '20px',
  },
  '& .more-about-auhtor': {
    marginTop: '35px',
    marginBottom: '45px',
  },
}));

export default function AuthorCoulmn({ details }: any) {
  const router = useRouter();
  const session = useSession();

  // const {data: articleDAtaaaa} = useGetArticleDetailsQuery({userName: 'saddam_beta', articlePuclicUrl: 'lorem-ipsum-2-9d7c9e27be'})
  const { data: profile } = useGetProfileDetailsQuery(
    { username: details?.user?.username },
    { skip: !details?.user?.username }
  );
  const { data: aboutProfile } = useGetProfileAboutQuery(
    {
      username: details?.user?.username ?? '',
    },
    { skip: !details?.user?.username }
  );

  const handleUrl = url => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.open(`http://${url}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <AuthorDetailBox>
      <Box className="header" py={1}>
        <Box minWidth={'40%'}>
          <Typography variant="body1">About Author</Typography>
        </Box>
        {session?.data?.user?.username !== details?.user?.username && (
          <Box className="position-center">
            {details?.user?.allowPrivateMassages && (
              <Box>
                <RoundPrimaryButton
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: '30px', padding: '4px 14px' }}
                  onClick={() => router.push('/inbox')}
                >
                  Message
                </RoundPrimaryButton>
              </Box>
            )}
            <Divider variant="middle" />
            <Box>
              <FollowUser
                isFollowed={profile?.followed}
                username={details?.user?.username}
              />
            </Box>
            <Divider />
          </Box>
        )}
      </Box>
      <Box className="author-box">
        <Box sx={{ marginRight: 2 }}>
          <UserAvatar
            alt={details?.user?.name}
            src={`${ApiEndpoint.CurrentUserDetails}/avatar/${details?.user?.username}`}
            sx={{ width: '50px', height: '50px' }}
          />
        </Box>
        <Stack alignItems="flex-start">
          <Stack direction={'row'} gap={1}>
            <ProfileName variant="subtitle1">{details?.user?.name}</ProfileName>
            <UsernameLink username={details?.user?.username} />
          </Stack>
          <Stack justifyContent={'flex-start'} direction="row" gap={2}>
            <Stack direction="row">
              <ProfileTickIcon height={20} stroke={'rgb(124, 147, 174)'} />
              <Typography variant="body2" sx={{ margin: '0px 5px' }}>
                Followers:
              </Typography>
              <Typography variant="body2">
                {profile?.numberOfFollowers}
              </Typography>
            </Stack>
            <Stack direction="row">
              <ArticleProfileIcon active={true} width="20px" height="20px" />
              <Typography variant="body2" sx={{ margin: '0px 5px' }}>
                Articles:
              </Typography>
              <Typography variant="body2">
                {profile?.numberOfArticles}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Box className="author-about">
        <CustomDescription
          textAlign="justify"
          variant="subtitle2"
          sx={{
            opacity: 0.9,
          }}
        >
          {profile?.shortDescription}
        </CustomDescription>
        {/* {JSON.stringify(aboutProfile?.about)} */}
        <Box sx={{ display: 'flex' }} py={0.5}>
          <Box display={'flex'} gap={1} sx={{ marginRight: '25px' }}>
            <LocationOn />
            <Typography variant="subtitle2" sx={{ marginY: 'auto' }}>
              {aboutProfile?.about?.location}
            </Typography>
          </Box>
          {aboutProfile?.about?.website && (
            <Box display="flex" gap={1}>
              <Button
                variant="text"
                size="small"
                startIcon={<Image src={LinkIcon} alt="website link icon" />}
                onClick={() => handleUrl(aboutProfile?.about?.website)}
                sx={{ fontSize: '.825rem', textTransform: 'none', padding: 0 }}
              >
                {aboutProfile?.about?.website}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <Box className="more-about-auhtor">
        <AuthorArticles username={details?.user?.username} />
      </Box>
    </AuthorDetailBox>
  );
}
