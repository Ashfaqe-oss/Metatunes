import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "./context";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import {store} from './redux/store';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThirdwebProvider desiredChainId={ChainId.Goerli}>
    <Provider store={store}>
      <StateContextProvider>
        <Router>
          <App />
        </Router>
      </StateContextProvider>
    </Provider>
  </ThirdwebProvider>
);
