
import { Contract } from '@ethersproject/contracts'
import { getContract } from '../utils'
import ERC20_ABI from '../contracts/erc20.abi.json'
const { useActiveWeb3React } = require(".")

export function useContract(address, ABI, withSignerIfPossible ) {
    const { library, account } = useActiveWeb3React()
  
    return useMemo(() => {
      if (!address || !ABI || !library) return null
      try {
        return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
      } catch (error) {
        console.error('Failed to get contract', error)
        return null
      }
    }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(tokenAddress, withSignerIfPossible) {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

// account is optional
export function getContract(address, ABI, library, account){
    if (!isAddress(address) || address === AddressZero) {
      throw Error(`Invalid 'address' parameter '${address}'.`)
    }
  
    return new Contract(address, ABI, getProviderOrSigner(library, account) )
  }
  
// account is not optional
export function getSigner(library, account){
    return library.getSigner(account).connectUnchecked()
  }
  
  // account is optional
  export function getProviderOrSigner(library, account){
    return account ? getSigner(library, account) : library
  }
  