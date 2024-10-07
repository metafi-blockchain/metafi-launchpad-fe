import { defaultChainId } from '../../_configs';
import { RequestError } from './RequestError';

const BatchItem ={}

export class MiniRpcProvider {
  isMetaMask = false;
  chainId = defaultChainId;

  url = "";

  host = "";

  path = "";

  batchWaitTimeMs;

  nextId = 1;

  batchTimeoutId = null;

  batch = [];

  constructor(chainId, url, batchWaitTimeMs) {

    // console.log("url===>", url);
    this.chainId = chainId;
    this.url = url;
    const parsed = new URL(url);
    this.host = parsed.host;
    this.path = parsed.pathname;
    // how long to wait to batch calls
    this.batchWaitTimeMs = batchWaitTimeMs ?? 50;
  }

  clearBatch = async () => {
    console.info('Clearing batch', this.batch);
    const { batch } = this;
    this.batch = [];
    this.batchTimeoutId = null;
    let response;
    try {
      response = await fetch(this.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(batch.map(item => item.request)),
      });
    } catch (error) {
      batch.forEach(({ reject }) => reject(new Error('Failed to send batch call')));
      return;
    }

    if (!response.ok) {
      batch.forEach(({ reject }) =>
        reject(new RequestError(`${response.status}: ${response.statusText}`, -32000)),
      );
      return;
    }

    let json;
    try {
      json = await response.json();
    } catch (error) {
      batch.forEach(({ reject }) => reject(new Error('Failed to parse JSON response')));
      return;
    }
    // eslint-disable-next-line no-mixed-operators
    const byKey = batch.reduce < { [defaultChainId]: BatchItem } > ((memo, current) => {
      memo[current.request.id] = current;
      return memo;
    }, {});
    // eslint-disable-next-line no-restricted-syntax
    for (const result of json) {
      const {
        resolve,
        reject,
        request: { method },
      } = byKey[result.id];
      if (resolve) {
        if ('error' in result) {
          reject(
            new RequestError(result?.error?.message, result?.error?.code, result?.error?.data),
          );
        } else if ('result' in result) {
          resolve(result.result);
        } else {
          reject(
            new RequestError(
              `Received unexpected JSON-RPC response to ${method} request.`,
              -32000,
              result,
            ),
          );
        }
      }
    }
  };

  sendAsync = (request, callback,) => {
    this.request(request.method, request.params)
      .then(result => callback(null, { jsonrpc: '2.0', id: request.id, result }))
      .catch(error => callback(error, null));
  };

  request = async (
    method,
    params,
  ) => {
    if (typeof method !== 'string') {
      return this.request(method.method, method.params);
    }
    if (method === 'eth_chainId') {
      return `0x${this.chainId.toString(16)}`;
    }
    const promise = new Promise((resolve, reject) => {
      this.batch.push({
        request: {
          jsonrpc: '2.0',
          id: this.nextId++,
          method,
          params,
        },
        resolve,
        reject,
      });
    });
    this.batchTimeoutId = this.batchTimeoutId ?? setTimeout(this.clearBatch, this.batchWaitTimeMs);
    return promise;
  };
}
