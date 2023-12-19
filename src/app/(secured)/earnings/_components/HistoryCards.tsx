// @ts-nocheck
'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  useTheme,
  FormControl,
  FormLabel,
  Input,
  TextField,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import HistoryIcon from '@mui/icons-material/History';
import { useSession } from 'next-auth/react';
import {
  useGetActiveCurrencyQuery,
  useGetArticleTipHistoryQuery,
  useGetCompletedTaskHistoryQuery,
  useGetTipHistoryQuery,
  useGetTransactionHistoryQuery,
  useGetUserWalletQuery,
  useUpdateWalletMutation,
} from '@/lib/redux/slices/earnings';
import CustomDialog from '@/components/CustomDialog';
import moment from 'moment';
import Link from 'next/link';
import ButtonWithLoading from '@/components/ButtonWithLoading';

const TransactionHistory = React.memo(() => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetTransactionHistoryQuery();
  const [showHistory, setShowHistory] = useState(false);

  return (
    <Box textAlign="left">
      {showHistory && data && (
        <CustomDialog
          PaperProps={{
            elevation: 1,
            sx: { backgroundColor: palette.primary.mainBackground },
          }}
          content={
            <Stack gap={2}>
              {data.map((item, index) => (
                <Box key={'item-' + index}>
                  <Typography variant="caption">
                    {moment(item.withdrawalDate).format('YYYY/MM/YY')} &nbsp;
                    You have withdrawn{' '}
                    <span style={{ color: 'green' }}>
                      {item.withdrawalAmount}
                    </span>
                    {'  '}
                    from your account to {item.walletAddress} is
                    <span
                      style={{ color: item.status === 0 ? 'green' : '#dacb46' }}
                    >
                      {'  '}
                      {item.status === 0 ? 'COMPLETED' : 'PENDING'}
                    </span>{' '}
                  </Typography>
                </Box>
              ))}
            </Stack>
          }
          open
          title="Transaction History"
          actions={
            <Button onClick={() => setShowHistory(false)} variant="outlined">
              Close
            </Button>
          }
        />
      )}
      <Button
        variant="text"
        onClick={() => setShowHistory(true)}
        startIcon={<HistoryIcon />}
        sx={{
          textDecoration: 'underline',
          fontWeight: 500,
          fontSize: '15px',
          color: palette.primary[700],
        }}
      >
        Transaction History
      </Button>
    </Box>
  );
});

const ArticleHistory = React.memo(() => {
  const { palette } = useTheme();
  const session = useSession();
  const username = (session as any) ? session.data?.user.username : '';
  const { data, isLoading } = useGetArticleTipHistoryQuery();
  const [showHistory, setShowHistory] = useState(false);

  const getUrl = url => {
    return `${window.location.protocol}//${
      window.location.host
    }/article/${encodeURIComponent(username)}/${encodeURIComponent(url)}`;
  };
  return (
    <Box>
      {showHistory && data && (
        <CustomDialog
          PaperProps={{
            elevation: 1,
            sx: { backgroundColor: palette.primary.mainBackground },
          }}
          content={
            <Stack gap={2}>
              {data.map((item, index) => (
                <Box key={'item-' + index}>
                  <Typography variant="caption">
                    {moment(item.earnedOn).format('YYYY/MM/YY')} &nbsp; You
                    article{' '}
                    <Link
                      target="__blank"
                      style={{ textDecoration: 'underline', color: 'blue' }}
                      href={getUrl(item.articleUrl)}
                    >
                      {getUrl(item.articleUrl)}
                    </Link>
                    {'  '}
                    earned
                    <span style={{ color: 'green' }}>
                      {'  '}
                      {item.amountEarned}
                    </span>{' '}
                  </Typography>
                </Box>
              ))}
            </Stack>
          }
          open
          title="Article History"
          actions={
            <Button onClick={() => setShowHistory(false)} variant="outlined">
              Close
            </Button>
          }
        />
      )}
      <Button
        variant="outlined"
        fullWidth
        onClick={() => setShowHistory(true)}
        startIcon={<HistoryIcon />}
      >
        History
      </Button>
    </Box>
  );
});

const VoteHistory = React.memo(() => {
  const { palette } = useTheme();
  const session = useSession();
  const username = (session as any) ? session.data?.user.username : '';
  const { data, isLoading } = useGetTipHistoryQuery();
  const [showHistory, setShowHistory] = useState(false);

  const getUrl = url => {
    return `${window.location.protocol}//${
      window.location.host
    }/article/${encodeURIComponent(username)}/${encodeURIComponent(url)}`;
  };
  return (
    <Box>
      {showHistory && data && (
        <CustomDialog
          PaperProps={{
            elevation: 1,
            sx: { backgroundColor: palette.primary.mainBackground },
          }}
          content={
            <Stack gap={2}>
              {data.map((item, index) => (
                <Box key={'item-' + index}>
                  <Typography variant="caption">
                    {moment(item.earnedOn).format('YYYY/MM/YY')} &nbsp; Your
                    voted{' '}
                    <Link
                      target="__blank"
                      style={{ textDecoration: 'underline', color: 'blue' }}
                      href={getUrl(item.articlePublicUrl)}
                    >
                      {getUrl(item.articlePublicUrl)}
                    </Link>
                    {'  '}
                    earned
                    <span style={{ color: 'green' }}>
                      {'  '}
                      {item.amountEarned}
                    </span>{' '}
                  </Typography>
                </Box>
              ))}
            </Stack>
          }
          open
          title="Vote History"
          actions={
            <Button onClick={() => setShowHistory(false)} variant="outlined">
              Close
            </Button>
          }
        />
      )}
      <Button
        variant="outlined"
        fullWidth
        onClick={() => setShowHistory(true)}
        startIcon={<HistoryIcon />}
      >
        History
      </Button>
    </Box>
  );
});

const DailyTaskHistory = React.memo(() => {
  const { palette } = useTheme();
  const session = useSession();
  const username = (session as any) ? session.data?.user.username : '';
  const { data, isLoading } = useGetCompletedTaskHistoryQuery();
  const [showHistory, setShowHistory] = useState(false);

  return (
    <Box>
      {showHistory && data && (
        <CustomDialog
          PaperProps={{
            elevation: 1,
            sx: {
              minWidth: '350px',
              backgroundColor: palette.primary.mainBackground,
            },
          }}
          content={
            <Stack gap={2}>
              {data.map((item, index) => (
                <Box key={'item-' + index}>
                  <Typography variant="caption">
                    {moment(item.earnedOn).format('YYYY/MM/YY')} &nbsp; You
                    earned
                    <span style={{ color: 'green' }}>
                      {'  '}
                      {item.amountEarned}
                    </span>{' '}
                    from a daily task
                  </Typography>
                </Box>
              ))}
            </Stack>
          }
          open
          title="Daily Task History"
          actions={
            <Button onClick={() => setShowHistory(false)} variant="outlined">
              Close
            </Button>
          }
        />
      )}
      <Button
        variant="outlined"
        fullWidth
        onClick={() => setShowHistory(true)}
        startIcon={<HistoryIcon />}
      >
        History
      </Button>
    </Box>
  );
});

const WalletHistory = React.memo(() => {
  const { palette } = useTheme();
  const balanceButtonStyle = {
    color: palette.mode === 'dark' ? '#000000' : '#ffffff',
    border: `1.5px solid`,
    borderColor:
      'linear-gradient(134deg, #AB59FF 0%, #858FFF 50%, #4D9AFF 100%)',
  };
  const [walletData, setWallet] = useState('');
  const { data: wallet, isLoading } = useGetUserWalletQuery();
  const [updateWallet, { isLoading: updating, isSuccess, isError }] =
    useUpdateWalletMutation();
  const { data: activeCurrency } = useGetActiveCurrencyQuery();
  const [showHistory, setShowHistory] = useState(false);
  useEffect(() => {
    if (wallet) setWallet(wallet.walletAddress);
  }, [wallet, showHistory]);

  useEffect(() => {
    let timer = null;
    if (isSuccess) {
      setTimeout(() => setShowHistory(false), 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isSuccess]);

  const update = () => {
    updateWallet({ walletAddress: walletData });
  };

  const closeHandler = () => {
    setWallet('');
    setShowHistory(false);
  };

  return (
    <Box>
      {showHistory && wallet && (
        <CustomDialog
          PaperProps={{
            elevation: 1,
            sx: {
              minWidth: '350px',
              backgroundColor: palette.primary.mainBackground,
            },
          }}
          content={
            <Stack gap={2}>
              <Typography textAlign="center" variant="subtitle1">
                You currently earn in the currency :{' '}
                <strong>{activeCurrency?.currencyName}</strong>
              </Typography>
              <Typography textAlign="center" variant="caption">
                Provide Your withdrawal Address
              </Typography>
              {isLoading ? (
                <Skeleton variant="text" width="100%" height="30px" />
              ) : (
                <TextField
                  variant="outlined"
                  label="Wallet Address"
                  onChange={e => setWallet(e.target.value)}
                  value={walletData}
                />
              )}
            </Stack>
          }
          open
          title="Your Wallet"
          actions={
            <Stack direction="row" gap={1}>
              <Button onClick={closeHandler} variant="outlined">
                Close
              </Button>
              <ButtonWithLoading
                variant="contained"
                onClick={update}
                isError={isError}
                isSuccess={isSuccess}
                isLoading={updating}
              >
                Update Wallet
              </ButtonWithLoading>
            </Stack>
          }
        />
      )}
      <Button
        sx={balanceButtonStyle}
        variant="outlined"
        fullWidth
        onClick={() => setShowHistory(true)}
      >
        Wallet
      </Button>
    </Box>
  );
});

export {
  TransactionHistory,
  WalletHistory,
  DailyTaskHistory,
  VoteHistory,
  ArticleHistory,
};
