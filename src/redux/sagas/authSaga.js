import { takeLatest, put, call } from 'redux-saga/effects';
import HttpStatus from 'http-status-codes';
import { fetchLogout } from '../services';
import { history } from '../../utils/history';
import { ACTION_CONST, ROUTES, LOCAL_STORAGE } from "../../shared/constants"

function* handleLogout() {
    try {
        const result = yield call(fetchLogout);
        if (result.status === HttpStatus.OK) {
            yield put({
                type: ACTION_CONST.LOG_OUT_SUCCESS,
            });
            localStorage.removeItem(LOCAL_STORAGE.ASSET_BLAST_WALLET);
            history.push(ROUTES.HOME)
        }

    } catch (error) {
        yield put({
            type: ACTION_CONST.LOGIN_FAIL
        });
    }
}

function* handleLogin() {
    try {
        const result = yield call(fetchLogout);
    } catch (error) {

    }
}

export function* watchHandleLogout() {
    yield takeLatest(ACTION_CONST.REQUEST_LOG_OUT, handleLogout);
}