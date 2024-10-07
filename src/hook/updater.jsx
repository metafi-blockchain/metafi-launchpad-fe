import { useWeb3React } from "@web3-react/core"
import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { ACTION_CONST } from "../constants"
import useDebounce from "./useDebounce"
import { useLatestBlockNumber, useWeb3Utils } from "./useState"
// import { useChainIdNetwork } from "./useState"



export default function AppUpdater() {

    const dispatch = useDispatch()
    const { chainId, library, account } = useWeb3React()

    const [state, setState] = useState({
        chainId,
        blockNumber: null,
    })

    const blockNumberCallback = useCallback(
        (blockNumber) => {


            setState((s) => {
                if (chainId === s.chainId) {
                    if (typeof s.blockNumber !== 'number') return { chainId, blockNumber }
                    return { chainId, blockNumber: Math.max(blockNumber, s.blockNumber) }
                }
                return s
            })
        },
        [chainId, setState]
    )

    // attach/detach listeners
    useEffect(() => {
        if (!library || !chainId) return undefined

        setState({ chainId, blockNumber: null })
        library
            .getBlockNumber()
            .then(blockNumberCallback)
            .catch((error) => console.error(`Failed to get block number for chainId: ${chainId}`, error))

        library.on('block', blockNumberCallback)
        return () => {
            library.removeListener('block', blockNumberCallback)
        }
    }, [dispatch, chainId, library, blockNumberCallback])

    const debouncedState = useDebounce(state, 1000)

    useEffect(() => {
        if (!debouncedState.chainId || !debouncedState.blockNumber) return

        console.log("BlockNumber latest:", debouncedState.blockNumber);
        dispatch({ type: ACTION_CONST.SET_LATEST_BLOCK, data:debouncedState.blockNumber })
        // dispatch(setLastBlockNumber(debouncedState.blockNumber))
    }, [dispatch, debouncedState.blockNumber, debouncedState.chainId])


    // const web3Utils = useWeb3Utils();
    // const latestBlock = useLatestBlockNumber()

    // useEffect(() => {
    //     if (web3Utils && account && chainId) {
    //     //   get stake amount
    //       web3Utils.getStakingInfoWallet(chainId).then(data => {
    //         dispatch({ type: ACTION_CONST.GET_STAKING_WALLET_INFO, data: data })
    //       });
    //     }
    //   }, [web3Utils, account, dispatch, latestBlock, chainId])


    return null
}
