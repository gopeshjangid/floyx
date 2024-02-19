/* eslint-disable camelcase */
// @ts-nocheck
'use client';
import React, { useState, useEffect, Suspense } from 'react';
//import { Web3Provider } from '@ethersproject/providers';
//import Web3 from 'web3';
import {
  FloyxStakingAddress,
  New_Floyx_Token_Address,
  chainID,
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
  AppBar,
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
import { useRouter } from 'next/navigation';
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
import { contractNewFloyxAbi } from '@/constants/New_Floyx_Token_abi';
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
  const [web3Library, setWeb3Library] = useState('');
  const [lockTimer, setLockTimer] = useState(0);
  const [amount, setAmount] = useState({
    totalAmount: 0,
    releasedAmount: 0,
    availableAmount: 0,
  });
  const [privateAmount, setPrivateAmount] = useState({
    totalPrivateAmount: 0,
    releasedPrivateAmount: 0,
    claimablePrivateAmount: 0,
  });
  const [stakeAmount, setStakeAmount] = useState({
    totalStakedAmount: 0,
    totalStakeRewardAmount: 0,
  });
  const [web3Account, setWeb3Account] = useState('');
  const toast = useToast();
  // const [claimResult, setClaimResult] = useState({
  //   status: '',
  //   error: '',
  //   result: '',
  // });
  const theme = useTheme();

  // const result = useReadContract({
  //   abi: stakingContractabi,
  //   address: FloyxStakingAddress,
  //   functionName: 'getStakedAmount',
  //   args: [address],
  // });

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

  // useEffect(() => {
  //   setClaimResult({});
  // }, [vestingClaimStatus, vestingClaimError]);

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
    console.log('getPrivateRewardAmount: ', getPrivateRewardAmount);
    if (vestingClaimableAmount) {
      setPrivateAmount(privateAmount => ({
        ...privateAmount,
        claimablePrivateAmount: formatWeiTOEather(getPrivateRewardAmount),
      }));
    }
  }, [getPrivateRewardAmount]);
  useEffect(() => {
    console.log(
      'functotalPrivateAmountAvaialble: ',
      functotalPrivateAmountAvaialble
    );
    if (vestingClaimableAmount) {
      setPrivateAmount(privateAmount => ({
        ...privateAmount,
        totalPrivateAmount: formatWeiTOEather(functotalPrivateAmountAvaialble),
      }));
    }
  }, [functotalPrivateAmountAvaialble]);
  useEffect(() => {
    console.log(
      'functotalPrivateReleasedAmount: ',
      functotalPrivateReleasedAmount
    );
    if (vestingClaimableAmount) {
      setPrivateAmount(privateAmount => ({
        ...privateAmount,
        releasedPrivateAmount: formatWeiTOEather(
          functotalPrivateReleasedAmount
        ),
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
      setStakeAmount(stakeAmount => ({
        ...stakeAmount,
        totalStakedAmount: formatWeiTOEather(funcToGetStakedAmount),
      }));
    }
  }, [funcToGetStakedAmount]);
  useEffect(() => {
    console.log('funcTogetRewardAmount: ', funcTogetRewardAmount);
    if (funcTogetRewardAmount) {
      setStakeAmount(stakeAmount => ({
        ...stakeAmount,
        totalStakeRewardAmount: formatWeiTOEather(funcTogetRewardAmount),
      }));
    }
  }, [funcTogetRewardAmount]);

  const balance = useBalance({
    address,
    token: New_Floyx_Token_Address,
  });
  function getProvider(web3library_) {
    const { provider } = web3library_;
    //const web3 = new Web3(provider);
    const web3 = null;
    return web3;
  }
  useEffect(() => {
    console.log('isConnected: ', isConnected);

    if (isConnected && address) {
      setModal('STAKING');
    } else {
      setModal('FIRST');
    }
  }, [isConnected, address]);

  // useEffect(() => {
  //   if (!isConnected) return;
  //   (async () => {
  //     try {
  //       console.log('connected, reading contract');
  //       console.log('connected, reading contract');

  //       const result = await readContract(wagmiConfig, {
  //         abi: vestingContractabi,
  //         address: Floyx_TokenVesting_Address,
  //         functionName: 'getStartTimePeriod',
  //         args: [address, '0'],
  //       });
  //       console.log('result =>>>>>>>>>>>>: ', result);
  //     } catch (error) {
  //       console.error('Error reading contract:', error);
  //     }
  //   })();
  // }, [isConnected, address]);

  async function setStakeTimer(library: any, account: string) {
    try {
      let timePeriod = parseInt(getStakeTime) * 1000;
      if (timePeriod === 0) {
        setStakeLockTimer(0);
      } else {
        const currentTime = Date.now();
        if (currentTime > timePeriod) {
          setStakeLockTimer(0);
        } else {
          setStakeLockTimer(timePeriod);
        }
      }
    } catch (e) {
      notifyFailure('Oops! An error occurred.');
      console.log(e);
    }
  }

  async function fetchVestingDetails(
    _FloyxVestingContract,
    _address,
    _web3library,
    type
  ) {
    try {
      const amountTotal = await _FloyxVestingContract[`getSeed${type}Amount`](
        _address,
        overrides
      );
      const web3 = getProvider(_web3library);
      const balanceConverted = web3.utils.fromWei(
        amountTotal.toString(),
        'ether'
      );
      window[`setfloyx${type}Amount`](balanceConverted);
    } catch (e) {
      console.error(`Error in fetchVestingDetails for ${type}:`, e);
    }
  }

  // SEED

  async function setTimerFunction(library: any, account: string) {
    try {
      // Fetching oneMonth and timePeriod from the contract
      let oneMonthTIme = parseInt(Seed_OneMonth) * 1000;
      console.log({ oneMonthTIme });
      let timePeriod = parseInt(seedVestingStartTime) * 1000;

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

  useEffect(() => {
    if (address) setTimerFunction();
  }, [seedVestingStartTime, address]);

  /* PRIVATESALE VESTING */

  async function setPrivateTimerFunction(library: any, account: string) {
    try {
      // Fetching oneMonth and timePeriod from the contract
      let oneMonthTIme = parseInt(Private_OneMonth) * 1000;
      console.log({ oneMonthTIme });
      let timePeriod = parseInt(privateVestingStartTime) * 1000;

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

  useEffect(() => {
    if (address) setPrivateTimerFunction();
  }, [privateVestingStartTime, address]);

  const getActionButtons = () => {
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

  const connectHandler = () => {
    if (address) {
      disconnect();
    } else {
      setModal('CONNECT');
    }
  };
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
              <Counter
                targetDate={lockTimer ? new Date(lockTimer) : new Date()}
              />
              <Box py={1} textAlign="center">
                <Stack justifyContent={'center'} direction="row" gap={1}>
                  <Typography variant="subtitle1">Total Amount</Typography>:
                  <Typography fontWeight={'500'} variant="subtitle1">
                    {amount.totalAmount}
                  </Typography>
                </Stack>

                <Stack justifyContent={'center'} direction="row" gap={1}>
                  <Typography variant="subtitle1">
                    Total released amount
                  </Typography>
                  :
                  <Typography fontWeight={'500'} variant="subtitle1">
                    {amount.releasedAmount}
                  </Typography>
                </Stack>

                <Stack justifyContent={'center'} direction="row" gap={1}>
                  <Typography variant="subtitle1">
                    {' '}
                    Available amount to claim
                  </Typography>
                  :
                  <Typography fontWeight={'500'} variant="subtitle1">
                    {amount.availableAmount}
                  </Typography>
                </Stack>
              </Box>
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
