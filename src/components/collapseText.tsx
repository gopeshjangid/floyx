'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Stack, TypographyProps } from '@mui/material';
import CustomDescription from './customDescription';

export default function CollapseDescription({
  text,
  allowLength = 300,
  isDangerouslySetInnerHTML,
  ...props
}: {
  allowLength?: number;
  text: string;
  isDangerouslySetInnerHTML?: boolean;
} & TypographyProps) {
  const [open, setOpen] = React.useState(false);

  const openHandler = e => {
    e.preventDefault();
    setOpen(open => !open);
  };

  const renderText = React.useMemo(
    () => (showFull: boolean, appendtext?: string) => {
      const completeText = text + appendtext;
      return isDangerouslySetInnerHTML ? (
        <CustomDescription
          dangerouslySetInnerHTML={{
            __html: showFull
              ? completeText
              : completeText.slice(0, allowLength),
          }}
          {...props}
        />
      ) : (
        <CustomDescription>
          {showFull ? completeText : completeText.slice(0, allowLength)}
        </CustomDescription>
      );
    },
    [isDangerouslySetInnerHTML, text]
  );

  return (
    <Box>
      {open || text.length <= allowLength
        ? renderText(true, '')
        : renderText(false, '...')}
      {text.length > allowLength && (
        <Box textAlign={'right'}>
          <Button type="button" variant="text" onClick={openHandler}>
            {open ? 'Show less' : 'Show more'}
          </Button>
        </Box>
      )}
    </Box>
  );
}
