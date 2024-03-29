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
};

export const sesLanguage = createAction(AppActions.SET_LANG, (newLang: SupportedLanguages) => newLang);

export const setCurrency = createAction(AppActions.SET_CURRENCY, (newCurrency: SupportedCurrencies) => newCurrency);

export const showToast = createAction(AppActions.SHOW_TOAST, (toast: ToastProps) => toast);

export const resetToast = createAction(AppActions.RESET_TOAST, () => {});

export const setTheme = createAction(AppActions.SET_THEME, (theme: AppTheme) => theme);