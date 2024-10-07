import axios from "axios";
import { ENDPOINTS } from "../../constants";
import { KYC_BACK_END_URI, BACKEND_URI_PROJECTS } from "../../_configs";

export const getKYC = async (address, type) => {
  // address = '0xB4baa008B051960E6D13DA39C22af60404197938'
  try {
    const result = await axios.get(
      `${KYC_BACK_END_URI}${ENDPOINTS.GET_KYC}?address=${address}&type=${type}`
    );
    // console.log(result);
    if (result.status === 200) {
      return result.data;
    }

    return null;
  } catch (error) {
    const response = error.response;

    console.log(response);

    return null;
  }
};

export const getTierOfAccount = async (address) => {
  // address = '0x24DB93EedFE5242b4A1Ae9F1E34923492d88f869'
  try {
    const result = await axios.get(
      `${BACKEND_URI_PROJECTS}${ENDPOINTS.GET_BALANCE}/${address}`
    );
    // console.log(result);
    if (result.status === 200) {
      return result.data;
    }

    return null;
  } catch (error) {
    const response = error.response;

    console.log(response);

    return null;
  }
};