/* eslint-disable camelcase */
// @ts-nocheck
'use client';
import React, { useState, useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import Web3 from 'web3';
import { publicProvider } from 'wagmi/providers/public';
import { FloyxStakingAddress, chainID } from '@/constants/Addresses';
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
} from '@mui/material';
import Image from 'next/image';
import WalletPanelImage from '@/assets/wallet-panal.png';
import ReusableModal from './_components/modal';
import WalletConnectIcon from '@/iconComponents/walletConnectIcon';
import MetaMaskIcon from '@/assets/images/metaMask.png';
import { useRouter } from 'next/navigation';
import Counter from './_components/CountdownTimer';
import { useAccount } from 'wagmi';
const NonLoggedinWalletModal = ({ onClick }: { onClick: () => void }) => {
  return (
    <Box textAlign="center">
      <Image
        src={WalletPanelImage}
        height="200px"
        width="300px"
        alt="Wallet panel"
      />
      <Button variant="text" onClick={onClick}>
        Log in to your wallet to check the details
      </Button>
    </Box>
  );
};

const updatedtokenPanel = props => {
  const [modalType, setModal] = useState('FIRST');
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [web3Library, setWeb3Library] = useState('');
  const [web3Account, setWeb3Account] = useState('');
  const toast = useToast();
  const theme = useTheme();
  const { address, isConnecting, isDisconnected } = useAccount();

  if (isConnecting) return <div>Connecting…</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return <div>{address}</div>;

  const connectMetamask = async () => {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      console.log('value of chainId', parseInt(chainId));

      // change chainId to 37
      if (parseInt(chainId) == chainID) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        window.location.reload(true);
      } else {
        toast.error('Please connect to polygon Network');
      }
    } catch (ex) {
      toast.error('Oops! An error occurred.');
      console.log(ex);
    }
  };

  // functions

  function getProvider(web3library_) {
    const { provider } = web3library_;
    const web3 = new Web3(provider);
    return web3;
  }

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
      const vestingContract = getVestingContract(library, account);

      // Fetching oneMonth and timePeriod from the contract
      let oneMonth =
        parseInt(await vestingContract.getSlicePeriod(account, 0, overrides)) *
        1000;
      let timePeriod =
        parseInt(
          await vestingContract.getStartTimePeriod(account, 0, overrides)
        ) * 1000;

      // Set lock timer to zero if timePeriod is zero
      if (timePeriod === 0) {
        setLockTimer(0);
        return;
      }

      // Calculate the next lock period
      let lockPeriod = timePeriod;
      while (Date.now() > lockPeriod) {
        lockPeriod += oneMonth;
      }
      setLockTimer(lockPeriod);
    } catch (e) {
      toast.error('Oops! An error occurred.');
      console.error(e); // More descriptive error logging
    }
  }

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

  /* AIRDROP SHEDULES */

  async function getAirdropRewardAmount(
    _FloyxVestingContract,
    _address,
    _web3library
  ) {
    const rewardAmount = await _FloyxVestingContract.getClaimableAmount(
      _address,
      11,
      overrides
    );
    const web3 = getProvider(_web3library);
    const balanceConverted = web3.utils.fromWei(
      rewardAmount.toString(),
      'ether'
    );
    setfloyxAirdropClaimableAmount(balanceConverted);
  }

  async function functotalAirdropAmountAvaialble(
    _FloyxVestingContract,
    _address,
    _web3library
  ) {
    const amountTotal = await _FloyxVestingContract.getTototalSheduleAmount(
      _address,
      11,
      overrides
    );
    const web3 = getProvider(_web3library);
    const balanceConverted = web3.utils.fromWei(
      amountTotal.toString(),
      'ether'
    );
    setfloyxAridropTotalAmount(balanceConverted);
  }

  async function functotalAirdropReleasedAmount(
    _FloyxVestingContract,
    _address,
    _web3library
  ) {
    const amountTotal = await _FloyxVestingContract.getReleasedAmount(
      _address,
      11,
      overrides
    );
    const web3 = getProvider(_web3library);
    const balanceConverted = web3.utils.fromWei(
      amountTotal.toString(),
      'ether'
    );
    setfloyxAirdropReleasedAmount(balanceConverted);
  }

  async function claimAirdropReward() {
    const web3 = getProvider(web3Library);
    const NewFloyxContract = getNewFloyxContract(web3Library, web3Account);
    const FloyxVestingContract = getVestingContract(web3Library, web3Account);

    // claimTokens
    try {
      const sampleVariable = await FloyxVestingContract.claimVestedToken(
        web3Account,
        11
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
            if (floyxAirdropClaimableAmount == 0) {
              toast.error('Claim Not Allowed!');
              return;
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

  async function setAirdropTimerFunction(library, account) {
    try {
      const vestingContract = getVestingContract(library, account);
      let oneMonth = await vestingContract.getSlicePeriod(
        account,
        11,
        overrides
      );
      oneMonth = parseInt(oneMonth) * 1000;

      let timePeriod = await vestingContract.getStartTimePeriod(
        account,
        11,
        overrides
      );
      timePeriod = parseInt(timePeriod) * 1000;

      if (timePeriod === 0) {
        setAirdropLockTimer(0);
      } else {
        let lockPeriod = timePeriod;
        while (Date.now() > lockPeriod) {
          lockPeriod = lockPeriod + oneMonth;
        }
        setAirdropLockTimer(lockPeriod);
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

  const connectWaletConnect = async () => {
    try {
      const RPC_URLS = {
        // 1: process.env.REACT_APP_INFURA,
        137: 'https://polygon-rpc.com',
      };

      const provider = new WalletConnectProvider({
        rpc: {
          // 1: RPC_URLS[1],
          137: RPC_URLS[137],
        },

        qrcode: true,
        pollingInterval: 15000,
        chainId: chainID,
      });

      const accounts = await provider.enable();
      const account = accounts[0];
      const library = new Web3Provider(provider, 'any');
      const currentChainId = provider.signer.connection.chainId;

      if (currentChainId != chainID) {
        toast.error('Please Connect to polygon network');
        return;
      }

      console.log('Value of provider:::');
      setWeb3Library(library);
      setWeb3Account(account);
      setIsLogged(account);
      ConnectToContract(library, account);
    } catch (ex) {
      toast.error('Oops! An error occurred.');
      console.log(ex);
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

  const getActionButtons = () => {
    switch (modalType) {
      case 'STACKING':
        return (
          <Button onClick={claimStakingReward} variant="contained">
            Claim Floyx
          </Button>
        );
        break;
      case 'SEEDVESTING':
        return (
          <Button onClick={claimReward} variant="contained">
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

  return (
    <Box width={'100%'}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.common.white
              : theme.palette.common.black,
          height: '60px',
          padding: '5px 16px',
        }}
      >
        <Stack direction="row" justifyContent={'space-between'}>
          <FloyxImage
            fill={
              theme.palette.mode !== 'dark'
                ? theme.palette.common.white
                : theme.palette.common.black
            }
          />
          <Stack direction={'row'} gap={1}>
            <Button
              onClick={() => setModal('STACKING')}
              variant={modalType === 'STACKING' ? 'outlined' : 'text'}
            >
              STACKING PREVIEW
            </Button>
            <Button
              onClick={() => setModal('SEEDVESTING')}
              variant={modalType === 'SEEDVESTING' ? 'outlined' : 'text'}
            >
              SEEDVESTING
            </Button>
            <Button
              onClick={() => setModal('PRESALEVESTING')}
              variant={modalType === 'PRESALEVESTING' ? 'outlined' : 'text'}
            >
              PRESALEVESTING
            </Button>
            <Button
              onClick={() => setModal('AIRDROP')}
              variant={modalType === 'AIRDROP' ? 'outlined' : 'text'}
            >
              AIRDROP
            </Button>
          </Stack>

          <Box sx={{ flexGrow: 0 }}>
            <Button onClick={connectWaletConnect} variant="contained">
              Connect Wallet
            </Button>
          </Box>
        </Stack>
      </AppBar>
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
          {modalType == 'CONNECT' && (
            <Box p={1} sx={{ height: '300px' }}>
              <Box p={1} gap={1}>
                <Typography
                  sx={{ color: '#000' }}
                  textAlign="center"
                  variant="h3"
                >
                  Connect Wallet
                </Typography>
                <Typography color={'textPrimary'} variant="subtitle2">
                  Please Connect your wallet to continue. The system supports
                  the following wallets.
                </Typography>
              </Box>
              <Stack gap={2}>
                <Button startIcon={<WalletConnectIcon />} variant="contained">
                  Wallet Connect
                </Button>
                <Button
                  startIcon={
                    <Image
                      src={MetaMaskIcon}
                      alt="metamask"
                      height={'20px'}
                      width="20px"
                    />
                  }
                  variant="contained"
                  onClick={connectMetamask}
                >
                  Metamask
                </Button>
              </Stack>
            </Box>
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
              <Counter targetDate={new Date()} />
              <Box py={1}>
                <Typography variant="subtitle1">Total Amount</Typography>
                <Typography variant="subtitle1">
                  Total released amount
                </Typography>
                <Typography variant="subtitle1">
                  Available amount to claim
                </Typography>
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
