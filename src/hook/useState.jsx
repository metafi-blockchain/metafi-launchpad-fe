import { useSelector } from "react-redux"
import { get } from "lodash";
import { STATE } from "../constants";

export const useOpeningProjects = () => {

    return useSelector((state) => get(state, "project.openingProjects", []));
}

export const useComingSoonProjects = () => {
    return useSelector((state) => get(state, "project.waitingProjects", []));
}

export const useCloseProjects = () => {
    return useSelector((state) => get(state, "project.closedProjects", []));
}


export const useLatestBlockNumber = () => {
    return useSelector((state) => get(state, "utils.latestBlock", 0))
}


export const useChainIdNetwork = () => {
    return useSelector(state => get(state, "utils.chainId", null))
}

export const useWeb3Utils = () => {
    return useSelector((state) => get(state, "utils.walletUtils", null));
}

export const useConnectWallet = () => {
    return useSelector((state) => get(state, "utils.isConnectWallet", false));
}

export const useStakingInfo = () => {
    return useSelector((state) => get(state, "wallet.stakingInfo", {}))
}

export const useStakingWalletInfo = () => {
    return useSelector((state) => get(state, "wallet.stakingWalletInfo", {}));
}

export const useEthBalance = () => {
    return useSelector((state) => get(state, "wallet.ethBalance", 0));
}

export const useADAPADBalance = () => {
    return useSelector((state) => get(state, "wallet.adapadBalance", 0));
}

export const useWaitingModal = () => {
    const state = useSelector((state) => get(state, "utils.statusRequest", 'none'));
    return state === STATE.SUBMIT
}

export const useErrorModal = () => {
    const state = useSelector((state) => get(state, "utils.statusRequest", 'none'));
    return state === STATE.ERROR
}

export const useSuccessModal = () => {
    const state = useSelector((state) => get(state, "utils.statusRequest", 'none'));
    return state === STATE.SUCCESS
}

export const useMessage = () => {
    return useSelector((state) => get(state, "utils.message", ''));
}

export const useTransactionHash = () => {
    return useSelector((state) => get(state, "utils.transactionHash", ''));
}

export const useRewardTokenAddress = () => {
    return useSelector((state) => get(state, "wallet.stakingWalletInfo.rewardTokenAddress", '0x0000000000000000000000000000000000000000'));
}


export const useKycStatus = () => {
    return useSelector((state) => get(state, "wallet.kycStatus", null));
}

export const useStakeAmount = () => {
    return useSelector((state) => get(state, "wallet.stakingWalletInfo.stakedAmount", 0));
}

export const useNativeCoin = (chainId) => {
    if (chainId === 3 || chainId === 1) {
        return "ETH"
    }
    if (chainId === 56 || chainId === 97) {
        return "BNB"
    }if (chainId === 56 || chainId === 97) {
        return "BNB"
    }

    return "ETH"
}




export const useSelectedProject = () => {
    return useSelector((state) =>
        get(state, "project.selectedProject", null)
    );
}

export const useInfoRound = () => {
    return useSelector((state) =>
        get(state, "project.selectedProject.infoRound", [])
    );
}

export const useProjectName = () => {
    return useSelector((state) =>
        get(state, "project.selectedProject.name", "")
    );
}

export const useProjectSymbol = () => {
    return useSelector((state) =>
        get(state, "project.selectedProject.symbol", "")
    );
}


export const useIsConnected = () => {
    return useSelector((state) =>
        get(state, "utils.isConnectWallet", false)
    );
}

export const useBlockingUI = () => {
    return useSelector((state) =>
        get(state, "utils.blocking", false)
    );
}


export const useShowModalHelp = () =>{
    return useSelector((state) =>
    get(state, "utils.showModalHelp", false)
  );
}

export const usePadTokenBalance = () =>{
    return   useSelector((state) => get(state, "wallet.bscPadTokenBalance", 0));  
}