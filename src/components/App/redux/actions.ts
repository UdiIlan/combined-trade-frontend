import { createAction } from 'redux-actions';
import { SupportedLanguages } from 'lang';
import { SupportedCurrencies, AppTheme } from 'businessLogic/model';
import { ToastProps } from 'components/common/core/Toast';

export const AppActions = {
    SET_LANG: 'APP/SET_LANG',
    SET_CURRENCY: 'APP/SET_CURRENCY',
    SHOW_TOAST: 'APP/SHOW_TOAST',
    RESET_TOAST: 'APP/RESET_TOAST',
    SET_THEME: 'APP/SET_THEME',
    LOGIN: 'APP/LOGIN',
    SET_LOOGEDIN_USER: 'APP/SET_LOOGEDIN_USER',
    LOGOUT: 'APP/LOGOUT',
    SET_WRONG_USER_DETAILS: 'APP/SET_WRONG_USER_DETAILS',
};

export const sesLanguage = createAction(AppActions.SET_LANG, (newLang: SupportedLanguages) => newLang);

export const setCurrency = createAction(AppActions.SET_CURRENCY, (newCurrency: SupportedCurrencies) => newCurrency);

export const showToast = createAction(AppActions.SHOW_TOAST, (toast: ToastProps) => toast);

export const resetToast = createAction(AppActions.RESET_TOAST, () => { });

export const setTheme = createAction(AppActions.SET_THEME, (theme: AppTheme) => theme);

export const login = createAction(AppActions.LOGIN, (userName: String, password: String) => { return { userName, password }; });

export const setLoggedInUser = createAction(AppActions.SET_LOOGEDIN_USER, (loggedUserName: String) => loggedUserName);

export const logout = createAction(AppActions.LOGOUT, () => { });

export const setWrongUserDetails = createAction(AppActions.SET_WRONG_USER_DETAILS, () => true);


