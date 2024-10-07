import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/root_saga";

const persistConfig = {
    key: "root",
    storage: storage,
    blacklist: ['utils', 'systemInfo'],
    stateReconciler: autoMergeLevel2,
};

export default function configureStore(initialState = {}, history) {
    let composeEnhancers = compose;
    const reduxSagaMonitorOptions = {};
    // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== "production" && typeof window === "object") {
        /* eslint-disable no-underscore-dangle */
        if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
    }
    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
    const middlewares = [sagaMiddleware, routerMiddleware(history)];
    const enhancers = [applyMiddleware(...middlewares)];
    persistReducer(persistConfig, reducers);
    const store = createStore(
        reducers,
        initialState,
        composeEnhancers(...enhancers)
    );
    const persistor = persistStore(store);
    sagaMiddleware.run(rootSaga);
    return { store, persistor };
}