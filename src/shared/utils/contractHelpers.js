import { BigNumber } from "bignumber.js";
import _ from "lodash";
import Web3 from "web3";
import exactMath from "exact-math";
import { defaultChainId, NODE_URI, TOKEN_BLAST_ADDRESS } from "../../_configs";
import erc20Abi from "../../constants/abi/erc20.abi";
import AbiIDOContract from "../../constants/abi/ido.pulsepad.json";
let ethURI =
    NODE_URI[defaultChainId][_.random(0, NODE_URI[defaultChainId].length - 1)];
let web3;

export const getInfoContract = async(addresses) => {


    const info = {};
    // console.log("BSC_NODE_URL===>", BSC_NODE_URL)

    try {
        ethURI = NODE_URI[defaultChainId][_.random(0, NODE_URI[defaultChainId].length - 1)]
        web3 = new Web3(ethURI);
        
    } catch (error) {
        ethURI = NODE_URI[defaultChainId][_.random(0, NODE_URI[defaultChainId].length - 1)]
        web3 = new Web3(ethURI);
    }

    try {
        await Promise.all(
            addresses
            .filter((address) => address !== "TBA")
            .map(async(address) => {
                if (address === "TBA") {
                    info[`${address}`] = {
                        state: "P",
                        symbol: "TBA",
                        rate: 0,
                        totalCountWallet: 0,
                        totalCountUserParticipated: 0,
                        totalFundParticipated: 0,
                        maxSingleParticipationAllocated: 0,
                        maxTotalParticipationAllocated: 0,
                    };
                } else {
            
                    const tokenContract = new web3.eth.Contract(AbiIDOContract, address);
                    const contractInfo = await tokenContract.methods.info().call();
                    const contractInfoRound =  await tokenContract.methods.infoRounds().call();
                    const tokenAddress = contractInfo[0];
                    const symbol = contractInfo[1];
                    const decimal = Number(contractInfo[2]);
                    const rate = Number(contractInfo[3]) / 10 ** 6;
                    const openTime = Number(contractInfo[4]);
                    const fcfsOpenTime = Number(contractInfo[5]);
                    const closeTime = Number(contractInfo[6]);
                    const totalCountWallet = Number(contractInfo[7]);
                    const state = contractInfo[8];
                    const totalCountUserParticipated = Number(contractInfo[9]);
   
                    const totalFundParticipated = exactMath.div(Number(contractInfo[10]), 10 ** decimal) //parseFloat(contractInfo[11] / 10 ** decimal );
                    const maxTotalParticipationAllocated = exactMath.div(Number(contractInfo[11]), 10 ** decimal)
    
                    // parseInt(contractInfo[12].substring(0, contractInfo[12].length - decimal));
                    let infoRound = [];
                    for (let i = 0; i < contractInfoRound["0"].length; i++) {
                        infoRound.push({
                            round: contractInfoRound[0][i],
                            opens: Number(contractInfoRound[1][i]),
                            closes: Number(contractInfoRound[2][i]),
                        });
                    }
    
                    
                    info[`${address}`] = {
                        tokenAddress,
                        symbol,
                        decimal,
                        rate,
                        openTime,
                        fcfsOpenTime,
                        closeTime,
                        totalCountWallet,
                        totalCountUserParticipated,
                        totalFundParticipated,
                        maxTotalParticipationAllocated,
                        state,
                        infoRound,
    
                    };
                }
            })
        ); 
    } catch (error) {
       console.log("error==>", error); 
    }
    
    return info;
};


export const getAmountPadToken = async (chainId, account) => {

    let uri = NODE_URI[chainId][_.random(0, NODE_URI[chainId].length - 1)];
    const web3 = new Web3(uri);
    const tokenContract = new web3.eth.Contract(erc20Abi, TOKEN_BLAST_ADDRESS[chainId]);
    const tokenBalance = await tokenContract.methods.balanceOf(account).call();
    return new BigNumber(tokenBalance.toString())
      .dividedBy(10 ** 18)
      .toFixed(18)
      .replace(/\.?0+$/, "")
      .toString();
  };

export async function getBlockNumber() {
    const ethURI =
        NODE_URI[defaultChainId][_.random(0, NODE_URI[defaultChainId].length - 1)];
    const web3 = new Web3(ethURI);
    return web3.eth.getBlockNumber();
}