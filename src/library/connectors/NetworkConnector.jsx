import { AbstractConnector } from '@web3-react/abstract-connector';
import invariant from 'tiny-invariant';

import { MiniRpcProvider } from './MiniRpcProvider';


export class NetworkConnector extends AbstractConnector {
  providers = [];

  currentChainId;

  
  constructor({ urls, defaultChainId }) {
    invariant(
      defaultChainId || Object.keys(urls).length === 1,
      'defaultChainId is a required argument with >1 url',
    );
   
    super({ supportedChainIds: Object.keys(urls).map((k) => Number(k)) });

    this.currentChainId = defaultChainId || Number(Object.keys(urls)[0]);
    this.providers = Object.keys(urls).reduce(
      (accumulator, chainId) => {
        accumulator[Number(chainId)] = new MiniRpcProvider(Number(chainId), urls[Number(chainId)]);
        return accumulator;
      },
      {},
    );
  }

  provider() {
    return this.providers[this.currentChainId];
  }

  async activate(){
    return {
      provider: this.providers[this.currentChainId],
      chainId: this.currentChainId,
      account: null,
    };
  }

  async getProvider() {
    return this.providers[this.currentChainId];
  }

  async getChainId(){
    return this.currentChainId;
  }

   async getAccount() {
    return null;
  }

  deactivate() {
    return null;
  }
}

export default NetworkConnector;
