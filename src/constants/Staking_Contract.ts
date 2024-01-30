import { Contract } from '@ethersproject/contracts';
import { FloyxStakingAddress } from './Addresses';
import { stakingContractabi } from './Staking_abi';

export const getStakingContract = (library, account) => {
    const signer = library.getSigner(account).connectUnchecked();
    var contract = new Contract(FloyxStakingAddress, stakingContractabi, signer);
    return contract;
};
