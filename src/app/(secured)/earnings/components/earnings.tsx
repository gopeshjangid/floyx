"use client"
import * as React from 'react';
import { Box, Card, Button, Typography, IconButton, styled, useTheme } from '@mui/material';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HistoryIcon from '@mui/icons-material/History';
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

const StyledBalanceCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main, // Use your theme colors
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: theme.shadows[5],
  // Add linear gradient background based on your theme colors
  background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
}));

const Section = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

const PointsTypography = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.fontWeightBold,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  color: theme.palette.primary.contrastText,
  borderColor: theme.palette.primary.contrastText,
}));

const BalanceCard: React.FC = () => {
  const theme = useTheme();

  return (
    <StyledBalanceCard>
      <Section>
        <Typography variant="body2" color="text.secondary">
          Total points
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <AccountBalanceWalletIcon color="action" />
          <PointsTypography ml={1}>10.250 Points</PointsTypography>
        </Box>
        <ActionButton variant="outlined" startIcon={<HistoryIcon />}>
          Transaction History
        </ActionButton>
      </Section>
      <Box
        sx={{
          height: '100%',
          width: '1px',
          bgcolor: theme.palette.divider,
          opacity: 0.7,
        }}
      />
      <Section>
        <Typography variant="body2" color="text.secondary">
          Available balance
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <AccountBalanceWalletIcon color="action" />
          <PointsTypography ml={1}>08.750 Points</PointsTypography>
        </Box>
        <Typography variant="caption" color="text.secondary" mt={0.5}>
          Currently: $8.75
        </Typography>
        <Box display="flex" mt={1}>
          <ActionButton variant="outlined" sx={{ mr: 1 }}>
            Withdraw
          </ActionButton>
          <ActionButton variant="outlined">
            Wallet
          </ActionButton>
        </Box>
      </Section>
    </StyledBalanceCard>
  );
};


// Example usage of the styled components
const Earnings: React.FC = () => {
   
  return (
    <Box sx={{ p: 3, borderColor: 'rgba(255, 255, 255, 0.15)' }}>
        <BalanceCard/>
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

export default Earnings;
