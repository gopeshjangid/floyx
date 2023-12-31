import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button, { ButtonProps } from '@mui/material/Button';
import { Tooltip, useTheme } from '@mui/material';
import { RoundPrimaryButton } from './CustomButtons';

export default function ButtonWithLoading({
  isLoading,
  children,
  isSuccess,
  isError,
  buttonType = 'DEFAULT',
  ...props
}: ButtonProps & {
  isLoading: boolean;
  isSuccess?: boolean;
  isError: boolean;
  buttonType?: 'ROUND' | 'DEFAULT';
}) {
  const { palette } = useTheme();

  const getButtonType = () => {
    if (buttonType === 'DEFAULT') {
      return (
        <Button variant="outlined" disabled={isLoading} {...props}>
          {children}
        </Button>
      );
    }
    return (
      <RoundPrimaryButton disabled={isLoading} {...props}>
        {children}
      </RoundPrimaryButton>
    );
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Tooltip
        color={isError ? 'error' : 'info'}
        title={isError ? 'Error occured! try again' : 'Action'}
      >
        {getButtonType()}
      </Tooltip>
      {isLoading && (
        <CircularProgress
          size={30}
          thickness={8}
          sx={{
            color: palette.secondary.main,
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Box>
  );
}
