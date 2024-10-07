import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { history } from "./shared/utils/history";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { NetworkContextName } from "./library/literals";
import App from "./App";
import configureStore from "./redux/store";
import * as serviceWorker from "./serviceWorker";
import getLibrary from "./library/modules/helper";

const { store } = configureStore({}, history);
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);
ReactDOM.render(
  <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
      <App />
    </Web3ProviderNetwork>
    </Web3ReactProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
