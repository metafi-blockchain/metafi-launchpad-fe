import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { defaultChainId } from '../../_configs';
import { useEagerConnect, useInactiveListener } from '../../hook';
import NetworkConnector from '../connectors/NetworkConnector';
import { NETWORK_URL, NetworkContextName } from '../literals';

export default function Web3ReactManager({ children }) {
  const { active } = useWeb3React();
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork,
  } = useWeb3React(NetworkContextName);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const network = new NetworkConnector({
    urls: { [defaultChainId]: NETWORK_URL },
  });
  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
  useEffect(() => {
    if (triedEager && !networkActive && !networkError && !active) {
      activateNetwork(network);
    }
  }, [triedEager, networkActive, networkError, activateNetwork, active, network]);

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager);

  // handle delayed loader state
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(true);
    }, 600);
    console.log(showLoader)
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) {
    return null;
  }

  return children;
}
