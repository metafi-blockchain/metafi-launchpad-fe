import Web3 from "web3";

import erc20Abi from "../../constants/abi/erc20.abi";
import IDOContractABI from "../../constants/abi/ido.pulsepad.json";
import stakingABIContract from "../../constants/abi/staking.json";
import { calculateBalanceSend } from "./utils";
import { BigNumber } from "bignumber.js";
import {
    STAKING_CONTRACT_ADDRESS,
} from "../../_configs";
import { ACTION_STATUS } from "../constants";
// import exactMath from 'exact-math';

// console.log(BLOCKCHAIN_NETWORK);
export default class Web3Helper {


    constructor(provider, account, chainId) {

        this.web3 = new Web3(provider);
        this.address = account
        this.chainId = chainId;
    }

    getWeb3Helper(provider, account) {
        if (!Web3Helper.web3) {
            Web3Helper.web3 = new Web3Helper(provider, account);
        }

        return Web3Helper.web3;
    }

    async approve({ tokenContractAddress, contractAddress, amount }, callback) {

        // console.log("amount==>", amount);
        amount = calculateBalanceSend(amount);
        try {
            const tokenContract = this.useERC20Contract(tokenContractAddress)

            callback({
                status: ACTION_STATUS.APPROVING,
            });
            const amountInHex = "0x" + amount.toString(16);
      
            await tokenContract.methods
                .approve(contractAddress, amountInHex)
                .send({ from: this.address, 
                    maxPriorityFeePerGas: null,
                    maxFeePerGas: null, });
            // }
            callback({
                status: ACTION_STATUS.APPROVED,
            });
        } catch (error) {
            callback({
                status: ACTION_STATUS.APPROVE_FAILS,
            });
            console.log(error);
        }
    }

    async claim({ contractAddress, index }, callback) {

        const contract = this.useIDOContract(contractAddress);

        try {
            const claimResult = await contract.methods
                .claim(index)
                .send({ from: this.address, maxPriorityFeePerGas:null, maxFeePerGas: null })
                .on("error", (error) => {
                    console.log(error);
                    callback({
                        status: ACTION_STATUS.CLAIM_FAIL,
                    });
                })
                .then((receipt) => {
                    if (receipt.status == 1) {
                        callback({
                            status: ACTION_STATUS.CLAIM_SUCCESS,
                            txID: receipt.transactionHash,
                        });
                    } else callback({ status: ACTION_STATUS.CLAIM_FAIL });
                })
                .catch((err) => {
                    console.log(err);
                    callback({ status: ACTION_STATUS.CLAIM_FAIL });
                });
            return claimResult;
        } catch (e) {
            console.error(e.message);
            callback({
                status: ACTION_STATUS.CLAIM_FAIL,
            });
            return e.message;
        }
    }

    async buyTokens({ contractAddress, tokenAddress, amount }, callback) {

        const contract = this.useIDOContract(contractAddress);
        amount = calculateBalanceSend(amount);
        const amountInHex = "0x" + amount.toString(16);

        let sendObject;
        if (tokenAddress === "0x0000000000000000000000000000000000000000") {
            sendObject = { from: this.address, value: amountInHex , maxPriorityFeePerGas:null, maxFeePerGas: null };
        } else {
            sendObject = { from: this.address, 
                maxPriorityFeePerGas: null,
                maxFeePerGas: null
            };
        }

        try {
            contract.methods.participate(tokenAddress, amountInHex).send(sendObject)
            .on("error", (error) => {
                    console.log(error);
                    callback({
                        status: ACTION_STATUS.BUY_FAIL,
                    });
            }).then((receipt) => {
                if (receipt.status == 1) {
                    callback({
                        status: ACTION_STATUS.BUY_SUCCESS,
                        txID: receipt.transactionHash,
                    });
                } else callback({ status: ACTION_STATUS.BUY_FAIL });
            }).catch((err) => {
                console.log(err);
                callback({ status: ACTION_STATUS.BUY_FAIL });
            });

        } catch (e) {
            console.error(e.message);
            callback({
                status: ACTION_STATUS.BUY_FAIL,
            });
        }
    }


    async getInfoAllocations(contractAddress) {

        const contract = this.useIDOContract(contractAddress);

        const contractInfoAllocation = await contract.methods
            .infoAllocations()
            .call({ from: this.address });
        return _calculateAllowInfo(contractInfoAllocation)
    }

    async getInfoWallet(contractAddress) {
        const tokenContract = this.useIDOContract(contractAddress);

        const contractInfo = await tokenContract.methods.infoWallet() .call({ from: this.address });

        const ethBalance = Number(contractInfo[0])/10 ** 18 || 0 ; 
      
        const tier = contractInfo[2];

        const tokenBalance = Number(contractInfo[1])
      
        const roundState = Number(contractInfo[3]);
        const roundStateText = contractInfo[4];
        const roundTimestamp = Number(contractInfo[5]);
        const remainingAllocation = Number(contractInfo[6]);
        const userParticipation = Number(contractInfo[7]);
        return {
            tokenBalance,
            tier,
            roundState,
            roundStateText,
            roundTimestamp,
            remainingAllocation,
            ethBalance,
            userParticipation,
        };
    }

    async getTokenBalance(tokenAddress) {

        const tokenContract = this.useERC20Contract(tokenAddress)
        const tokenBalance = await tokenContract.methods.balanceOf(this.address).call();
        // return exactMath.div(tokenBalance, exactMath.pow(10, 18))

        return new BigNumber(tokenBalance.toString())
            .dividedBy(10 ** 18)
            .toFixed(18)
            .replace(/\.?0+$/, "")
            .toString();
    }

    async getAllowance(tokenAddress, contractAddress) {

        const tokenContract = this.useERC20Contract(tokenAddress)

        const allocationNumber = await tokenContract.methods.allowance(this.address, contractAddress).call();
        // return exactMath.div(allocationNumber, exactMath.pow(10, 18))
        return new BigNumber(allocationNumber.toString()).dividedBy(10 ** 18).toString();
        // return parseFloat(allocationNumber / 10 ** 18);
    }


    async stakingDeposit({ amount }, callback) {

        const contract = this.useStakingContract(this.chainId)
        amount = calculateBalanceSend(amount);

        const amountInHex = "0x" + amount.toString(16);
        try {
            const depositResult = await contract.methods
                .stake(amountInHex)
                .send({ from: this.address , maxPriorityFeePerGas:null, maxFeePerGas: null })
                .on("error", (error) => {
                    console.log(error);
                    callback({
                        status: ACTION_STATUS.STAKING_DEPOSIT_FAIL,
                    });
                })
                .on("transactionHash", (hash) => {
                    callback({
                        status: ACTION_STATUS.STAKING_DEPOSIT_SUBMIT,
                        txID: hash,
                    });
                })
                .then((receipt) => {
                    if (receipt.status === true) {
                        callback({
                            status: ACTION_STATUS.STAKING_DEPOSIT_SUCCESS,
                            txID: receipt.transactionHash,
                        });
                    } else callback({ status: ACTION_STATUS.STAKING_DEPOSIT_FAIL });
                })
                .catch((err) => {
                    console.log(err);
                    callback({ status: ACTION_STATUS.STAKING_DEPOSIT_FAIL });
                });
            return depositResult;
        } catch (e) {
            console.error(e.message);
            callback({
                status: ACTION_STATUS.STAKING_DEPOSIT_FAIL,
            });
            return e.message;
        }
    }

    //request withdraw staking
    async stakingInitiateWithdrawal({ amount }, callback) {

        const contract = this.useStakingContract(this.chainId);
        amount = calculateBalanceSend(amount);
        const amountInHex = "0x" + amount.toString(16);
        try {
            const gasPrice = await this.web3.eth.getGasPrice();
            const initiateWithdrawalResult = await contract.methods
                .unstake(amountInHex)
                .send({ from: this.address, gasPrice, maxPriorityFeePerGas:null, maxFeePerGas: null })
                .on("transactionHash", (hash) => {
                    callback({
                        status: ACTION_STATUS.STAKING_INITIATE_WITHDRAWAL_SUBMIT,
                        txID: hash,
                    });
                })
                .on("error", (error) => {
                    console.log(error);
                    callback({
                        status: ACTION_STATUS.STAKING_INITIATE_WITHDRAWAL_FAIL,
                    });
                })
                .then((receipt) => {
                    if (receipt.status === true) {
                        callback({
                            status: ACTION_STATUS.STAKING_INITIATE_WITHDRAWAL_SUCCESS,
                            txID: receipt.transactionHash,
                        });
                    } else callback({ status: ACTION_STATUS.STAKING_INITIATE_WITHDRAWAL_FAIL });
                })
                .catch((err) => {
                    console.log(err);
                    callback({ status: ACTION_STATUS.STAKING_INITIATE_WITHDRAWAL_FAIL });
                });
            return initiateWithdrawalResult;
        } catch (e) {
            console.error(e.message);
            callback({
                status: ACTION_STATUS.STAKING_INITIATE_WITHDRAWAL_FAIL,
            });
            return e.message;
        }
    }

    // execute withdraw staking
    async stakingExecuteWithdrawal(callback) {

        const contract = this.useStakingContract(this.chainId)

        try {
            const gasPrice = await this.web3.eth.getGasPrice();
            const executeWithdrawalResult = await contract.methods
                .withdraw()
                .send({ from: this.address , gasPrice, maxPriorityFeePerGas:null, maxFeePerGas: null })
                .on("transactionHash", (hash) => {
                    callback({
                        status: ACTION_STATUS.STAKING_EXECUTE_WITHDRAWAL_SUBMIT,
                        txID: hash,
                    });
                })
                .on("error", (error) => {
                    console.log(error);
                    callback({
                        status: ACTION_STATUS.STAKING_EXECUTE_WITHDRAWAL_FAIL,
                    });
                })
                .then((receipt) => {
                    if (receipt.status === true) {
                        callback({
                            status: ACTION_STATUS.STAKING_EXECUTE_WITHDRAWAL_SUCCESS,
                            txID: receipt.transactionHash,
                        });
                    } else callback({ status: ACTION_STATUS.STAKING_EXECUTE_WITHDRAWAL_FAIL });
                })
                .catch((err) => {
                    console.log(err);
                    callback({ status: ACTION_STATUS.STAKING_EXECUTE_WITHDRAWAL_FAIL });
                });
            return executeWithdrawalResult;
        } catch (e) {
            console.error(e.message);
            callback({
                status: ACTION_STATUS.STAKING_EXECUTE_WITHDRAWAL_FAIL,
            });
            return e.message;
        }
    }

    // execute withdraw rewards
    async stakingExecuteWithdrawRewards(callback) {

        const contract = this.useStakingContract(this.chainId)
        try {
            const executeWithdrawRewardsResult = await contract.methods
                .withdrawRewards()
                .send({ from: this.address , maxPriorityFeePerGas:null, maxFeePerGas: null })
                .on("transactionHash", (hash) => {
                    callback({
                        status: ACTION_STATUS.STAKING_EXECUTE_WITHDRAW_REWARDS_SUBMIT,
                        txID: hash,
                    });
                })
                .on("error", (error) => {
                    console.log(error);
                    callback({
                        status: ACTION_STATUS.STAKING_EXECUTE_WITHDRAW_REWARDS_FAIL,
                    });
                })
                .then((receipt) => {
                    if (receipt.status === true) {
                        callback({
                            status: ACTION_STATUS.STAKING_EXECUTE_WITHDRAW_REWARDS_SUCCESS,
                            txID: receipt.transactionHash,
                        });
                    } else callback({ status: ACTION_STATUS.STAKING_EXECUTE_WITHDRAW_REWARDS_FAIL });
                })
                .catch((err) => {
                    console.log(err);
                    callback({ status: ACTION_STATUS.STAKING_EXECUTE_WITHDRAW_REWARDS_FAIL });
                });
            return executeWithdrawRewardsResult;
        } catch (e) {
            console.error(e.message);
            callback({
                status: ACTION_STATUS.STAKING_EXECUTE_WITHDRAW_REWARDS_FAIL,
            });
            return e.message;
        }
    }

    async stakingRewards(callback) {

        const contract = this.useStakingContract(this.chainId)
        try {
            const gasPrice = await this.web3.eth.getGasPrice();
            const executeStakeRewardsResult = await contract.methods
                .stakeRewards()
                .send({ from: this.address , gasPrice, maxPriorityFeePerGas:null, maxFeePerGas: null })
                .on("transactionHash", (hash) => {
                    callback({
                        status: ACTION_STATUS.STAKING_REWARDS_SUBMIT,
                        txID: hash,
                    });
                })
                .on("error", (error) => {
                    console.log(error);
                    callback({
                        status: ACTION_STATUS.STAKING_REWARDS_FAIL,
                    });
                })
                .then((receipt) => {
                    if (receipt.status === true) {
                        callback({
                            status: ACTION_STATUS.STAKING_REWARDS_SUCCESS,
                            txID: receipt.transactionHash,
                        });
                    } else callback({ status: ACTION_STATUS.STAKING_REWARDS_FAIL });
                })
                .catch((err) => {
                    console.log(err);
                    callback({ status: ACTION_STATUS.STAKING_REWARDS_FAIL });
                });
            return executeStakeRewardsResult;
        } catch (e) {
            console.error(e.message);
            callback({
                status: ACTION_STATUS.STAKING_REWARDS_FAIL,
            });
            return e.message;
        }
    }

    // async getStakingInfoWallet() {
    //     try {
    //         const contract = this.useStakingContract(this.chainId)


    //         const infoWallet = await contract.methods.infoWallet(this.address).call();
    //         // console.log("infoWallet==>", infoWallet);
    //         const infoWalletFees = await contract.methods.infoWalletFees(this.address).call();

    //         // console.log("rewardAmount==>", BigNumber(infoWallet[5].toString()).dividedBy(10 ** 18).toFixed(18).replace(/\.?0+$/,"").toString());
    //         return {
    //             stakedAmount: BigNumber(infoWallet[0].toString())
    //                 .dividedBy(10 ** 18)
    //                 .toString(),
    //             unstakedAmount: BigNumber(infoWallet[1].toString())
    //                 .dividedBy(10 ** 18)
    //                 .toString(),
    //             depositTimestamp: Number(infoWallet[2]) * 1000,
    //             lastUnstakeTimestamp: Number(infoWallet[3]) * 1000,
    //             withdrawTimestamp: Number(infoWallet[4]) * 1000,
    //             rewardAmount: BigNumber(infoWallet[5].toString())
    //                 .dividedBy(10 ** 18)
    //                 .toFixed(18)
    //                 .replace(/\.?0+$/, "")
    //                 .toString(),
    //             stakedDuration: Number(infoWalletFees[0]),
    //             totalPctFee: Number(infoWalletFees[1]),
    //         };
    //     } catch (error) {
    //         console.log(error);
    //         return {}
    //     }

    // }


    useStakingContract(chainId) {
        return new this.web3.eth.Contract(stakingABIContract, STAKING_CONTRACT_ADDRESS[chainId]);
    }
    useIDOContract(contractAddress) {
        return new this.web3.eth.Contract(IDOContractABI, contractAddress);
    }
    useERC20Contract(tokenAddress) {
        return new this.web3.eth.Contract(erc20Abi, tokenAddress);
    }

    //Get Token Balance with address 
   
}



/**
 * data: {row1: [1,1,2,2]
 *        row2: [50000,50000, 612000, 10000000],
 *        row3: [1629787053,1629787053, 1629787555, 1629789889],
 *        row4: [50000, 0,612000,0]}
 * @param {*} param0 
 * @returns 
 */
const _calculateAllowInfo = (contractInfoAllocation) => {
    // console.log("contractInfoAllocation==>", contractInfoAllocation);
    let infoAllocation = [];
    const claimStatus = {
        0: "PENDING",
        1: "OPEN",
        2: "CLOSED",
    };
    const row1 = contractInfoAllocation[0]
    const row2 = contractInfoAllocation[1]
    const row3 = contractInfoAllocation[2]
    const row4 = contractInfoAllocation[3]
    const row5 = contractInfoAllocation[4]
    if (row1.length >= 2) {
        if (row1[0]?.toString() ^ row1[1]?.toString() === 0) {
            //layout2
            for (let i = 0; i < row1.length - 1; i++) {

                const item = row1[i]?.toString()
          
                const nextItem = row1[i + 1]?.toString()
                if (item === nextItem) {

                    // console.log("next status==>", row5[i+1]);
                    const allocationAmount = (row2[i] === row2[i + 1]) ? row2[i] : `${Number(row2[i])}-${Number(row2[i+1])}`
                    const timestamp = (row3[i] === row3[i + 1]) ? row3[i] : `${Number(row3[i])}-${Number(row3[i+1])}`;
                    const percentage = row4[i + 1]

                    infoAllocation.push({
                        no: item,
                        allocationAmount: Number(allocationAmount),
                        timestamp: Number(timestamp),
                        claimedAmount: Number(row4[i]),
                        status: claimStatus[Number(row5[i])],
                        percentage: Number(percentage)
                    })
                }
            }
     

            return {
                layout: 2,
                infoAllocation
            };
        }
    }

    for (let i = 0; i < row1.length; i++) {
        infoAllocation.push({
            no: row1[i],
            allocationAmount: Number(row2[i]),
            timestamp: Number(row3[i]),
            claimedAmount: Number(row4[i]),
            status: claimStatus[Number(row5[i])],
        });
    }

    return {
        layout: 1,
        infoAllocation,
    }
}