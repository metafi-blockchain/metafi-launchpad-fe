import { combineReducers } from 'redux';
import utils from './utils.reducer';
import project from './project.reducer';
import wallet from './wallet.reducer';
import app from './app.reducer';
const reducers = combineReducers({
    utils,
    project,
    wallet,
    app
});

export default reducers;