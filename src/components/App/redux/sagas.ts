
import { AppActions, setLoggedInUser } from './actions';
import { takeEvery, all, put } from 'redux-saga/effects';
import { updateCurLang } from 'lang';

function* setLangAsync(action) {
    yield updateCurLang(action.payload);
}

function* doLoginAsync(action) {
    const { userName, password } = action.payload;
    yield put(setLoggedInUser(userName));
    // yield history.push('/');
}

export function* AppSagas() {
    return yield all([
        takeEvery(AppActions.SET_LANG, setLangAsync),
        takeEvery(AppActions.LOGIN, doLoginAsync),
    ]);
}