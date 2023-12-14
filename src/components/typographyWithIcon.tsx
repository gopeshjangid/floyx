import React from 'react';
import Typography from '@mui/material/Typography';
import { TypographyProps } from '@mui/material/Typography';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

interface CustomTypographyProps extends TypographyProps {
  icon?: React.ReactElement;
  iconPosition?: 'start' | 'end';
  sxIcon?: SxProps<Theme>; // Style props for the icon
}

const CustomTypographyWithIcon: React.FC<CustomTypographyProps> = ({
  icon,
  iconPosition = 'start',
  children,
  sxIcon,
  ...typographyProps
}) => {
  return (
    <Typography
      sx={{ display: 'flex', alignItems: 'center' }}
      {...typographyProps}
    >
      {icon && iconPosition === 'start' && <span>{icon}</span>}
      {children}
      {/* {icon && iconPosition === 'end' && (
        <span style={{ marginLeft: '8px', ...sxIcon }}>{icon}</span>
      )} */}
    </Typography>
  );
};

export default CustomTypographyWithIcon;
