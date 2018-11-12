import { DashboardActions } from './actions';
import { handleActions, Action } from 'redux-actions';


export interface DashboardState {
    userBalance: object;
    exchangeRates: object;
    trendData: object[];
}

const INITIAL_STATE: DashboardState = {
    userBalance: {},
    exchangeRates: {},
    trendData: []
};

let reducerMap = {};

reducerMap[DashboardActions.SET_USER_BALANCE] = (state: DashboardState, action: Action<any>): DashboardState => {
    return { ...state, userBalance: action.payload };
};

reducerMap[DashboardActions.SET_EXCHANGE_RATES] = (state: DashboardState, action: Action<any>): DashboardState => {
    return { ...state, exchangeRates: action.payload };
};

reducerMap[DashboardActions.SET_CURRENCY_TREND] = (state: DashboardState, action: Action<any>): DashboardState => {
    return { ...state, trendData: action.payload };
};


export default handleActions<DashboardState, any>(reducerMap, INITIAL_STATE);