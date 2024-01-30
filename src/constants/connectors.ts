// @ts-nocheck
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const RPC_URLS = {
  4: 'https://rinkeby.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4',
};

//metamask
export const injected = new InjectedConnector({
  supportedChainIds: [4],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    4: RPC_URLS[4],
  },
  qrcode: true,
  pollingInterval: 15000 as any,
});

export function resetWalletConnector(connector) {
  if (connector && connector instanceof WalletConnectConnector) {
    connector.walletConnectProvider = undefined;
  }
}

//coinbase
export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[4],
  appName: 'demo-app',
  supportedChainIds: [4],
});
