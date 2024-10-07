import { BscConnector } from '@binance-chain/bsc-connector';
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { chainIdsSupport, defaultChainId } from '../../_configs';
// import { WalletLinkConnector } from '@web3-react/walletlink-connector';

import { ConnectorNames, NETWORK_URL } from '../literals';

import { NetworkConnector } from './NetworkConnector';


if (typeof NETWORK_URL === 'undefined') {
  throw new Error('REACT_APP_NETWORK_URL must be a defined environment variable');
}
export const network = new NetworkConnector({
  urls: { [defaultChainId]: NETWORK_URL }, 
  defaultChainId : defaultChainId
});



let networkLibrary;
export function getNetworkLibrary() {
  // eslint-disable-next-line no-return-assign
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider));
}

export const injected = new InjectedConnector({
  supportedChainIds: chainIdsSupport,
});

export const bscConnector = new BscConnector({ supportedChainIds: [56] });

// // mainnet only
export const walletConnect = new WalletConnectConnector({
  rpc: { [defaultChainId]: NETWORK_URL },
  qrcode: true,
  pollingInterval: 15000,
});


export const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.BSC]: bscConnector,
  [ConnectorNames.WalletConnect]: walletConnect,
};
