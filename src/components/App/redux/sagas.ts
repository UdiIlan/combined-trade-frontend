
import { AppActions, setLoggedInUser, setLoggedInTime, setWrongUserDetails } from './actions';
import { takeEvery, all, put } from 'redux-saga/effects';
import {updateCurLang} from 'lang';
import { push } from 'connected-react-router';


function* setLangAsync(action) {
    yield updateCurLang(action.payload);
}

function* doLoginAsync(action) {
    const { userName, password } = action.payload;
    if (userName === 'admin' && password === 'admin') {
        yield put(setLoggedInUser(userName));
        yield setLoggedInTime(new Date());
        yield put(push('/'));
    }
    else {
        yield put(setWrongUserDetails());
    }
}

export function* AppSagas() {
    return yield all([
        takeEvery(AppActions.SET_LANG, setLangAsync),
        takeEvery(AppActions.LOGIN, doLoginAsync),
    ]);
}