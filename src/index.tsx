import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
// import { Router, hashHistory } from "react-router";
// import routes from "routes";
// import { syncHistoryWithStore } from "react-router-redux";
require ("styles/global.scss");
import initialState from "./redux/initiealState";
import configureStore from "./redux/configureStore";
import App from "components/App";


const store = configureStore(initialState, () => {
    // const history = syncHistoryWithStore(hashHistory, store);

    render(
        <Provider store={store}>
            <App />
        </Provider>, document.getElementById("app")
    );

});