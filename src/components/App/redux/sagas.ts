
import { AppActions } from './actions';
import { takeEvery, all } from 'redux-saga/effects';
import {updateCurLang} from 'lang';
import { push } from 'connected-react-router';

function* setLangAsync(action) {
    yield updateCurLang(action.payload);
}

export function* AppSagas() {
    return yield all([
        takeEvery(AppActions.SET_LANG, setLangAsync),
    ]);
}