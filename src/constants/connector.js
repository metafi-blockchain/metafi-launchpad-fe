import {
    isMetamaskAvailable,
    isTrustWalletAvailable
} from "../shared/utils/utils";

import { ConnectorNames } from '../library/literals';
export const connectors = [{
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
    }
];