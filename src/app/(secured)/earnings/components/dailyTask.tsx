"use client"
import * as React from 'react';
import { Box, Card, CardContent, Typography, IconButton, styled } from '@mui/material';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

// Styled components
const DashboardCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 16px rgba(0, 0, 0, 0.3)'
    : '0 8px 16px rgba(0, 0, 0, 0.1)',
  '&:not(:last-child)': {
    marginBottom: theme.spacing(2),
  },
}));

const Item = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1.5),
  '&:last-child': {
    marginBottom: 0,
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(16),
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.5),
}));

const SectionContent = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  color: theme.palette.text.primary,
}));

// Example usage of the styled components
const Page: React.FC = () => {
   const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  
  return (
    <Box sx={{ p: 3, borderColor: 'rgba(255, 255, 255, 0.15)' }}>
      <DashboardCard>
        <Item>
          <IconWrapper>
            <HistoryEduIcon />
            <SectionTitle>Your Articles</SectionTitle>
          </IconWrapper>
          <SectionContent>Number of articles added: 10</SectionContent>
          <StyledIconButton size="large">
            <HistoryEduIcon />
          </StyledIconButton>
        </Item>
        <Item>
          <IconWrapper>
            <ThumbUpAltIcon />
            <SectionTitle>Your Votes</SectionTitle>
          </IconWrapper>
          <SectionContent>Number of all votes cast: 25</SectionContent>
          <StyledIconButton size="large">
            <ThumbUpAltIcon />
          </StyledIconButton>
        </Item>
        <Item>
          <IconWrapper>
            <AssignmentTurnedInIcon />
            <SectionTitle>Earnings From Daily Task</SectionTitle>
          </IconWrapper>
          <SectionContent>Total number of daily tasks: 45</SectionContent>
          <StyledIconButton size="large">
            <AssignmentTurnedInIcon />
          </StyledIconButton>
        </Item>
      </DashboardCard>
      {/* Repeat <DashboardCard> for other sections as needed */}
    </Box>
  );
};

export default Page;
