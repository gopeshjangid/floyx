/* eslint-disable camelcase */
// @ts-nocheck
'use client';
import React, { useState, useEffect, Suspense, useCallback } from 'react';
import {
  FloyxStakingAddress,
  //New_Floyx_Token_Address,
  Floyx_TokenVesting_Address,
  FloyxPrivateSeedClaimer,
} from '@/constants/Addresses';

//import { getFloyxContract } from '@constants/Floyx_Token';
// import { getNewFloyxContract } from '@/constants/New_Floyx_Token';
// import { getVestingContract } from '@/constants/Vesting_Contract';
// import { getPrivateSeedContract } from '@/constants/PrivateSeed_Contract';
// import { getStakingContract } from '@/constants/Staking_Contract';
import { useToast } from '@/components/Toast/useToast';
import {
  Box,
  Stack,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import Image from 'next/image';
import WalletPanelImage from '@/assets/wallet-panal.png';
import ReusableModal from './_components/modal';
import Counter from './_components/CountdownTimer';
import {
  useAccount,
  useDisconnect,
  useReadContract,
  useWriteContract,
} from 'wagmi';
import TokenPanelHeader from './_components/header';
import { vestingContractabi } from '@/constants/VestingContract_abi';
import { stakingContractabi } from '@/constants/Staking_abi';
import { privateSeedContractabi } from '@/constants/PrivateSeed_abi';
import { ethers } from 'ethers';

import LandingPage from './_components/landingPage';

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
  const [modalType, setModal] = useState('LANDING');
  const { address, isConnected, isConnecting, isReconnecting, isDisconnected } =
    useAccount();
  const { disconnect } = useDisconnect();
  const [lockTimer, setLockTimer] = useState(0);
  const [vestingAmount, setVestingAmount] = useState({
    totalAmount: 0,
    releasedAmount: 0,
    availableAmount: 0,
  });

  const [stakingAmount, setStakingAmount] = useState({
    totalAmount: 0,
    releasedAmount: 0,
    availableAmount: 0,
  });

  const [privateAmount, setPrivateAmount] = useState({
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

    if (claimStatus === 'success') {
      toast.success('Claim completed!');
      window.location.reload();
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
    if (vestingScheduledAmount) {
      setVestingAmount(amount => ({
        ...amount,
        totalAmount: formatWeiTOEather(vestingScheduledAmount),
      }));
    }
  }, [vestingScheduledAmount]);

  useEffect(() => {
    console.log('vestingScheduledAmount: ', vestingReleasedAmount);
    if (vestingReleasedAmount) {
      setVestingAmount(amount => ({
        ...amount,
        releasedAmount: formatWeiTOEather(vestingReleasedAmount),
      }));
    }
  }, [vestingReleasedAmount]);

  useEffect(() => {
    console.log('vestingScheduledAmount: ', vestingClaimableAmount);
    if (vestingClaimableAmount) {
      setVestingAmount(amount => ({
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
      setPrivateAmount(privateAmount => ({
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
      setPrivateAmount(privateAmount => ({
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
      setPrivateAmount(privateAmount => ({
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
      setStakingAmount(stakeAmount => ({
        ...stakeAmount,
        totalAmount: formatWeiTOEather(funcToGetStakedAmount),
      }));
    }
  }, [funcToGetStakedAmount]);

  useEffect(() => {
    console.log('funcTogetRewardAmount: ', funcTogetRewardAmount);
    if (funcTogetRewardAmount) {
      setStakingAmount(stakeAmount => ({
        ...stakeAmount,
        availableAmount: formatWeiTOEather(funcTogetRewardAmount),
      }));
    }
  }, [funcTogetRewardAmount]);

  useEffect(() => {
    console.log('isConnected: ', isConnected);

    if (isConnected && address) {
      setModal('STAKING');
    }
  }, [isConnected, address]);

  async function setTimerFunction() {
    try {
      setLockTimer(0);
      let oneMonthTime = 0;
      let timePeriod = 0;

      if (modalType === 'SEEDVESTING') {
        oneMonthTime = parseInt(Seed_OneMonth) * 1000;
        timePeriod = parseInt(seedVestingStartTime) * 1000;
      } else if (modalType === 'STAKING') {
        oneMonthTime = parseInt(getStakeTime) * 1000 - Date.now();
        timePeriod = parseInt(getStakeTime) * 1000;
      } else if (modalType === 'PRESALEVESTING') {
        oneMonthTime = parseInt(Private_OneMonth) * 1000;
        timePeriod = parseInt(privateVestingStartTime) * 1000;
      }

      if (timePeriod === 0 || oneMonthTime <= 0) {
        setLockTimer(0);
        return;
      }

      let lockPeriod = timePeriod;
      // Direct calculation instead of while loop
      const periodsElapsed = Math.ceil(
        (Date.now() - lockPeriod) / oneMonthTime
      );
      if (periodsElapsed > 0) {
        lockPeriod += periodsElapsed * oneMonthTime;
      }

      setLockTimer(lockPeriod);
    } catch (e) {
      toast.error('Oops! An error occurred.');
      console.error(e); // More descriptive error logging
    }
  }

  useEffect(() => {
    if (
      address &&
      modalType === 'PRESALEVESTING' &&
      privateVestingStartTime !== '0n'
    ) {
      console.log('timer set PRESALEVESTING');
      setTimerFunction();
    }
  }, [modalType, privateVestingStartTime, address]);

  useEffect(() => {
    if (
      address &&
      modalType === 'SEEDVESTING' &&
      seedVestingStartTime !== '0n'
    ) {
      console.log('timer set SEEDVESTING');
      setTimerFunction();
    }
  }, [seedVestingStartTime, modalType, address]);

  useEffect(() => {
    if (address && modalType === 'STAKING' && getStakeTime !== '0n') {
      console.log('timer set STAKING');
      setTimerFunction();
    }
  }, [modalType, getStakeTime, address]);

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
      setModal('FIRST');
    }
  }, [disconnect, setModal]);

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
        />
      </Suspense>
      <Box
        sx={{
          backgroundImage: `url(../tokenPanelBg.png)`,
          height: '135vh', // Adjust the height as needed
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100vw' /* Full viewport width */
        }}
      >
        {modalType === 'LANDING' && <LandingPage setModal={setModal} />}
        {modalType !== 'LANDING' && (
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
                <Counter targetDate={lockTimer ? new Date(lockTimer) : 0} />
                <Box py={1} textAlign="center">
                  <Stack justifyContent={'center'} direction="row" gap={1}>
                    <Typography variant="subtitle1">Total Amount</Typography>:
                    <Typography fontWeight={'500'} variant="subtitle1">
                      {modalType === 'STAKING'
                        ? stakingAmount.totalAmount
                        : modalType === 'SEEDVESTING'
                          ? vestingAmount.totalAmount
                          : privateAmount.totalAmount}
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
                        {modalType === 'STAKING'
                          ? stakingAmount.releasedAmount
                          : modalType === 'SEEDVESTING'
                            ? vestingAmount.releasedAmount
                            : privateAmount.releasedAmount}
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
                      {modalType === 'STAKING'
                        ? stakingAmount.availableAmount
                        : modalType === 'SEEDVESTING'
                          ? vestingAmount.availableAmount
                          : privateAmount.availableAmount}
                    </Typography>
                  </Stack>
                </Box>
                <Box mt={2} textAlign="center" pt={1}>
                  {getActionButtons()}
                </Box>
              </Box>
            )}
          </ReusableModal>
        )}
      </Box>
    </Box>
  );
};

export default updatedtokenPanel;
