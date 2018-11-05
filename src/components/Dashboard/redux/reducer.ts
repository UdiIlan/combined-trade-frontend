import { DashboardActions } from './actions';
import { handleActions, Action } from 'redux-actions';
import { SupportedLanguages } from 'lang';
import { SupportedCurrencies, AppTheme } from 'businessLogic/model';
import { ToastProps } from 'components/common/core/Toast';

export interface DashboardState {
    userBalance: object;
}

const INITIAL_STATE: DashboardState = {
    userBalance: {}
};

let reducerMap = {};

reducerMap[DashboardActions.SET_USER_BALANCE] = (state: DashboardState, action: Action<any>): DashboardState => {
    return { ...state, userBalance: action.payload.userBalance };
};


export default handleActions<DashboardState, any>(reducerMap, INITIAL_STATE);