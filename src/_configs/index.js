import Web3 from "web3";

export const MODE = process.env.REACT_APP_MODE || "TESTNET";

export const BSC_EXPLORER = {
    56: "https://bscscan.com",
    81457:"https://blastscan.io/",
};



export const STAKING_CONTRACT_ADDRESS = {
    56: "",
    97: "",

};

export const TOKEN_BLAST_ADDRESS = {

    1:"0xE55d97A97ae6A17706ee281486E98A84095d8AAf",
    81457:""

};

export const POOL_INTERVAL = 15000;

export const BACKEND_URI_PROJECTS = 'https://blastfi.net/items/projects?filter[status][_eq]=live' //product
// export const BACKEND_URI_PROJECTS = 'https://blastfi.net/items/projects?filter[status][_eq]=draft'  //test
export const BACKEND_API_PROJECT_DETAILS = 'https://blastfi.net/launchpad/project'
export const NODE_URI = {

    81457: ["https://rpc.blast.io"]
};



export const KYC_BACK_END_URI = "https://bscpad.com";


export const LEADER_BOARD_LINK = 'https://www.aipad.tech/leaderboard';

export const chainIdsSupport = [81457];

export const defaultChainId = 81457


export const NATIVE_COIN_SYMBOL = "ETH";



export const chainList = {
    81457 : {
       chainId:  Web3.utils.toHex(81457),
       rpcUrls: ["https://rpc.blast.io"],
       chainName: "Blast",
       nativeCurrency: {
         name: "Ethereum",
         symbol: "ETH",
         decimals: 18
       },
       blockExplorerUrls: ["https://blastscan.io"]
   }
}