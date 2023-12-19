'use client';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PostBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.boxBorder}`,
  borderRadius: '10px',
  marginTop: '2rem',
  backgroundColor: theme.palette.primary[700],
  '& .danger-text': {
    color: theme.palette.error.main,
  },
  '& .warning-text': {
    color: theme.palette.error.main,
  },
  '& .upload-media': {
    width: '100%',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    padding: '1rem 2rem',
    '& .file-imput': {
      display: 'none',
    },
    '& .image-upload': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItem: 'center',
      marginRight: '1rem',
      '& h6': {
        marginLeft: '8px',
      },
    },
  },
  '& .input-container': {
    padding: '2.5rem 2rem',

    '& .styled-input-container': {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& .mention-input': {
        display: 'flex',
        width: '90%',
        flexDirection: 'column',
        '& textarea': {
          padding: '0.5rem',
          color: theme.palette.text.primary,
          borderRadius: '10px',
          border: `1px solid ${theme.palette?.primary?.[800]}`,
        },
        '& .mention-input-container': {
          width: '100%',
          padding: '0.5rem',
          backgroundColor: theme.palette.background.default,
          borderRadius: '10px',
          "& ::placeholder": {
            color: theme.palette.text.primary,
          },
          '& .mention-input-container__suggestions': {
            backgroundColor: `${theme.palette.background.default} !important`,
          }
        },
      },
    },
    '& img': {
      width: '100%',
    },
  },
}));
