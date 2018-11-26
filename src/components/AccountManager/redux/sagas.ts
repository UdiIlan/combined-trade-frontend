import { AccountActions, setAccounts, updateFetchedAccountTrades } from './actions';
import { takeEvery, all, put } from 'redux-saga/effects';
import { getAccounts, createNewAccount, getAccountTrades, updateAccount, deleteAccount } from 'businessLogic/serverApi';


function* getAccountsAsync() {
    const accounts = yield getAccounts();
    yield put(setAccounts(accounts));
}

function* createAccountAsync(action) {
    const account = action.payload;
    yield createNewAccount(account);
    yield getAccountsAsync();
}

function* editAccountAsync(action) {
    const account = action.payload;
    yield updateAccount(account);
    yield getAccountsAsync();
}

function* deleteAccountAsync(action) {
    const accountName = action.payload;
    yield deleteAccount(accountName);
    yield getAccountsAsync();
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
        takeEvery(AccountActions.EDIT_ACCOUNT, editAccountAsync),
        takeEvery(AccountActions.DELETE_ACCOUNT, deleteAccountAsync),
        takeEvery(AccountActions.FETCH_ACCOUNT_TRADES, fetchAccountTradesAsync)
    ]);
}