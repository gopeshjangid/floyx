'use client';

import { Stack } from '@mui/material';
import CustomChip from '../CustomGridientChip';
import Link from 'next/link';

export default function ArticleTags({ tags }) {
  return (
    <Stack gap={1} direction={'row'} mb={2}>
      {tags.map((val: any, index: number) => (
        <CustomChip
          key={'tags' + index}
          label={`#${val.tagName}`}
          component={Link}
          href={`/articles/#${val.tagName}`}
          // href={`/articles/?id=${val.tagId}&name=${val.tagName}`}
          clickable
        />
      ))}
    </Stack>
  );
}
