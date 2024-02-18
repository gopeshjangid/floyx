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
import { stakingContractabi } from '@/constants/Staking_abi';
import { privateSeedContractabi } from '/constants/PrivateSeed_abi';
import {
  vestingContractabi,
  newTokenABI,
} from '@/constants/VestingContract_abi';
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
  const [web3Account, setWeb3Account] = useState('');
  const toast = useToast();
  const [claimResult, setClaimResult] = useState({
    status: '',
    error: '',
    result: '',
  });
  const theme = useTheme();

  const result = useReadContract({
    abi: stakingContractabi,
    address: FloyxStakingAddress,
    functionName: 'getStakedAmount',
    args: [address],
  });

  const { data: vestingStartTime } = useReadContract({
    abi: vestingContractabi,
    address: Floyx_TokenVesting_Address,
    functionName: 'getStartTimePeriod',
    args: [address, '0'],
  });

  const { data: oneMonth } = useReadContract({
    abi: vestingContractabi,
    address: Floyx_TokenVesting_Address,
    functionName: 'getSlicePeriod',
    args: [address, '0'],
  });

  const { data: vestingScheduledAmount } = useReadContract({
    abi: vestingContractabi,
    address: Floyx_TokenVesting_Address,
    functionName: 'getTototalSheduleAmount',
    args: [address, '0'],
  });

  const { data: vestingClaimableAmount } = useReadContract({
    abi: vestingContractabi,
    address: Floyx_TokenVesting_Address,
    functionName: 'getClaimableAmount',
    args: [address, '0'],
  });

  const { data: vestingReleasedAmount } = useReadContract({
    abi: vestingContractabi,
    address: Floyx_TokenVesting_Address,
    functionName: 'getReleasedAmount',
    args: [address, '0'],
  });

  const {
    writeContract,
    data: vestingClaimed,
    error: vestingClaimError,
    isPending: vestingClaimIsPending,
    status: vestingClaimStatus,
  } = useWriteContract();

  console.log(
    'vestingClaimed => ',
    vestingClaimed,
    'status =>',
    vestingClaimStatus,
    'vestingClaimError =>',
    vestingClaimError
  );

  const formatWeiTOEather = weiValue => {
    return ethers.formatEther(weiValue);
  };

  useEffect(() => {
    setClaimResult({});
  }, [vestingClaimStatus, vestingClaimError]);

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
      setModal('STACKING');
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

  async function fetchStakedAmount(
    _FloyxStakingContract,
    _address,
    _web3library
  ) {
    try {
      const amountTotal = await _FloyxStakingContract.getStakedAmount(
        _address,
        overrides
      );
      const web3 = getProvider(_web3library);
      const balanceConverted = web3.utils.fromWei(
        amountTotal.toString(),
        'ether'
      );
      setfloxStakedAmount(balanceConverted);
    } catch (e) {
      console.error('Error in fetchStakedAmount:', e);
    }
  }

  async function fetchRewardAmount(
    _FloyxStakingContract,
    _address,
    _web3library
  ) {
    try {
      const amountTotal = await _FloyxStakingContract.getUserRewardAmount(
        _address,
        overrides
      );
      const web3 = getProvider(_web3library);
      const balanceConverted = web3.utils.fromWei(
        amountTotal.toString(),
        'ether'
      );
      setfloyxRewardAmount(balanceConverted);
    } catch (e) {
      console.error('Error in fetchRewardAmount:', e);
    }
  }

  async function setStakeTimer(library, account) {
    try {
      const myStakingContract = getStakingContract(library, account);
      let timePeriod =
        parseInt(
          await myStakingContract.getStakingEndTime(account, overrides)
        ) * 1000;

      setStakeLockTimer(timePeriod > Date.now() ? timePeriod : 0);
    } catch (e) {
      toast.error('Oops! An error occurred.');
      console.error('Error in setStakeTimer:', e);
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

  async function setTimerForStake(library: any, account: string) {
    try {
      const myStakingContract = getStakingContract(library, account);
      let timePeriod = await myStakingContract.getStakingEndTime(
        account,
        overrides
      );

      timePeriod = parseInt(timePeriod) * 1000;

      const currentTime = Date.now();

      // Simplify the conditionals
      // If timePeriod is 0 or currentTime is past timePeriod, set stake lock timer to 0
      // Otherwise, set it to timePeriod
      const timerValue =
        timePeriod === 0 || currentTime > timePeriod ? 0 : timePeriod;
      setStakeLockTimer(timerValue);
    } catch (e) {
      toast.error('Oops! An error occurred while setting the stake timer.');
      console.error(e); // More descriptive console logging
    }
  }
  async function getRewardAmount(
    _FloyxVestingContract,
    _address,
    _web3library
  ) {
    const rewardAmount = await _FloyxVestingContract.getSeedClaimableAmount(
      _address,
      overrides
    );
    const web3 = getProvider(_web3library);
    const balanceConverted = web3.utils.fromWei(
      rewardAmount.toString(),
      'ether'
    );
    setfloxfloxClaimableAmount(balanceConverted);
  }

  async function functotalAmountAvaialble(
    _FloyxVestingContract,
    _address,
    _web3library
  ) {
    const amountTotal = await _FloyxVestingContract.getSeedTototalAmount(
      _address,
      overrides
    );
    const web3 = getProvider(_web3library);
    const balanceConverted = web3.utils.fromWei(
      amountTotal.toString(),
      'ether'
    );
    setfloyxTotalAmount(balanceConverted);
  }

  async function functotalReleasedAmount(
    _FloyxVestingContract,
    _address,
    _web3library
  ) {
    const amountTotal = await _FloyxVestingContract.getSeedReleasedAmount(
      _address,
      overrides
    );
    const web3 = getProvider(_web3library);
    const balanceConverted = web3.utils.fromWei(
      amountTotal.toString(),
      'ether'
    );
    setfloxReleasedAmount(balanceConverted);
  }

  async function claimReward() {
    const web3 = getProvider(web3Library);
    const NewFloyxContract = getNewFloyxContract(web3Library, web3Account);
    const FloxPrivateSeedContract = getPrivateSeedContract(
      web3Library,
      web3Account
    );
    if (floxClaimableAmount == 0) {
      toast.error('Claim Not Allowed!');
      return;
    }
    // claimTokens
    try {
      const sampleVariable = await FloxPrivateSeedContract.claimSeedVesting(
        web3Account,
        overrides
      );
      const hashValue = sampleVariable.hash.toString();

      if (sampleVariable !== null) {
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(hashValue, async (err, rec) => {
            if (rec) {
              const currentBalance = await NewFloyxContract.balanceOf(
                web3Account,
                overrides
              );
            } else {
              console.log(err);
            }
          });
          ``;
        }, 1000);
      }
    } catch (ex) {
      toast.error('Claim Not Allowed!');

      console.log('An error occour', ex);
    }
  }

  async function setTimerFunction(library: any, account: string) {
    try {
      // Fetching oneMonth and timePeriod from the contract
      let oneMonthTIme = parseInt(oneMonth) * 1000;
      console.log({ oneMonthTIme });
      let timePeriod = parseInt(vestingStartTime) * 1000;

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
  }, [vestingStartTime, address]);

  async function fetchStakedAmount(
    _FloyxStakingContract,
    _address,
    _web3library
  ) {
    try {
      const amountTotal = await _FloyxStakingContract.getStakedAmount(
        _address,
        overrides
      );
      const web3 = getProvider(_web3library);
      const balanceConverted = web3.utils.fromWei(
        amountTotal.toString(),
        'ether'
      );
      setfloxStakedAmount(balanceConverted);
    } catch (error) {
      console.error('Error fetching staked amount:', error);
      // Consider adding a notification for the user here if appropriate
    }
  }

  /* PRIVATESALE VESTING */
  async function getPrivateRewardAmount(
    _FloyxVestingContract,
    _address,
    _web3library
  ) {
    const rewardAmount = await _FloyxVestingContract.getPrivateClaimableAmount(
      _address,
      overrides
    );
    const web3 = getProvider(_web3library);
    const balanceConverted = web3.utils.fromWei(
      rewardAmount.toString(),
      'ether'
    );
    setfloyxPrivateClaimableAmount(balanceConverted);
  }

  async function functotalPrivateAmountAvaialble(
    _FloyxVestingContract,
    _address,
    _web3library
  ) {
    const amountTotal = await _FloyxVestingContract.getPrivateTototalAmount(
      _address,
      overrides
    );
    const web3 = getProvider(_web3library);
    const balanceConverted = web3.utils.fromWei(
      amountTotal.toString(),
      'ether'
    );
    setfloyxTotalPrivateAmount(balanceConverted);
  }

  async function functotalPrivateReleasedAmount(
    _FloyxVestingContract,
    _address,
    _web3library
  ) {
    const amountTotal = await _FloyxVestingContract.getPrivateReleasedAmount(
      _address,
      overrides
    );
    const web3 = getProvider(_web3library);
    const balanceConverted = web3.utils.fromWei(
      amountTotal.toString(),
      'ether'
    );
    setfloyxPrivateReleasedAmount(balanceConverted);
  }

  async function claimPrivateReward() {
    const web3 = getProvider(web3Library);
    const NewFloyxContract = getNewFloyxContract(web3Library, web3Account);
    const FloxPrivateSeedContract = getPrivateSeedContract(
      web3Library,
      web3Account
    );

    if (floyxPrivateClaimableAmount == 0) {
      toast.error('Claim Not Allowed!');
      return;
    }

    // claimTokens
    try {
      const sampleVariable = await FloxPrivateSeedContract.claimPrivateVesting(
        web3Account,
        overrides
      );
      const hashValue = sampleVariable.hash.toString();

      if (sampleVariable !== null) {
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(hashValue, async (err, rec) => {
            if (rec) {
              const currentBalance = await NewFloyxContract.balanceOf(
                web3Account,
                overrides
              );
            } else {
              console.log(err);
            }
          });
          ``;
        }, 1000);
      }
    } catch (ex) {
      toast.error('Claim Not Allowed!');

      console.log('An error occour', ex);
    }
  }

  async function setPrivateTimerFunction(library, account) {
    try {
      const vestingContract = getVestingContract(library, account);
      let oneMonth = await vestingContract.getSlicePeriod(
        account,
        1,
        overrides
      );
      oneMonth = parseInt(oneMonth) * 1000;

      let timePeriod = await vestingContract.getStartTimePeriod(
        account,
        1,
        overrides
      );
      timePeriod = parseInt(timePeriod) * 1000;

      let fistCliamTime = parseInt(1697414400) * 1000;
      let lockPeriod;
      if (Date.now() < fistCliamTime) {
        lockPeriod = fistCliamTime;
      } else {
        lockPeriod = timePeriod;
      }
      if (timePeriod === 0) {
        setPrivateLockTimer(0);
      } else {
        while (Date.now() > lockPeriod) {
          lockPeriod = lockPeriod + oneMonth;
        }
        setPrivateLockTimer(lockPeriod);
      }
    } catch (e) {
      toast.error('Oops! An error occurred.');
      console.log(e);
    }
  }

  const toggle = stake_period => {
    if (!stake_period) {
      setdropdownOpen(!dropdownOpen);
    } else {
      switch (stake_period) {
        case '180':
          setstake_periodTab(1);
          setStakePeriodInDays(stake_period);
          console.log(
            `Sorry, we are out of ${stake_period} ${stake_periodTab} ${currentStakePeriod}.`
          );
          break;
        case '60':
          setstake_periodTab(2);
          setStakePeriodInDays(stake_period);
          console.log(
            `Sorry, we are out of ${stake_period} ${stake_periodTab} ${currentStakePeriod}.`
          );
          break;
        case '90':
          setstake_periodTab(3);
          setStakePeriodInDays(stake_period);

          console.log(
            `Sorry, we are out of ${stake_period} ${stake_periodTab} ${currentStakePeriod}.`
          );
          break;
        default:
          console.log(
            `Sorry, we are out of default ${stake_period} ${stake_periodTab} ${currentStakePeriod}.`
          );
      }
    }
  };

  async function funcTogetRewardAmount(
    _FloyxStakingContract,
    _address,
    _web3library
  ) {
    const amountTotal = await _FloyxStakingContract.getUserRewardAmount(
      _address,
      overrides
    );
    const web3 = getProvider(_web3library);
    const balanceConverted = web3.utils.fromWei(
      amountTotal.toString(),
      'ether'
    );
    setfloyxRewardAmount(balanceConverted);
  }

  //
  const ConnectToContract = async (web3library, web3Account) => {
    //Token Contract
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });

    if (parseInt(chainId) != chainID) {
      toast.error('Please connect to polygon Network');
    }

    const FloyxVestingContract = getVestingContract(web3library, web3Account);
    const FloxPrivateSeedContract = getPrivateSeedContract(
      web3library,
      web3Account
    );
    const NewFloyxContract = getNewFloyxContract(web3library, web3Account);
    const stakingContract = await getStakingContract(web3library, web3Account);

    try {
      if (web3Account && parseInt(chainId) == chainID) {
        // Balance of Matic||Eth in user wallet
        //const { provider } = web3library;

        setTimerForStake(web3library, web3Account);
        setTimerFunction(web3library, web3Account);
        setPrivateTimerFunction(web3library, web3Account);
        setAirdropTimerFunction(web3library, web3Account);

        //Floyx Balance
        setFloyxbalanceOfUser(NewFloyxContract, web3Account, web3library);
        functotalAmountAvaialble(
          FloxPrivateSeedContract,
          web3Account,
          web3library
        );
        functotalPrivateAmountAvaialble(
          FloxPrivateSeedContract,
          web3Account,
          web3library
        );
        functotalAirdropAmountAvaialble(
          FloyxVestingContract,
          web3Account,
          web3library
        );
        functotalReleasedAmount(
          FloxPrivateSeedContract,
          web3Account,
          web3library
        );
        functotalPrivateReleasedAmount(
          FloxPrivateSeedContract,
          web3Account,
          web3library
        );
        functotalAirdropReleasedAmount(
          FloyxVestingContract,
          web3Account,
          web3library
        );

        getRewardAmount(FloxPrivateSeedContract, web3Account, web3library);
        getPrivateRewardAmount(
          FloxPrivateSeedContract,
          web3Account,
          web3library
        );
        getAirdropRewardAmount(FloyxVestingContract, web3Account, web3library);
        funcToGetStakedAmount(stakingContract, web3Account, web3library);
        funcTogetRewardAmount(stakingContract, web3Account, web3library);
      }
    } catch (ex) {
      toast.error(ex);
    }
  };

  async function claimStakingReward() {
    const web3 = getProvider(web3Library);
    const myFloyxTokenContract = getNewFloyxContract(web3Library, web3Account);
    const myStakingContract = getStakingContract(web3Library, web3Account);
    // claimTokens
    try {
      const sampleVariable = await myStakingContract.withdraw(web3Account);
      const hashValue = sampleVariable.hash.toString();

      if (sampleVariable !== null) {
        const interval = setInterval(() => {
          web3.eth.getTransactionReceipt(hashValue, async (err, rec) => {
            if (rec) {
              const currentBalance = await myFloyxTokenContract.balanceOf(
                web3Account,
                overrides
              );
            } else {
              console.log(err);
            }
          });
          ``;
        }, 1000);
      }
    } catch (ex) {
      toast.error('Claim Not Allowed!');

      console.log('An error occour', ex);
    }
  }

  const claimVesting = () => {
    // writeContract({
    //   abi: vestingContractabi,
    //   address: Floyx_TokenVesting_Address,
    //   functionName: 'claimVestedToken',
    //   args: [address, 0],
    // });

    writeContract({
      abi: stakingContractabi,
      address: FloyxStakingAddress,
      functionName: 'withdraw',
      args: [address],
    });
  };

  const claimStacking = () => {
    // writeContract({
    //   abi: vestingContractabi,
    //   address: Floyx_TokenVesting_Address,
    //   functionName: 'claimVestedToken',
    //   args: [address, 0],
    // });

    writeContract({
      abi: stakingContractabi,
      address: FloyxStakingAddress,
      functionName: 'withdraw',
      args: [address],
    });
  };

  const getActionButtons = () => {
    if (vestingClaimStatus === 'pending') {
      return <CircularProgress />;
    }

    // if (vestingClaimStatus === 'error') {
    //   return (
    //     <Box>
    //       <Alert variant="outlined" severity="error">
    //         Error Occured
    //       </Alert>
    //     </Box>
    //   );
    // }

    if (vestingClaimStatus === 'success') {
      return (
        <Box>
          <Alert variant="outlined" severity="success">
            Claimed!
          </Alert>
        </Box>
      );
    }
    switch (modalType) {
      case 'STACKING':
        return (
          <Button onClick={claimStacking} variant="contained">
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
      case 'AIRDROP':
        return (
          <Button onClick={claimAirdropReward} variant="contained">
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
      case 'STACKING':
        return (
          <Typography sx={{ color: '#000' }} textAlign="center" variant="h5">
            Next Stacking Claim Available In
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
      case 'AIRDROP':
        return (
          <Typography sx={{ color: '#000' }} textAlign="center" variant="h5">
            Next Airdrop Sale Vesting Claim Available In
          </Typography>
        );
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
          {['STACKING', 'SEEDVESTING', 'PRESALEVESTING', 'AIRDROP'].indexOf(
            modalType
          ) > -1 && (
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
