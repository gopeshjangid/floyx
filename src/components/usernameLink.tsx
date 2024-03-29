'use client';
import Link from 'next/link';
import { Typography, TypographyProps, styled } from '@mui/material';
import React from 'react';

interface UsernameLinkProps {
  username: string;
}
export const GradientText = styled('span')(({ ...props }) => ({
  background: 'linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 500,
  color: 'white', // This ensures the text has color if the gradient is not supported
  ...props,
}));

const UsernameLink: React.FC<UsernameLinkProps & TypographyProps> = ({
  username,
  ...props
}) => {
  return (
    <Typography
      component="span"
      variant="subtitle1"
      color="primary"
      sx={{ cursor: 'pointer', textDecoration: 'none' }}
      {...props}
    >
      <Link href={`/profile/${username}`} passHref>
        <GradientText> @{username}</GradientText>
      </Link>
    </Typography>
  );
};

export default UsernameLink;

export const ProfileName = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.fontLightColor,
  fontWeight: 500,
}));
