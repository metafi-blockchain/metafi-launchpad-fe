import { NoBscProviderError } from '@binance-chain/bsc-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { bscConnector, injected } from '../library/connectors';
import { connectorLocalStorageKey, ConnectorNames } from '../library/literals';
import { MESSAGES } from '../constants';
import {  defaultChainId } from '../_configs';
import { AddChainToMetaMask, switchNetWork } from '../shared/utils/metamaskUtils';

function useAuth() {
  const { activate, deactivate } = useWeb3React();
  const connectorsByName = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.BSC]: bscConnector,
  };

  const login = useCallback((connectorID) => {
    const connector = connectorsByName[connectorID];
    if (connector) {
      try {
        activate(connector, async (error) => {
          window.localStorage.removeItem(connectorLocalStorageKey);
          if (error instanceof UnsupportedChainIdError) {
            toast.warn(MESSAGES.WRONG_NET_WORK[defaultChainId]);
            await  switchNetWork(defaultChainId);
          } else if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
            toast.error('No provider was found');
          } else if (error instanceof UserRejectedRequestErrorInjected) {
            toast.error('Please authorize to access your account');
          } else {
            toast.error(error.message);
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          }
        });
      } catch (error) {
        console.log(error);
      }

    } else {
      toast.error('The connector config is wrong');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { login, logout: deactivate };
}

export default useAuth;
