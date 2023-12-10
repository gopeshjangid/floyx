import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const LoadingButton = styled(Button)<ButtonProps & { loading: boolean }>(
  ({ theme, loading }) => ({
    position: 'relative',
    '& .loadingIndicator': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    ...(loading && {
      color: theme.palette.warning.main, // Hide the button text when loading
    }),
  })
);

const CustomLoadingButton = ({ isLoading, onClick, text, ...props }) => {
  return (
    <>
      {!isLoading ? (
        <LoadingButton
          variant="contained"
          color="primary"
          disabled={isLoading}
          onClick={onClick}
          loading={isLoading ? true : false}
          {...props}
        >
          {text}
        </LoadingButton>
      ) : (
        <Box width="auto">
          <CircularProgress size={34} className="loadingIndicator" />
        </Box>
      )}
    </>
  );
};

export default CustomLoadingButton;
