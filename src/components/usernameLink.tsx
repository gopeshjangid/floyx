import Link from 'next/link';
import { Typography } from '@mui/material';
import React from 'react';

interface UsernameLinkProps {
  username: string;
}

const UsernameLink: React.FC<UsernameLinkProps> = ({ username }) => {
  return (
    <Typography
      component="span"
      variant="subtitle2"
      color="primary"
      sx={{ cursor: 'pointer', textDecoration: 'none' }}
    >
      <Link href={`/profile/${username}`} passHref>
        @{username}
      </Link>
    </Typography>
  );
};

export default UsernameLink;
