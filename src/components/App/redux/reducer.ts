import AppActions from './constants';
import { handleActions, Action } from 'redux-actions';
import { SupportedLanguages } from 'lang';
import { SupportedCoins } from 'businessLogic/model';

export interface AppState {
    language: SupportedLanguages;
    currency: SupportedCoins;
}

const INITIAL_STATE: AppState = {
    language: 'en_us',
    currency: 'BTC'
};

let reducerMap = {};

reducerMap[AppActions.SET_LANG] = (state: AppState, action: Action<SupportedLanguages>): AppState => {
    return { ...state, language: action.payload };
};

reducerMap[AppActions.SET_CURRENCY] = (state: AppState, action: Action<SupportedCoins>): AppState => {
    return { ...state, currency: action.payload };
};

export default handleActions<AppState, any>(reducerMap, INITIAL_STATE);