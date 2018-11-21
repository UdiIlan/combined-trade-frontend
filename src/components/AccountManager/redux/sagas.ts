import { AccountActions, setAccounts } from './actions';
import { takeEvery, all, put } from 'redux-saga/effects';
import { getAccounts } from 'businessLogic/serverApi';


function* getAccountsAsync(action) {
    const accounts = yield getAccounts();
    yield put(setAccounts(accounts));
}

export function* AccountSagas() {
    return yield all([
        takeEvery(AccountActions.GET_ACCOUNTS, getAccountsAsync)
    ]);
}