import { AppActions } from './actions';
import { handleActions, Action } from 'redux-actions';
import { SupportedLanguages } from 'lang';
import { SupportedCurrencies } from 'businessLogic/model';
import { ToastProps } from 'components/common/core/Toast';

export interface AppState {
    language: SupportedLanguages;
    currency: SupportedCurrencies;
    toast?: ToastProps;
}

const INITIAL_STATE: AppState = {
    language: 'en_us',
    currency: 'BTC'
};

let reducerMap = {};

reducerMap[AppActions.SET_LANG] = (state: AppState, action: Action<SupportedLanguages>): AppState => {
    return { ...state, language: action.payload };
};

reducerMap[AppActions.SET_CURRENCY] = (state: AppState, action: Action<SupportedCurrencies>): AppState => {
    return { ...state, currency: action.payload };
};

reducerMap[AppActions.SHOW_TOAST] = (state: AppState, action: Action<ToastProps>): AppState => {
    return { ...state, toast: { ...action.payload, open: true } };
};

reducerMap[AppActions.RESET_TOAST] = (state: AppState, action: Action<void>): AppState => {
    return { ...state, toast: undefined };
};


export default handleActions<AppState, any>(reducerMap, INITIAL_STATE);