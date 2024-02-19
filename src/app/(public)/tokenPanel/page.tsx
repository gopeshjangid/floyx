/* eslint-disable camelcase */
// @ts-nocheck
'use client';
import React, { useState, useEffect, Suspense, useCallback } from 'react';
import {
  FloyxStakingAddress,
  New_Floyx_Token_Address,
  Floyx_TokenVesting_Address,
  FloyxPrivateSeedClaimer,
} from '@/constants/Addresses';
import FloyxImage from '@/iconComponents/floyxIcon';
//import { getFloyxContract } from '@constants/Floyx_Token';
import { getNewFloyxContract } from '@/constants/New_Floyx_Token';
import { getVestingContract } from '@/constants/Vesting_Contract';
import { getPrivateSeedContract } from '@/constants/PrivateSeed_Contract';
import { getStakingContract } from '@/constants/Staking_Contract';
import { useToast } from '@/components/Toast/useToast';
import {
  Box,
  Stack,
  Typography,
  useTheme,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import Image from 'next/image';
import WalletPanelImage from '@/assets/wallet-panal.png';
import ReusableModal from './_components/modal';
import Counter from './_components/CountdownTimer';
import {
  useAccount,
  useBalance,
  useDisconnect,
  useReadContract,
  useReadContracts,
  useWriteContract,
} from 'wagmi';
import TokenPanelHeader from './_components/header';
import { vestingContractabi } from '@/constants/VestingContract_abi';
import { stakingContractabi } from '@/constants/Staking_abi';
import { privateSeedContractabi } from '@/constants/PrivateSeed_abi';
import { ethers } from 'ethers';
import { ErrorOutlineOutlined } from '@mui/icons-material';

const NonLoggedinWalletModal = ({ onClick }: { onClick: () => void }) => {
  return (
    <Box textAlign="center">
      <Typography sx={{ color: '#000' }} textAlign="center" variant="h3">
        Connect Wallet
      </Typography>
      <Image
        src={WalletPanelImage}
        height="200px"
        width="300px"
        alt="Wallet panel"
      />
      <Button variant="text">Log in to your wallet to check the details</Button>
    </Box>
  );
};

const updatedtokenPanel = props => {
  const [modalType, setModal] = useState('FIRST');
  const { address, isConnected, isConnecting, isReconnecting, isDisconnected } =
    useAccount();
  const { disconnect } = useDisconnect();
  const [lockTimer, setLockTimer] = useState(0);
  const [amount, setAmount] = useState({
    totalAmount: 0,
    releasedAmount: 0,
    availableAmount: 0,
  });
  const toast = useToast();

  // SEED DETAILS

  const { data: seedVestingStartTime } = useReadContract({
    abi: vestingContractabi,
    address: Floyx_TokenVesting_Address,
    functionName: 'getStartTimePeriod',
    args: [address, '0'],
  });

  const { data: Seed_OneMonth } = useReadContract({
    abi: vestingContractabi,
    address: Floyx_TokenVesting_Address,
    functionName: 'getSlicePeriod',
    args: [address, '0'],
  });

  const { data: vestingScheduledAmount } = useReadContract({
    abi: privateSeedContractabi,
    address: FloyxPrivateSeedClaimer,
    functionName: 'getSeedTototalAmount',
    args: [address],
  });

  const { data: vestingClaimableAmount } = useReadContract({
    abi: privateSeedContractabi,
    address: FloyxPrivateSeedClaimer,
    functionName: 'getSeedClaimableAmount',
    args: [address],
  });

  const { data: vestingReleasedAmount } = useReadContract({
    abi: privateSeedContractabi,
    address: FloyxPrivateSeedClaimer,
    functionName: 'getSeedReleasedAmount',
    args: [address],
  });

  const {
    writeContract,
    error: claimError,
    status: claimStatus,
  } = useWriteContract();

  useEffect(() => {
    if (claimStatus === 'error') {
      console.log('Error in claim: ', claimError);
      toast.error('Claim not allowed!');
    }
  }, [claimStatus, claimError]);

  const claimVesting = () => {
    writeContract({
      abi: privateSeedContractabi,
      address: FloyxPrivateSeedClaimer,
      functionName: 'claimSeedVesting',
      args: [address],
    });
  };

  const formatWeiTOEather = weiValue => {
    return ethers.formatEther(weiValue);
  };

  useEffect(() => {
    console.log('vestingScheduledAmount: ', vestingScheduledAmount);
    if (vestingScheduledAmount) {
      setAmount(amount => ({
        ...amount,
        totalAmount: formatWeiTOEather(vestingScheduledAmount),
      }));
    }
  }, [vestingScheduledAmount]);

  useEffect(() => {
    console.log('vestingScheduledAmount: ', vestingReleasedAmount);
    if (vestingReleasedAmount) {
      setAmount(amount => ({
        ...amount,
        releasedAmount: formatWeiTOEather(vestingReleasedAmount),
      }));
    }
  }, [vestingReleasedAmount]);

  useEffect(() => {
    console.log('vestingScheduledAmount: ', vestingClaimableAmount);
    if (vestingClaimableAmount) {
      setAmount(amount => ({
        ...amount,
        availableAmount: formatWeiTOEather(vestingClaimableAmount),
      }));
    }
  }, [vestingClaimableAmount]);

  // Private Vesting

  const { data: privateVestingStartTime } = useReadContract({
    abi: vestingContractabi,
    address: Floyx_TokenVesting_Address,
    functionName: 'getStartTimePeriod',
    args: [address, '1'],
  });

  const { data: Private_OneMonth } = useReadContract({
    abi: vestingContractabi,
    address: Floyx_TokenVesting_Address,
    functionName: 'getSlicePeriod',
    args: [address, '1'],
  });

  const { data: getPrivateRewardAmount } = useReadContract({
    abi: privateSeedContractabi,
    address: FloyxPrivateSeedClaimer,
    functionName: 'getPrivateClaimableAmount',
    args: [address],
  });

  const { data: functotalPrivateAmountAvaialble } = useReadContract({
    abi: privateSeedContractabi,
    address: FloyxPrivateSeedClaimer,
    functionName: 'getPrivateTototalAmount',
    args: [address],
  });

  const { data: functotalPrivateReleasedAmount } = useReadContract({
    abi: privateSeedContractabi,
    address: FloyxPrivateSeedClaimer,
    functionName: 'getPrivateReleasedAmount',
    args: [address],
  });

  const claimPrivateReward = () => {
    writeContract({
      abi: privateSeedContractabi,
      address: FloyxPrivateSeedClaimer,
      functionName: 'claimPrivateVesting',
      args: [address],
    });
  };
  useEffect(() => {
    if (getPrivateRewardAmount) {
      setAmount(privateAmount => ({
        ...privateAmount,
        availableAmount: formatWeiTOEather(getPrivateRewardAmount),
      }));
    }
  }, [getPrivateRewardAmount]);

  useEffect(() => {
    console.log(
      'functotalPrivateAmountAvaialble: ',
      functotalPrivateAmountAvaialble
    );
    if (functotalPrivateAmountAvaialble) {
      setAmount(privateAmount => ({
        ...privateAmount,
        totalAmount: formatWeiTOEather(functotalPrivateAmountAvaialble),
      }));
    }
  }, [functotalPrivateAmountAvaialble]);

  useEffect(() => {
    console.log(
      'functotalPrivateReleasedAmount: ',
      functotalPrivateReleasedAmount
    );
    if (functotalPrivateReleasedAmount) {
      setAmount(privateAmount => ({
        ...privateAmount,
        releasedAmount: formatWeiTOEather(functotalPrivateReleasedAmount),
      }));
    }
  }, [functotalPrivateReleasedAmount]);

  // STAKING CHECK
  const { data: getStakeTime } = useReadContract({
    abi: stakingContractabi,
    address: FloyxStakingAddress,
    functionName: 'getStakingEndTime',
    args: [address],
  });
  const { data: funcToGetStakedAmount } = useReadContract({
    abi: stakingContractabi,
    address: FloyxStakingAddress,
    functionName: 'getStakedAmount',
    args: [address],
  });

  const { data: funcTogetRewardAmount } = useReadContract({
    abi: stakingContractabi,
    address: FloyxStakingAddress,
    functionName: 'getUserRewardAmount',
    args: [address],
  });

  const claimStaking = () => {
    writeContract({
      abi: stakingContractabi,
      address: FloyxStakingAddress,
      functionName: 'withdraw',
      args: [address],
    });
  };

  useEffect(() => {
    console.log('funcToGetStakedAmount: ', funcToGetStakedAmount);
    if (funcToGetStakedAmount) {
      setAmount(stakeAmount => ({
        ...stakeAmount,
        totalAmount: formatWeiTOEather(funcToGetStakedAmount),
      }));
    }
  }, [funcToGetStakedAmount]);

  useEffect(() => {
    console.log('funcTogetRewardAmount: ', funcTogetRewardAmount);
    if (funcTogetRewardAmount) {
      setAmount(stakeAmount => ({
        ...stakeAmount,
        availableAmount: formatWeiTOEather(funcTogetRewardAmount),
      }));
    }
  }, [funcTogetRewardAmount]);

  useEffect(() => {
    console.log('isConnected: ', isConnected);

    if (isConnected && address) {
      setModal('STAKING');
    } else {
      setModal('FIRST');
    }
  }, [isConnected, address]);

  async function setTimerFunction() {
    try {
      let timePeriod = null;
      let oneMonthTIme = null;
      if (modalType === 'SEEDVESTING') {
        oneMonthTIme = parseInt(Seed_OneMonth) * 1000;
        console.log({ oneMonthTIme });
        timePeriod = parseInt(seedVestingStartTime) * 1000;
      } else if (modalType === 'STAKING') {
        oneMonthTIme = parseInt(getStakeTime) * 1000 - Date.now() * 1000;
        console.log({ oneMonthTIme });
        timePeriod = parseInt(getStakeTime) * 1000;
      } else if (modalType === 'PRESALEVESTING') {
        oneMonthTIme = parseInt(Private_OneMonth) * 1000;
        timePeriod = parseInt(privateVestingStartTime) * 1000;
      }
      // Set lock timer to zero if timePeriod is zero
      if (timePeriod === 0) {
        setLockTimer(0);
        return;
      }
      // Calculate the next lock period
      let lockPeriod = timePeriod;
      while (Date.now() > lockPeriod) {
        lockPeriod += oneMonthTIme;
      }
      setLockTimer(lockPeriod);
    } catch (e) {
      toast.error('Oops! An error occurred.');
      console.error(e); // More descriptive error logging
    }
  }
  console.log('amount =>', amount);
  useEffect(() => {
    if (
      address &&
      (seedVestingStartTime || getStakeTime || privateVestingStartTime)
    ) {
      console.log('timer set');
      setTimerFunction();
    }
  }, [
    setTimerFunction,
    seedVestingStartTime,
    getStakeTime,
    privateVestingStartTime,
    address,
  ]);
  const getActionButtons = () => {
    if (claimStatus === 'pending') {
      return <CircularProgress />;
    }
    switch (modalType) {
      case 'STAKING':
        return (
          <Button onClick={claimStaking} variant="contained">
            Claim Floyx
          </Button>
        );
        break;
      case 'SEEDVESTING':
        return (
          <Button onClick={claimVesting} variant="contained">
            Claim Floyx
          </Button>
        );
      case 'PRESALEVESTING':
        return (
          <Button onClick={claimPrivateReward} variant="contained">
            Claim Floyx
          </Button>
        );
        break;

      default:
        break;
    }
  };

  const getTitles = () => {
    switch (modalType) {
      case 'STAKING':
        return (
          <Typography sx={{ color: '#000' }} textAlign="center" variant="h5">
            Next Staking Claim Available In
          </Typography>
        );
        break;
      case 'SEEDVESTING':
        return (
          <Typography sx={{ color: '#000' }} textAlign="center" variant="h5">
            Next Seed vesting Claim Available In
          </Typography>
        );
      case 'PRESALEVESTING':
        return (
          <Typography sx={{ color: '#000' }} textAlign="center" variant="h5">
            Next Private Sale Vesting Claim Available In
          </Typography>
        );
        break;

        break;
      default:
        break;
    }
  };

  const connectHandler = useCallback(() => {
    if (address) {
      disconnect();
    } else {
      setModal('CONNECT');
    }
  }, [disconnect, setModal]);

  console.log('lock perid', lockTimer);
  return (
    <Box width={'100%'}>
      <Suspense fallback={<Typography>Please wait...</Typography>}>
        <TokenPanelHeader
          setModal={setModal}
          modalType={modalType}
          isConnected={isConnected}
          isConnecting={isConnecting}
          address={address}
          connectHandler={connectHandler}
          FloyxImage={FloyxImage}
        />
      </Suspense>
      <Box
        sx={{
          backgroundImage: `url(../tokenPanelBg.png)`,
          height: '100vh', // Adjust the height as needed
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <ReusableModal
          isOpen={open}
          onClose={() => {
            setModal(false);
          }}
          title="vesting"
        >
          {modalType == 'FIRST' && (
            <NonLoggedinWalletModal onClick={() => setModal('CONNECT')} />
          )}
          {['STAKING', 'SEEDVESTING', 'PRESALEVESTING'].indexOf(modalType) >
            -1 && (
            <Box
              p={2}
              textAlign={'center'}
              sx={{ height: '360px', maxWidth: '90vw' }}
            >
              <Box p={1} gap={1}>
                {getTitles()}
              </Box>
              <Counter targetDate={lockTimer ? new Date(lockTimer) : null} />
              <Box py={1} textAlign="center">
                <Stack justifyContent={'center'} direction="row" gap={1}>
                  <Typography variant="subtitle1">Total Amount</Typography>:
                  <Typography fontWeight={'500'} variant="subtitle1">
                    {amount.totalAmount}
                  </Typography>
                </Stack>

                {modalType !== 'STAKING' && (
                  <Stack justifyContent={'center'} direction="row" gap={1}>
                    <Typography variant="subtitle1">
                      {modalType === 'STAKING'
                        ? 'Total Staked Amount'
                        : 'Total released amount'}
                    </Typography>
                    :
                    <Typography fontWeight={'500'} variant="subtitle1">
                      {amount.releasedAmount}
                    </Typography>
                  </Stack>
                )}

                <Stack justifyContent={'center'} direction="row" gap={1}>
                  <Typography variant="subtitle1">
                    {' '}
                    {modalType === 'STAKING'
                      ? 'Reward Amount'
                      : 'Available amount to claim'}
                  </Typography>
                  :
                  <Typography fontWeight={'500'} variant="subtitle1">
                    {amount.availableAmount}
                  </Typography>
                </Stack>
              </Box>
              {claimStatus === 'success' && (
                <Box my={1}>
                  <Alert severity="success" variant="outlined">
                    Claimed success!
                  </Alert>
                </Box>
              )}
              <Box mt={2} textAlign="center" pt={1}>
                {getActionButtons()}
              </Box>
            </Box>
          )}
        </ReusableModal>
      </Box>
    </Box>
  );
};

export default updatedtokenPanel;
