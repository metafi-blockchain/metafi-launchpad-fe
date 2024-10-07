import { call, put, takeLatest } from "redux-saga/effects";
import { ACTION_CONST } from "../../constants";
import { getInfoContract } from "../../shared/utils/contractHelpers";
import { getProjectByContract, getProjects } from "../services/project";

function* handleGetProjects() {
  try {
    const resProjects = yield call(getProjects);
    let listContractAddress = [];
    resProjects.forEach((item) => {
      if (typeof item["contract"] === "string"&& item["state"]!=="C")  {
        listContractAddress.push(item["contract"]);
      }
    });
    
    if (listContractAddress.length > 0) {
      let arr = [];
      let resContracts = []
      try {
         resContracts = yield call(getInfoContract, listContractAddress);
      } catch (error) {
        console.log("err==>",error);
        resContracts = yield call(getInfoContract, listContractAddress)
      }

      resProjects.forEach((element) => {
        const target = element;
        const source = resContracts[element.contract];
        const obj = Object.assign(target, source)
        obj['isPrivate'] = true; //set private to false for public project
        const item = resProjects.find(e=>e.symbol === element.projectTokenSymbol);
        if(item){
          obj["athMultiplier"] = item["ath_multiplier"]
        }else{
          obj["athMultiplier"] = null
        }
        arr.push(obj);
      });

      yield put({
        type: ACTION_CONST.GET_PROJECTS_SUCCESS,
        data: {
          projects: arr,
          openingProjects: arr.filter((e) => e.state === "O"||e.state === "F"),
          waitingProjects: arr.filter((e) => e.state === "P"),
          closedProjects: arr.filter((e) => e.state === "C"),
        },
      });
    } else {
      yield put({
        type: ACTION_CONST.GET_PROJECTS_SUCCESS,
        data: {
          projects: resProjects,
          openingProjects: resProjects.filter((e) => e.state === "O"),
          waitingProjects: resProjects.filter((e) => e.state === "P"),
          closedProjects: resProjects.filter((e) => e.state === "C"),
        },
      });
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

function* handleGetSelectedProjects(data) {

  const contractAddress = data.data
  const resProjects = yield call(getProjectByContract, contractAddress);
  if (resProjects.status === 200) {
   
    const resContracts = yield call(getInfoContract, [contractAddress]);
    const object = Object.assign(resProjects.data, resContracts[contractAddress]);
    yield put({
      type: ACTION_CONST.GET_PROJECT_SELECTED,
      data: object,
    });
  }
}

export function* watchSubmitGetProjects() {
  yield takeLatest(
    ACTION_CONST.SUBMIT_GET_PROJECTS,
    handleGetProjects
  );
}

export function* watchSubmitSelectedProjects() {
  yield takeLatest(
    ACTION_CONST.SUBMIT_PROJECT_SELECTED,
    handleGetSelectedProjects
  );
}