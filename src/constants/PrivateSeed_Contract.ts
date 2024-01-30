import { Contract } from '@ethersproject/contracts';
import { FloyxPrivateSeedClaimer } from './Addresses';
import { privateSeedContractabi } from './PrivateSeed_abi';

export const getPrivateSeedContract = (library, account) => {
    const signer = library.getSigner(account).connectUnchecked();
    var contract = new Contract(FloyxPrivateSeedClaimer, privateSeedContractabi, signer);
    return contract;
};
