import { ACTION_CONST } from "../../shared/constants"

const INITIAL_STATE = {
    projects: [],
    openingProjects: [],
    waitingProjects: [],
    closedProjects: [],
    selectedProject: null,
    currentWalletInfo: null,
    contractsInfo: [],
    currentSelectedContractAddress: null,
    jobGetProjects: 0,
    jobGetProjectSelected: 0,
    jobGetWalletInfo: 0,
    jobCountDownOpen: 0,
    jobCountDownClose: 0,
    jobCountDownRoundTime: 0,
    jobCountDownFcfsTime: 0,
};
const projectReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTION_CONST.GET_PROJECTS_SUCCESS:
            return {
                ...state,
                projects: action.data.projects,
                openingProjects: action.data.openingProjects,
                waitingProjects: action.data.waitingProjects,
                closedProjects: action.data.closedProjects,
            };
        case ACTION_CONST.GET_LIST_CONTRACTS_INFO:
            return {
                ...state,
                contractsInfo: action.data,
            };
        case ACTION_CONST.GET_PROJECT_SELECTED:
            return {
                ...state,
                selectedProject: action.data,
            };

        case ACTION_CONST.SET_CURRENT_CONTRACT_SELECTED:
            return {
                ...state,
                currentSelectedContractAddress: action.data,
            };

        case ACTION_CONST.SET_JOB_PROJECT_SELECTED:
            clearInterval(state.jobGetProjectSelected);
            return {
                ...state,
                jobGetProjectSelected: action.data,
            };

        case ACTION_CONST.SET_JOB_GET_WALLET_INFO:
            clearInterval(state.jobGetWalletInfo);
            return {
                ...state,
                jobGetWalletInfo: action.data,
            };

        case ACTION_CONST.SET_JOB_COUNT_DOWN_OPEN:
            clearInterval(state.jobCountDownOpen);

            return {
                ...state,
                jobCountDownOpen: action.data,
            };
        case ACTION_CONST.SET_JOB_COUNT_DOWN_CLOSE:
            clearInterval(state.jobCountDownClose);

            return {
                ...state,
                jobCountDownClose: action.data,
            };
        case ACTION_CONST.SET_JOB_COUNT_DOWN_ROUND:
            clearInterval(state.jobCountDownRoundTime);
            return {
                ...state,
                jobCountDownRoundTime: action.data,
            };

        case ACTION_CONST.SET_JOB_COUNT_DOWN_FCFS_TIME:
            clearInterval(state.jobCountDownFcfsTime);
            return {
                ...state,
                jobCountDownFcfsTime: action.data,
            };
        case ACTION_CONST.SET_JOB_GET_PROJECTS:
            clearInterval(state.jobGetProjects);
            return {
                ...state,
                jobGetProjects: action.data,
            };

        case ACTION_CONST.CLEAR_INTERVAL_PROJECTS_JOB:
            clearInterval(state.jobGetProjectSelected);
            clearInterval(state.jobGetWalletInfo);
            clearInterval(state.jobGetProjects);
            return {
                ...state,
                jobGetProjectSelected: 0,
                jobGetWalletInfo: 0,
                jobGetProjects: 0
            };
        default:
            return state;
    }
};
export default projectReducer