import * as _ from 'lodash';
import { ReportManagerActions } from './actions';
import { handleActions, Action } from 'redux-actions';

export interface ReportManagerState {
    data?: any[];
    loading?: boolean;
}

const INITIAL_STATE: ReportManagerState = {
    data: []
};

let reducerMap = {};

reducerMap[ReportManagerActions.GET_ORDERS_REPORT] = (state: ReportManagerState, action: Action<any>): ReportManagerState => {
    return { ...state, loading: true };
};

reducerMap[ReportManagerActions.SET_ORDERS_REPORT] = (state: ReportManagerState, action: Action<any[]>): ReportManagerState => {
    return { ...state, loading: false, data: action.payload };
};

export default handleActions<ReportManagerState, any>(reducerMap, INITIAL_STATE);