import { Contract } from '@ethersproject/contracts';
import { Floyx_TokenVesting_Address } from './Addresses';
import { vestingContractabi } from './VestingContract_abi';

export const getVestingContract = (library, account) => {
    const signer = library.getSigner(account).connectUnchecked();
    var contract = new Contract(Floyx_TokenVesting_Address, vestingContractabi, signer);
    return contract;
};
