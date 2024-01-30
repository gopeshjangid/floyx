import { Contract } from '@ethersproject/contracts';
import { contractNewFloyxAbi } from './New_Floyx_Token_abi';
import { New_Floyx_Token_Address } from './Addresses';

export const getNewFloyxContract = (library, account) => {
    const signer = library.getSigner(account).connectUnchecked();
    var contract = new Contract(New_Floyx_Token_Address, contractNewFloyxAbi, signer);
    return contract;
};
