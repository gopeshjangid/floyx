'use client';
import * as React from 'react';
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Stack,
  useMediaQuery,
  Avatar,
  Divider,
} from '@mui/material';
import { BorderColorOutlined } from '@mui/icons-material';
import ExperienceIcon from '@/assets/images/icons/experienceIcon.svg';
import EducationIcon from '@/assets/images/icons/educationIcon.svg';
import InvestmentIcon from '@/assets/images/icons/investmentIcon.svg';
import Image from 'next/image';
export type CommonFields = {
  id: string;
  fromMonth: string;
  fromYear: string;
  toMonth: string;
  toYear: string;
  period: string;
  description: string;
};

export type Education = {
  school: string;
  field: string;
  type: string;
  stillStudying?: boolean; // Optional because it's not present in other datasets
};

export type WorkExperience = {
  company: string;
  position: string;
  stillWorking?: boolean; // Optional because it's not present in other datasets
};

export type Project = {
  id: string;
  name: string;
  year: string;
  phase?: string; // Optional
  quantity?: string; // Optional
  tags?: string[]; // Optional
  description?: string; // Optional, included if it's common in all datasets
};

export type ProfileActivityInfoProps = Education &
  WorkExperience &
  Project &
  CommonFields;

const BackgroundAvatar = props => (
  <Box
    sx={{
      borderRadius: '50%',
      width: '50px', // Set width of the Box
      height: '50px', // Set height of the Box
      display: 'flex',
      justifyContent: 'center', // Center the icon horizontally
      alignItems: 'center',
      opacity: 0.2,
    }}
    bgcolor="background.default"
  >
    {props.children}
  </Box>
);

const ProfileActivityInfo: React.FC<
  ProfileActivityInfoProps & {
    onEdit: (data: ProfileActivityInfoProps) => void;
    type?: string;
  }
> = props => {
  const { onEdit, ...data } = props;
  const isMobile = useMediaQuery('(max-width:480px)');

  const getIcon = () => {
    let icon = null;
    switch (props.type) {
      case 'Experience':
        icon = ExperienceIcon;
        break;
      case 'Education':
        icon = EducationIcon;
        break;
      case 'Investment':
        icon = InvestmentIcon;
        break;
      default:
        icon = null;
    }

    return (
      <BackgroundAvatar>
        <Image src={icon} height={40} width={30} alt="activity image" />
      </BackgroundAvatar>
    );
  };

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Stack direction="row" gap={2}>
            {getIcon()}
            <Box textAlign="justify">
              <Typography variant="subtitle1">
                {props.school || props.name || props.position}
                <IconButton onClick={() => onEdit(data)} size="small">
                  <BorderColorOutlined sx={{ fontSize: '12px' }} />
                </IconButton>
              </Typography>
              <Typography sx={{ opacity: 0.8 }} variant="caption">
                {props.field || props.company || props.description}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack
            gap={1}
            alignItems="flex-end"
            justifyContent={isMobile ? 'space-between' : 'center'}
            direction={isMobile ? 'row' : 'column'}
          >
            <Typography variant="subtitle1">
              {props.period || props.year}
            </Typography>
            {props.fromMonth && (
              <Typography sx={{ opacity: 0.8 }} variant="caption">
                {`${props.fromMonth} ${props.fromYear} - ${props.toMonth} ${props.toYear}`}
              </Typography>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ width: '100%' }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileActivityInfo;
