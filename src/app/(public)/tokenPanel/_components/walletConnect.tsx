import { Chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Web3ModalProvider } from '@web3modal/wagmi';
import { useAccount, useConnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi';

// Set up chains
const { chains, provider } = configureChains(
  [Chain.mainnet, Chain.polygon],
  [publicProvider()]
);

// Create a Wagmi client
const wagmiClient = createClient({
  autoConnect: true,
  provider,
});

// Create a React Query client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <Web3ModalProvider>
          <Component {...pageProps} />
        </Web3ModalProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default function ConnectWallet() {
  const { connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect, openModal } = useWeb3Modal();

  if (isConnected) {
    return (
      <div>
        <p>Connected to {address}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return <button onClick={() => openModal()}>Connect Wallet</button>;
}
