import { combineReducers } from 'redux';
import appReducer from 'components/App/redux/reducer';
import orderBookReducer from 'components/OrderBook/redux/reducer';


const rootReducer = combineReducers({
    app: appReducer,
    orderBook: orderBookReducer
});

export default rootReducer;