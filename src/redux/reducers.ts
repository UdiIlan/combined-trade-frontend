import { combineReducers } from 'redux';
import appReducer from 'components/App/redux/reducer';
import orderBookReducer from 'components/OrderBook/redux/reducer';
import reportManagerReducer from 'components/ReportManager/redux/reducer';


const rootReducer = combineReducers({
    app: appReducer,
    orderBook: orderBookReducer,
    reportManager: reportManagerReducer
});

export default rootReducer;