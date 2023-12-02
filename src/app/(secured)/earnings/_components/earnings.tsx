/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import * as React from 'react';
import {
  Box,
  Card,
  Button,
  Typography,
  styled,
  useTheme,
  CardContent,
  Divider,
  Skeleton,
  Grid,
} from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AvailableBalanceicon from '@/iconComponents/availableBalanceBadgeIcon';
import {
  useGetArticleTipHistoryQuery,
  useGetCompletedTaskHistoryQuery,
  useGetTipHistoryQuery,
  useGetTransactionHistoryQuery,
  useGetUserWalletQuery,
} from '@/lib/redux/slices/earnings';
import useQuery from '@/lib/hooks/useFetch';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import SubscriptionIcon from '@/iconComponents/subscriptionIcon';
import ArticleIcon from '@/iconComponents/articleIcon';
import axios from 'axios';
import VoteIcon from '@/iconComponents/voteIcon';
import EarningIcon from '@/iconComponents/earningIcon';
// Styled components
const DashboardCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.paper : '#fff',
  borderRadius: theme.shape.borderRadius,
  '&:not(:last-child)': {
    marginBottom: theme.spacing(2),
  },
  boxShadow: 'none',
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
  borderRadius: theme.shape.borderRadius,
}));

const PointsBalanceCard = () => {
  const { palette } = useTheme();
  const {
    data: currencyResp,
    fetchData,
    isLoading,
  } = useQuery<any>(ApiEndpoint.ActiveCurrency);
  const {
    data: wallet,
    isLoading: walletLoading,
    isError: walletError,
    error,
  } = useGetUserWalletQuery();
  const [currentBalance, setCurrentBalance] = React.useState(0.0);

  const getActiveCurrency = (currencyResp: any) => {
    const activeCurrency = currencyResp.value.data.currencyName;
    axios
      .get(
        'https://min-api.cryptocompare.com/data/pricemulti?fsyms=USD&tsyms=' +
          activeCurrency
      )
      .then((res: { data: { USD: Record<string, number> } }) => {
        let cryptoAmountPerDollar = 0;
        Object.keys(res.data.USD).map(function (key, _index) {
          cryptoAmountPerDollar = res.data.USD[key];
        });
        const convertedBalance = wallet
          ? wallet.availableBalance * cryptoAmountPerDollar
          : 0;
        console.log({ convertedBalance });
        setCurrentBalance(convertedBalance);
      })
      .catch((_err: any) => {
        // console.log('error in currency conversion', err);
      });
  };

  React.useEffect(() => {
    console.log({ currencyResp });
    if (currencyResp?.value?.data?.currencyName) {
      getActiveCurrency(currencyResp);
    }
  }, [currencyResp]);

  React.useEffect(() => {
    fetchData({ method: 'GET', urlEndPoint: ApiEndpoint.ActiveCurrency });
  }, []);

  if (walletError) {
    return (
      <Box p="16px">
        <Typography color="error" variant="h6">
          Something went wrong!
        </Typography>
      </Box>
    );
  }
  return (
    <GradientCard>
      <CardContent sx={{ display: 'flex', width: '100%' }}>
        <Grid container>
          <Grid item xs={12} sm={5}>
            <PointsDisplay>
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6">Total points</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h4">
                    {walletLoading ? (
                      <Skeleton variant="text" />
                    ) : (
                      wallet?.totalBalance + ' Points'
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Button
                    startIcon={<AccessTimeOutlinedIcon />}
                    sx={{
                      textDecoration: 'underline',
                      fontWeight: 500,
                      color: palette.primary[700],
                    }}
                    variant="text"
                  >
                    Transaction History
                  </Button>
                </Grid>
              </Grid>
            </PointsDisplay>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Divider
              variant="middle"
              sx={{ color: '#fff' }}
              orientation="vertical"
              flexItem
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PointsDisplay>
              <Grid container spacing={1}>
                <Grid item sm={3} xs={3} textAlign="left">
                  <AvailableBalanceicon />
                </Grid>
                <Grid item sm={9} xs={9}>
                  <Box width="100%">
                    <Typography variant="h6">Available balance</Typography>
                    <Typography variant="h4">
                      {walletLoading ? (
                        <Skeleton variant="text" />
                      ) : (
                        wallet?.availableBalance + ' Points'
                      )}{' '}
                    </Typography>
                    <Typography variant="subtitle1">
                      Currently: $
                      {isLoading ? (
                        <Skeleton variant="text" />
                      ) : (
                        currentBalance.toFixed(10)
                      )}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item sm={12} xs={6}>
                  <Button variant="outlined">Withdraw</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button color="primary" variant="outlined">
                    Wallet
                  </Button>
                </Grid>
              </Grid>
            </PointsDisplay>
          </Grid>
        </Grid>
      </CardContent>
    </GradientCard>
  );
};

type Dashboard = {
  titleIcon: React.ReactNode;
  title: string;
  firstCountTitle: string;
  firstCount: string | number;
  secondTitle: string;
  secondCount: string | number;
  onHistoryClicked: () => void;
  isLoading: boolean;
};
const DashboardBox: React.FC<Dashboard> = props => {
  return (
    <Box padding="16px">
      <Box width="100%" height="80px" alignItems="center" display="flex">
        {props?.titleIcon}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Typography variant="h5">{props?.title}</Typography>
      </Box>
      <Box display="flex" width="100%" justifyContent="space-between">
        <Grid container>
          <Grid item xs={12} sm={10}>
            <Box display="flex">
              <Typography variant="subtitle2">
                {props?.firstCountTitle}:&nbsp;&nbsp;&nbsp;
              </Typography>
              <Typography variant="subtitle2" color="primary">
                {props.isLoading ? (
                  <Skeleton sx={{ width: '25px' }} variant="text" />
                ) : (
                  props?.firstCount
                )}
              </Typography>
            </Box>
            <Box display="flex">
              <Typography variant="subtitle2">
                {props?.secondTitle}:&nbsp;&nbsp;&nbsp;
              </Typography>
              <Typography variant="subtitle2" color="primary">
                {props.isLoading ? (
                  <Skeleton sx={{ width: '25px' }} variant="text" />
                ) : (
                  props?.secondCount
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            {props.isLoading ? (
              <Skeleton sx={{ height: '25px', width: '50px' }} variant="text" />
            ) : (
              <Button
                onClick={props?.onHistoryClicked}
                startIcon={<AccessTimeOutlinedIcon />}
                variant="outlined"
              >
                History
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

// Example usage of the styled components
const Earnings: React.FC = () => {
  const { palette } = useTheme();
  const {
    data: completedHistory,
    isLoading: completedLoading,
    isError: completedError,
  } = useGetCompletedTaskHistoryQuery();
  const {
    data: tipHistory,
    isLoading: tipLoading,
    isError: tipError,
  } = useGetTipHistoryQuery();
  const {
    data: articleTipHistory,
    isLoading: articleTipLoading,
    isError: articleTipError,
  } = useGetArticleTipHistoryQuery();

  const articlePoints = articleTipHistory?.length
    ? articleTipHistory.reduce((accumulator, current) => {
        return accumulator + current.amountEarned;
      }, 0)
    : 0.0;
  const tipPoints =
    tipHistory && tipHistory?.length
      ? tipHistory.reduce((accumulator, current) => {
          return accumulator + current.amountEarned;
        }, 0)
      : 0.0;

  const completedTaskPoints =
    completedHistory && completedHistory?.length
      ? completedHistory.reduce((accumulator, current) => {
          return accumulator + current.amountEarned;
        }, 0)
      : 0.0;
  return (
    <Box sx={{ p: 0 }}>
      <Box>
        <PointsBalanceCard />
      </Box>
      <DashboardCard>
        {/* <DashboardBox
          onHistoryClicked={() => {}}
          title="My Subscriptions"
          titleIcon={<AccessTimeOutlinedIcon />}
          firstCountTitle="Number of articles added"
          firstCount="10"
          secondTitle="Total funds earned from your article"
          secondCount="3.69 Points"
          isLoading={articleTipLoading}
        />
        <Divider /> */}
        <DashboardBox
          onHistoryClicked={() => {}}
          title="Your Articles"
          titleIcon={
            <ArticleIcon
              fill={palette.background.paper}
              stroke={palette.background.default}
            />
          }
          firstCountTitle="Number of articles added"
          firstCount={
            !articleTipError && articleTipHistory
              ? articleTipHistory?.length
              : 0
          }
          secondTitle="Total funds earned from your article"
          secondCount={articlePoints.toFixed(3) + ' Points'}
          isLoading={articleTipLoading}
        />
        <Divider />
        <DashboardBox
          onHistoryClicked={() => {}}
          title="Your Votes"
          titleIcon={
            <VoteIcon
              fill={palette.background.paper}
              stroke={palette.action.activatedOpacity}
            />
          }
          firstCountTitle="Number of all votes cast"
          firstCount={
            !tipError && tipHistory
              ? tipHistory.length + ' Points'
              : 0 + ' Points'
          }
          secondTitle="The sum of funds earned from voting"
          secondCount={!tipError && tipHistory && tipHistory ? tipPoints : 0}
          isLoading={articleTipLoading}
        />
        <Divider />
        <DashboardBox
          onHistoryClicked={() => {}}
          title="Earnings From Daily Task"
          titleIcon={
            <EarningIcon
              fill={palette.background.paper}
              stroke={palette.background.default}
            />
          }
          firstCountTitle="Total number of daily tasks"
          firstCount={completedHistory ? completedHistory.length : 0}
          secondTitle="Total funds earned from tasks"
          secondCount={completedTaskPoints + ' Points'}
          isLoading={articleTipLoading}
        />
      </DashboardCard>
      {/* Repeat <DashboardCard> for other sections as needed */}
    </Box>
  );
};

export default Earnings;
