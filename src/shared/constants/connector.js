import {
    isMetamaskAvailable,
    isBinanceExtensionAvailable,
    isTrustWalletAvailable,
} from "../utils/utils";

import {  ConnectorNames } from '../component/literals';
export const connectors = [
    {
        title: 'Metamask',
        icon: '/images/metamask.svg',
        connectorId: ConnectorNames.Injected,
        enable: isMetamaskAvailable()
    },
    {
        title: 'TrustWallet',
        icon: '/images/trust.svg',
        connectorId: ConnectorNames.Injected,
        enable: isTrustWalletAvailable()
    },
    {
        title: 'Binance Chain Wallet',
        icon: '/images/bscwallet.svg',
        connectorId: ConnectorNames.BSC,
        enable: isBinanceExtensionAvailable()
    }
];