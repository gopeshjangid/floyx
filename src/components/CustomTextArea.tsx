import * as React from 'react';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/material';

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  width: 100%;
  color: #85838F;
  background: ${theme.palette.background.default};
  border: 1px solid ${theme.palette.primary[800]};
  padding: 16px;
  &:hover {
    border-color: ${theme.palette.primary.main};
  }

  &:focus {
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === 'dark'
        ? theme.palette.primary.light
        : theme.palette.primary.dark
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

export default TextareaAutosize;
