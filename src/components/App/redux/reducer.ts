import AppActions from './constants';
import { handleActions, Action } from 'redux-actions';

export interface AppState {
}

const INITIAL_STATE: AppState = {
};

let reducerMap = {};

reducerMap[AppActions.LOGIN] = (state: AppState, action: Action<{ userName: string, password: string }>): AppState => {
    return { ...state };
};


export default handleActions<AppState, any>(reducerMap, INITIAL_STATE);