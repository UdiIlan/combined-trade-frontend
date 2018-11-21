import { AccountActions, setAccounts } from './actions';
import { takeEvery, all, put, actionChannel } from 'redux-saga/effects';
import { getAccounts } from 'businessLogic/serverApi';


function* getAccountsAsync(action) {
    const accounts = getAccounts();
    yield put(setAccounts(accounts));
}



export function* DashboardSagas() {
    return yield all([
        takeEvery(AccountActions.GET_ACCOUNTS, getAccountsAsync),
    ]);
}