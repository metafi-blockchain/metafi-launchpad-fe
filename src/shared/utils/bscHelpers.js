import { BigNumber } from "bignumber.js";
import _ from "lodash";
import Web3 from "web3";
import { NODE_URI, STAKING_CONTRACT_ADDRESS, defaultChainId } from "../../_configs";
import stakingABIContract from "../../constants/abi/staking.json";

//get info from staking contract
export async function getStakingContractInfo() {
    const bscURI = NODE_URI[defaultChainId][_.random(0, NODE_URI[defaultChainId].length - 1)];
    const web3 = new Web3(bscURI);
    const stakingContract = new web3.eth.Contract(
        stakingABIContract,
        STAKING_CONTRACT_ADDRESS[defaultChainId]
    );

    try {
        const info = await stakingContract.methods.info().call();
        return {
            tokenAddr: info[0],
            tokenSymbol: info[1],
            tokenDecimals: Number(info[2]),
            stakerCount: Number(info[3]),
            totalStakedAmount: BigNumber(info[4]).dividedBy(10 ** 18).toString(),
            apyPercentage: Number(info[5]),
            unstakePeriod: Number(info[6]),
            isStakingPaused: info[7],
            totalRewardsDistributed: BigNumber(info[8])
                .dividedBy(10 ** 18)
                .toString(),
        };
    } catch (error) {
        console.log(error);
        return {
            tokenAddr: 0,
            tokenSymbol: 0,
            tokenDecimals: 0,
            stakerCount: 0,
            totalStakedAmount: 0,
            apyPercentage: 0,
            unstakePeriod: 0,
            isStakingPaused: 0,
            totalRewardsDistributed: 0,
        };
    }
}
