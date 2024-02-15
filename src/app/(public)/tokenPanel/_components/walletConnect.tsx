import { useConnect, useProvider, useDisconnect, chain } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

// Add your WalletConnect Cloud Project ID here
const projectId = 'YOUR_PROJECT_ID';

const useWallet = () => {
  const { connect, connectors, activeConnector } = useConnect();
  const { provider } = useProvider();
  const { disconnect } = useDisconnect();

  const handleWalletConnect = async () => {
    // Create the WalletConnect connector instance
    const walletConnect = new WalletConnectConnector({
      chains: [chain.polygon], // Specify supported chains
      options: {
        projectId,
        qrcode: true,
      },
    });

    // Connect using Wagmi's connect function
    try {
      await connect(walletConnect);
    } catch (error) {
      console.error('WalletConnect connection error:', error);
      // Handle errors appropriately, e.g., display them to the user
    }
  };

  // Use the provider, disconnect function, and other Wagmi utilities as needed
  if (provider) {
    // Use provider for Web3 interactions
    // ...
  }

  // Optionally, add a disconnect button
  const handleDisconnect = async () => {
    if (activeConnector) {
      await disconnect();
    }
  };
};

export default useWallet;
