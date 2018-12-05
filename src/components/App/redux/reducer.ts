import { AppActions } from './actions';
import { handleActions, Action } from 'redux-actions';
import { SupportedLanguages } from 'lang';
import { SupportedCurrencies, AppTheme, UserDetails } from 'businessLogic/model';
import { ToastProps } from 'components/common/core/Toast';

export interface AppState {
    language: SupportedLanguages;
    currency: SupportedCurrencies;
    theme: AppTheme;
    toast?: ToastProps;
    errorMessage?: string;
    userDetails: UserDetails;
    wrongUserDetails: boolean;
}

const INITIAL_STATE: AppState = {
    language: 'en_us',
    currency: 'BTC',
    theme: 'light',
    userDetails: undefined,
    wrongUserDetails: false
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

reducerMap[AppActions.SHOW_ERROR_MESSAGE] = (state: AppState, action: Action<string>): AppState => {
    return { ...state, errorMessage: action.payload };
};

reducerMap[AppActions.RESET_ERROR_MESSAGE] = (state: AppState, action: Action<void>): AppState => {
    return { ...state, errorMessage: undefined };
};

reducerMap[AppActions.RESET_TOAST] = (state: AppState, action: Action<void>): AppState => {
    return { ...state, toast: undefined };
};

reducerMap[AppActions.SET_THEME] = (state: AppState, action: Action<AppTheme>): AppState => {
    return { ...state, theme: action.payload };
};


reducerMap[AppActions.SET_LOGGED_IN_USER_DETAILS] = (state: AppState, action: Action<UserDetails>): AppState => {
    return { ...state, userDetails: action.payload };
};

reducerMap[AppActions.LOGOUT] = (state: AppState, action: Action<void>): AppState => {
    return { ...state, userDetails: undefined };
};

reducerMap[AppActions.SET_WRONG_USER_DETAILS] = (state: AppState, action: Action<boolean>): AppState => {
    return { ...state, wrongUserDetails: true };
};

export default handleActions<AppState, any>(reducerMap, INITIAL_STATE);