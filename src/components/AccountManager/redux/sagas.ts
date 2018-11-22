import { AccountActions, setAccounts, updateFetchedAccountTrades } from './actions';
import { takeEvery, all, put } from 'redux-saga/effects';
import { getAccounts, getAccountTrades } from 'businessLogic/serverApi';


function* getAccountsAsync(action) {
    const accounts = yield getAccounts();
    yield put(setAccounts(accounts));
}

function* fetchAccountTradesAsync(action) {
    const account = action.payload;
    const trades = yield getAccountTrades(account);
    yield put(updateFetchedAccountTrades(account.name, trades));
}

export function* AccountSagas() {
    return yield all([
        takeEvery(AccountActions.GET_ACCOUNTS, getAccountsAsync),
        takeEvery(AccountActions.FETCH_ACCOUNT_TRADES, fetchAccountTradesAsync)
    ]);
}