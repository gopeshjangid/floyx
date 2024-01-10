import React from 'react';
import Typography from '@mui/material/Typography';
import { TypographyProps } from '@mui/material/Typography';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Stack } from '@mui/material';

interface CustomTypographyProps extends TypographyProps {
  icon?: React.ReactElement;
  iconPosition?: 'start' | 'end';
  sxIcon?: SxProps<Theme>; // Style props for the icon
}

const CustomTypographyWithIcon: React.FC<CustomTypographyProps> = ({
  icon,
  iconPosition = 'start',
  children,
  ...typographyProps
}) => {
  return (
    <Stack direction="row" alignItems="flex-start">
      {icon}
      <Typography {...typographyProps}>{children}</Typography>
    </Stack>
  );
};

export default CustomTypographyWithIcon;
