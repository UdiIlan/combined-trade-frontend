import { AccountActions, setAccounts, updateFetchedAccountTrades } from './actions';
import { takeEvery, all, put } from 'redux-saga/effects';
import { getAccounts, createNewAccount, getAccountTrades } from 'businessLogic/serverApi';


function* getAccountsAsync(action) {
    const accounts = yield getAccounts();
    yield put(setAccounts(accounts));
}

function* createAccountAsync(action) {
    const accounts = yield createNewAccount(action.payload);

}

function* fetchAccountTradesAsync(action) {
    const account = action.payload;
    const trades = yield getAccountTrades(account);
    yield put(updateFetchedAccountTrades(account.name, trades));
}

export function* AccountSagas() {
    return yield all([
        takeEvery(AccountActions.GET_ACCOUNTS, getAccountsAsync),
        takeEvery(AccountActions.CREATE_ACCOUNT, createAccountAsync),
        takeEvery(AccountActions.FETCH_ACCOUNT_TRADES, fetchAccountTradesAsync)
    ]);
}