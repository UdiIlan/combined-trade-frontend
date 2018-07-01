import AppAction from './constants';
import { createAction } from 'redux-actions';
import { SupportedLanguages } from 'lang';

export const sesLanguage = createAction(AppAction.SET_LANG, (newLang: SupportedLanguages) => newLang);