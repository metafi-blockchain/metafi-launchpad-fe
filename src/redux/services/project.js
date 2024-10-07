
import axios from "axios";
import { BACKEND_URI_PROJECTS, BACKEND_API_PROJECT_DETAILS } from "../../_configs";


export const getProjects = async () => {
  try {
    const result = await axios.get(`${BACKEND_URI_PROJECTS}`);
    // console.log(result);
    if (result.status === 200) {
      return result.data.data;
    }

    return [];
  } catch (error) {
    const response = error.response;
    console.log(response);
    return [];
  }
}

export const getProject = async (id) => {
  try {
    const result = await axios.post(`${BACKEND_API_PROJECT_DETAILS}`, { id })
    if (result.status === 200) 
      return {
        status: 200,
        data: result.data?.data
      }
    
  } catch (error) {
   console.log(error);
  }
  return {
    status: 404,
    data: null
  }
}


export const getProjectByContract = async (contract) => {
  try {
    const result = await axios.post(`${BACKEND_API_PROJECT_DETAILS}`, { contract })
    if (result.status === 200)
      return {
        status: 200,
        data: result.data?.data
      }
  } catch (error) {
    console.log(error);
  }



  return {
    status: 404,
    data: null
  };




}
