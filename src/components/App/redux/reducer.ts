import AppActions from './constants';
import { handleActions, Action } from 'redux-actions';
import { SupportedLanguages } from 'lang';

export interface AppState {
    language: SupportedLanguages;
}

const INITIAL_STATE: AppState = {
    language: 'en_us'
};

let reducerMap = {};

reducerMap[AppActions.SET_LANG] = (state: AppState, action: Action<SupportedLanguages>): AppState => {
    return { ...state, language: action.payload };
};


export default handleActions<AppState, any>(reducerMap, INITIAL_STATE);