import { AccountActions, setAccounts } from './actions';
import { takeEvery, all, put } from 'redux-saga/effects';
import { getAccounts, createNewAccount } from 'businessLogic/serverApi';


function* getAccountsAsync(action) {
    const accounts = yield getAccounts();
    yield put(setAccounts(accounts));
}

function* createAccountAsync(action) {
    const accounts = yield createNewAccount(action.payload);
}

export function* AccountSagas() {
    return yield all([
        takeEvery(AccountActions.GET_ACCOUNTS, getAccountsAsync),
        takeEvery(AccountActions.CREATE_ACCOUNT, createAccountAsync),
    ]);
}