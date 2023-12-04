/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import * as React from 'react';
import {
  Box,
  Card,
  Typography,
  IconButton,
  styled,
  Stack,
  useMediaQuery,
} from '@mui/material';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DailTaskSTatusIcon from '@/iconComponents/dailyTaskStatusIcon';

// Styled components
const DashboardCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.background.paper
      : theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow:
    theme.palette.mode === 'dark'
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
const DailyTask: React.FC = () => {
  const [_value, setValue] = React.useState(0);
  const isMobile = useMediaQuery('(max-width:480px)');
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const items = [1, 2, 3];
  return (
    <Box sx={{ p: isMobile ? 0 : 3, borderColor: 'rgba(255, 255, 255, 0.15)' }}>
      <Box p={1}>
        <Stack gap={2} alignItems="flex-start" display="flex" direction="row">
          <DailTaskSTatusIcon />
          <Typography variant="body2" color="textPrimary">
            Every 24 hours the daily task system is reset. Those task you don't
            finish disappear and new ones appear. After restarting, the tasks
            will reappear at different times. Check the tab and don't miss an
            opportunity to earn! Good luck!
          </Typography>
        </Stack>
      </Box>
      <Box p={2} textAlign="center" bgcolor="background.default">
        <Stack direction="row" spacing={{ xs: 1, sm: 3, md: 4 }}>
          <Typography variant="body2" color="textPrimary">
            Remaining Time
          </Typography>
          <Typography variant="body2" color="textPrimary">
            Name & Task Description
          </Typography>
          <Typography variant="body2" color="textPrimary">
            Status
          </Typography>
          <Typography variant="body2" color="textPrimary">
            Reward
          </Typography>
        </Stack>
      </Box>
      <Box p={2} textAlign="center" bgcolor="background.paper">
        {items.map((item, index) => (
          <Stack
            key={'item-' + index}
            direction="row"
            spacing={{ xs: 1, sm: 3, md: 4 }}
          >
            <Typography variant="body2" color="textPrimary">
              Remaining Time
            </Typography>
            <Typography variant="body2" color="textPrimary">
              Name & Task Description
            </Typography>
            <Typography variant="body2" color="textPrimary">
              Status
            </Typography>
            <Typography variant="body2" color="textPrimary">
              Reward
            </Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

export default DailyTask;
