import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage, http } from 'wagmi';
import { polygon } from 'wagmi/chains';
export const projectId = 'fbd704f18d2cb8bfe2eeb165ccbbfa36';

if (!projectId) throw new Error('Project ID is not defined');

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Floyx',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export const wagmiConfig = defaultWagmiConfig({
  chains: [polygon], // required
  projectId, // required
  metadata, // required
  ssr: true,
  transports: {
    [polygon.id]: http(),
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default
});
