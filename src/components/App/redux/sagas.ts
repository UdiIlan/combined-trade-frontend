
import AppActions from './constants';
import { takeEvery, all } from 'redux-saga/effects';
import {updateCurLang} from 'lang';

function* setLangAsync(action) {
    yield updateCurLang(action.payload);
}

export function* AppSagas() {
    return yield all([
        takeEvery(AppActions.SET_LANG, setLangAsync),
    ]);
}