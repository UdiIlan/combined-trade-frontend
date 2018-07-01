import AppAction from './constants';
import { createAction } from 'redux-actions';
import { SupportedLanguages } from 'lang';
import { SupportedCoins } from 'businessLogic/model';

export const sesLanguage = createAction(AppAction.SET_LANG, (newLang: SupportedLanguages) => newLang);

export const setCurrency = createAction(AppAction.SET_CURRENCY, (newCurrency: SupportedCoins) => newCurrency);