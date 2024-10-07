import { ACTION_CONST } from "../../shared/constants";

const INITIAL_STATE = {
  walletInfo: {},
  kycStatus: null,
  kycURL: "",
  jobKyc: 0,
  stakingInfo: {},
  stakingWalletInfo: {},
  jobUnStakeTime: 0,
  bscPadTokenBalance: 0,
  bnbBalance: 0,
  jobGetBalance: 0,
  jobStakingStatus: 0,
  tier: null,
};
const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_CONST.GET_INFO_WALLET:
      return {
        ...state,
        walletInfo: action.data,
      };
    case ACTION_CONST.GET_KYC_INFO:
      return {
        ...state,
        kycStatus: action.data,
      };
    case ACTION_CONST.GET_KYC_3RD:
      return {
        ...state,
        kycURL: action.data,
      };
    case ACTION_CONST.SET_JOB_GET_KYC:
      clearInterval(state.jobKyc);
      return {
        ...state,
        jobKyc: action.data,
      };
    case ACTION_CONST.CLEAR_KYC_STATE:
      clearInterval(state.jobKyc);
      return {
        ...state,
        kycStatus: null,
      };

    //merge staking
    case ACTION_CONST.GET_STAKING_INFO:
      return {
        ...state,
        stakingInfo: action.data,
      };

    case ACTION_CONST.GET_STAKING_WALLET_INFO:
      return {
        ...state,
        stakingWalletInfo: action.data,
      };
    case ACTION_CONST.SET_JOB_COUNTDOWN_STAKE_TIME:
      clearInterval(state.jobUnStakeTime);
      return {
        ...state,
        jobUnStakeTime: action.data,
      };

    case ACTION_CONST.GET_BLAST_WALLET_BALANCE:
      return {
        ...state,
        bscPadTokenBalance: action.data,
      };

    case ACTION_CONST.GET_BNB_BALANCE:
      return {
        ...state,
        bnbBalance: action.data,
      };

    case ACTION_CONST.SET_JOB_GET_BALANCE:
      clearInterval(state.jobGetBalance);
      return {
        ...state,
        jobGetBalance: action.data,
      };

    case ACTION_CONST.CLEAR_INTERVAL_PROJECTS_JOB:
      clearInterval(state.jobUnStakeTime);
      clearInterval(state.stakingWalletInfo);
      return {
        ...state,
        jobUnStakeTime: 0,
        stakingWalletInfo: 0,
      };

    case ACTION_CONST.SET_JOB_GET_STAKING_STATUS:
      clearInterval(state.jobStakingStatus);
      return {
        ...state,
        jobStakingStatus: action.data,
      };
    case ACTION_CONST.SET_TIER_ADDRESS:
      return {
        ...state,
        tier: action.data,
      };
    default:
      return state;
  }
};

export default walletReducer