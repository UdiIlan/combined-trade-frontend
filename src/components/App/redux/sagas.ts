
import { AppActions, setLoggedInUser } from './actions';
import { takeEvery, all, put } from 'redux-saga/effects';
import {updateCurLang} from 'lang';
import { push } from 'connected-react-router';

function* setLangAsync(action) {
    yield updateCurLang(action.payload);
}

function* doLoginAsync(action) {
    const { userName, password } = action.payload;
    yield put(setLoggedInUser(userName));
    yield put(push('/'));
}

export function* AppSagas() {
    return yield all([
        takeEvery(AppActions.SET_LANG, setLangAsync),
        takeEvery(AppActions.LOGIN, doLoginAsync),
    ]);
}