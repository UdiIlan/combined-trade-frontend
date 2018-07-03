import { createAction } from 'redux-actions';
import { SupportedLanguages } from 'lang';
import { SupportedCurrencies } from 'businessLogic/model';

export const AppActions = {
    SET_LANG: 'APP/SET_LANG',
    SET_CURRENCY: 'APP/SET_CURRENCY'
};

export const sesLanguage = createAction(AppActions.SET_LANG, (newLang: SupportedLanguages) => newLang);

export const setCurrency = createAction(AppActions.SET_CURRENCY, (newCurrency: SupportedCurrencies) => newCurrency);