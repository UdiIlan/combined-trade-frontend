import { combineReducers } from "redux";
import appReducer from "components/App/redux/reducer";
// import { routerReducer } from "react-router-redux";

const rootReducer = combineReducers({
    // routing: routerReducer
    app: appReducer
});

export default rootReducer;