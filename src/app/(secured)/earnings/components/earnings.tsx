'use client';
import * as React from 'react';
import { Box, Card, Button, Typography, IconButton, styled, useTheme, CardContent, Divider, Skeleton } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AvailableBalanceicon from '@/iconComponents/availableBalanceBadgeIcon';
import { useGetTipHistoryQuery, useGetTransactionHistoryQuery, useGetUserWalletQuery } from '@/lib/redux/slices/earnings';
// Styled components
const DashboardCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  '&:not(:last-child)': {
    marginBottom: theme.spacing(2),
  },
}));


const GradientCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(to right,#4D9AFF, #6dd5ed, #2193b0)', // This is a blue gradient, you can adjust it to match the provided image
  color: theme.palette.common.white,
}));

const PointsDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'column',
  width: '50%',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const PointsBalanceCard = () => {
  const { palette } = useTheme();
   const {data: wallet, isLoading: walletLoading, isError: walletError} = useGetUserWalletQuery();
  return (
    <GradientCard>
      <CardContent sx={{ display: 'flex', width: '100%' }}>
        <PointsDisplay>
          <Box>
            <Typography variant="h6">Total points</Typography>
            <Typography variant="h4">{walletLoading? <Skeleton variant='text'/> :wallet?.totalBalance+" Points"}</Typography>
          </Box>
          <Box>
            <Button variant="contained">Transaction History</Button>
          </Box>
        </PointsDisplay>
        <Divider variant="middle" sx={{ color: '#fff' }} orientation="vertical" flexItem />
        <PointsDisplay>
          <AvailableBalanceicon />
          <Box width="100%">
            <Typography variant="h6">Available balance</Typography>
            <Typography variant="h4">{walletLoading? <Skeleton variant='text'/> :wallet?.availableBalance+" Points"} </Typography>
            <Typography variant="subtitle1">Currently: $8.75</Typography>
          </Box>
          <Box width="100%" display="flex" justifyContent="flex-start">
            <Button variant="outlined" sx={{ width: '80px', border: `1.5px solid ${palette.primary[700]}`, color: palette.primary[700] }}>
              Withdraw
            </Button>
            <Button color="primary" variant="outlined" sx={{ border: `1.5px solid ${palette.primary[700]}`, color: palette.primary[700] }}>
              Wallet
            </Button>
          </Box>
        </PointsDisplay>
      </CardContent>
    </GradientCard>
  );
};

type Dashboard = {
  titleIcon: React.ReactNode;
  title: string;
  firstCountTitle: string;
  firstCount: string;
  secondTitle: string;
  secondCount: string;
  onHistoryClicked: () => void;
};
const DashboardBox: React.FC<Dashboard> = props => {
  return (
    <Box padding="16px">
      {' '}
      <Box width="100%" height="50px" display="flex">
        {props?.titleIcon}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Typography>{props?.title}</Typography>
      </Box>
      <Box display="flex" width="100%" justifyContent="space-between">
        <Box width="90%">
          <Box display="flex">
            <Typography>{props?.firstCountTitle}:&nbsp;&nbsp;&nbsp;</Typography>
            <Typography color="primary">{props?.firstCount}</Typography>
          </Box>
          <Box display="flex">
            <Typography>{props?.secondTitle}:&nbsp;&nbsp;&nbsp;</Typography>
            <Typography color="primary">{props?.secondCount}</Typography>
          </Box>
        </Box>
        <Box width="10%">
          <Button onClick={props?.onHistoryClicked} startIcon={<AccessTimeOutlinedIcon />} variant="outlined">
            History
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

// Example usage of the styled components
const Earnings: React.FC = () => {
  const {data: transactionHistory, isLoading: transacLoading, isError: transError} = useGetTransactionHistoryQuery();
  const {data: tipHistory, isLoading: tipLoading, isError: tipError} = useGetTipHistoryQuery();
 
  return (
    <Box sx={{ p: 3, borderColor: 'rgba(255, 255, 255, 0.15)' }}>
      <Box>
        <PointsBalanceCard />
      </Box>
      <Box padding="16px">
        <Typography variant="subtitle1" textAlign="center">
          Current exchange rate is 1 point = $1
        </Typography>
      </Box>
      <Divider />
      <DashboardCard>
        <DashboardBox
          onHistoryClicked={() => {}}
          title="Your Articles"
          titleIcon={<AccessTimeOutlinedIcon />}
          firstCountTitle="Number of articles added"
          firstCount="10"
          secondTitle="Total funds earned from your article"
          secondCount="3.69 Points"
        />
        <Divider />
        <DashboardBox
          onHistoryClicked={() => {}}
          title="Your Votes"
          titleIcon={<AccessTimeOutlinedIcon />}
          firstCountTitle="Number of all votes cast"
          firstCount="10"
          secondTitle="The sum of funds earned from voting"
          secondCount="3.69 Points"
        />
        <Divider />
        <DashboardBox
          onHistoryClicked={() => {}}
          title="Earnings From Daily Task"
          titleIcon={<AccessTimeOutlinedIcon />}
          firstCountTitle="Total number of daily tasks"
          firstCount="10"
          secondTitle="Total funds earned from tasks"
          secondCount="3.69 Points"
        />
      </DashboardCard>
      {/* Repeat <DashboardCard> for other sections as needed */}
    </Box>
  );
};

export default Earnings;
