// @ts-nocheck
'use client';
import React from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  Typography,
  Paper,
  OutlinedInput,
  useTheme,
  Chip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import HistoryIcon from '@mui/icons-material/History';
import { useSession } from 'next-auth/react';
import {
  useGetBonusTaskStatusQuery,
  useGetInviteHistoryQuery,
} from '@/lib/redux/slices/earnings';

const CopyableInput = () => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    const input = inputRef.current;
    if (input) {
      input.select();
      try {
        // Using the modern navigator.clipboard API
        navigator.clipboard
          .writeText(input.value)
          .then(() => {
            console.log('Text copied to clipboard');
            setOpenSnackbar(true);
          })
          .catch(err => {
            console.error('Failed to copy text: ', err);
          });
      } catch (err) {
        console.error('Error in copying text: ', err);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <OutlinedInput
        inputRef={inputRef}
        defaultValue="https://www.floyx.com/registration..."
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleCopy} edge="end">
              <ContentCopyIcon />
            </IconButton>
          </InputAdornment>
        }
        fullWidth
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

const StyledBox = ({ children }: any) => {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        maxWidth: 360,
        background: palette.background.paper, // Adjust the color based on your design
        borderRadius: '8px', // Adjust border radius based on your design
        border: `1px solid ${palette.action.border}`, // Adjust border color based on your design
        padding: '24px',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {children}
    </Box>
  );
};

const InvitationStatusCard = () => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetInviteHistoryQuery();

  const totalReward = data
    ? data?.referralHistory.reduce((a, c) => a + c.referrEarnedAmount, 0)
    : 0;
  return (
    <Box
      sx={{
        borderRadius: '12px', // Adjust to match design
        textAlign: 'justify',
        maxWidth: '400px', // Adjust to match design
        margin: 'auto',
      }}
    >
      <Button
        variant="outlined"
        startIcon={<HistoryIcon />}
        sx={{ marginBottom: 2 }}
      >
        History
      </Button>
      <Typography variant="body1" gutterBottom>
        Successfully completed: &nbsp;
        <strong style={{ color: palette.primary.main }}>
          {data ? data.referralHistory.length : <Skeleton variant="text" />}
        </strong>
      </Typography>
      <Typography variant="body1" gutterBottom>
        Total referrals earned: &nbsp;
        <strong style={{ color: palette.primary.main }}>
          {isLoading ? (
            <Skeleton variant="text" />
          ) : (
            Math.floor(totalReward * 10000) / 10000
          )}
        </strong>
      </Typography>
      <Paper
        sx={{
          borderRadius: '12px', // Adjust to match design
          padding: '10px',
          marginTop: '20px',
          textAlign: 'justify',
        }}
      >
        <Typography variant="body2" gutterBottom>
          Invite friends to Floyx, for each friend invited you will receive
          additional points and bonuses. Use only safe social media and let your
          profile grow!
        </Typography>
      </Paper>
    </Box>
  );
};

const ReferralCard = () => {
  const { data, isLoading } = useGetBonusTaskStatusQuery();

  return (
    <StyledBox>
      <Typography variant="h6">Bonuses: </Typography>
      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height={320} />
      ) : (
        data &&
        data.map((bonus, index) => (
          <Box key={index} sx={{ width: '100%' }}>
            <Typography variant="subtitle2" gutterBottom>
              {bonus.taskName}
            </Typography>
            <Chip
              sx={{
                height: 'auto',
                padding: '8px',
                borderRadius: '5px',
                background: 'rgba(92, 241, 116, 0.17)',
                color: '#10C458',
                fontWeight: 500,
                my: '16px',
              }}
              label={`Status: ${`${50}/${bonus.countNeeded}`}`}
            />
            <Button variant="outlined" sx={{ mt: 1, mb: 2 }}>
              Promoted Post For {bonus.promotedDays} Day
              {bonus.promotedDays > 1 && 's'}
            </Button>
          </Box>
        ))
      )}
    </StyledBox>
  );
};

const EarningsSideBar = () => {
  const { status, data } = useSession();
  return (
    <Stack spacing={2} paddingTop="24px">
      <Typography variant="h6">
        {status === 'loading' ? (
          <Skeleton variant="rectangular" sx={{ width: '200px' }} />
        ) : (
          status === 'authenticated' &&
          `Referral Name:  ${data?.user?.name ?? data?.user?.username}`
        )}
      </Typography>
      <StyledBox>
        <CopyableInput />
      </StyledBox>
      <StyledBox>
        <Typography textAlign="left" variant="h6">
          Invitation status:{' '}
        </Typography>
        <InvitationStatusCard />
      </StyledBox>
      <ReferralCard isLoading={false} />
    </Stack>
  );
};

export default EarningsSideBar;
