
import { defaultChainId, NODE_URI } from "../../_configs";


export const STATUS = {
    IDLE: 'idle',
    RUNNING: 'running',
    READY: 'ready',
    SUCCESS: 'success',
    ERROR: 'error',
};
export const connectorLocalStorageKey = 'connectorId';

export const ConnectorNames = {
    Injected: 'injected',
    BSC: 'bsc',
    WalletConnect: 'WalletConnect',
}
export const NETWORK_URL = NODE_URI[defaultChainId]
export const NetworkContextName = 'NETWORK';