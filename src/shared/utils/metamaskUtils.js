import { isMobile } from "web3modal";
import Web3 from "web3";
import { chainList } from "../../_configs";

export const addTokenToMetamask = async (
  { tokenAddress, tokenSymbol, tokenDecimals, tokenImage },
  callback
) => {
  try {
    const wasAdded = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress, // The address that the token is at.
          symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: tokenDecimals, // The number of decimals in the token
          image: tokenImage, // A string url of the token logo
        },
      },
    });

    if (wasAdded) {
      callback({
        status: "ADD_TOKEN_SUCCESS",
        data: wasAdded,
      });
      console.log("Thanks for your interest!");
    } else {
      callback({
        status: "ADD_TOKEN_FAILS",
        data: wasAdded,
      });
      console.log("Your loss!");
    }
  } catch (error) {
    callback({
      status: "ADD_TOKEN_FAILS",
      data: null,
    });
    console.log(error);
  }
};




export const switchNetWork = async (chainId) => {
  if(!window.ethereum) return;
 
  try {
     await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params : [{ chainId: Web3.utils.toHex(chainId) }],
    });
 
  } catch (switchError) {
    try {
      if (isMobile()) {
        const errorCode = switchError.data?.originalError?.code
        if (errorCode && errorCode === 4902) {
        
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              chainList[chainId]
            ],
          });
        }
        
      } else {
        if (switchError.code == 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              chainList[chainId]
            ],
          });
        }
      }
    } catch (error) {
      // alert(JSON.stringify(error))
      console.log(error);
    }
    
  }
};