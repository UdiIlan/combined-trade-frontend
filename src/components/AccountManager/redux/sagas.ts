import { AccountActions, setAccounts, updateFetchedAccountTrades, updateFetchedAccountBalance, setTrade } from './actions';
import { takeEvery, all, put } from 'redux-saga/effects';
import { getAccounts, createNewAccount, getAccountTrades, updateAccount, deleteAccount, getAccountBalance, createTrade } from 'businessLogic/serverApi';


function* getAccountsAsync() {
    try {
        const accounts = yield getAccounts();
        yield put(setAccounts(accounts));
    }
    catch (err) {
        console.error('Failed to fetch accounts info: ', err);
    }
}

function* createAccountAsync(action) {
    try {
        const account = action.payload;
        yield createNewAccount(account);
        yield getAccountsAsync();
         const trades = yield getAccountTrades(account);
         yield put(updateFetchedAccountTrades(account.name, trades));
         const balance = yield getAccountBalance(account);
         yield put(updateFetchedAccountBalance(account.name, balance));
    }
    catch (err) {
        console.error('Failed to create a new account: ', err);
    }
}

function* editAccountAsync(action) {
    try {
        const account = action.payload;
        yield updateAccount(account);
        yield getAccountsAsync();
        const trades = yield getAccountTrades(account);
        yield put(updateFetchedAccountTrades(account.name, trades));
        const balance = yield getAccountBalance(account);
        yield put(updateFetchedAccountBalance(account.name, balance));
    }
    catch (err) {
        console.error('Failed to edit an account: ', err);
    }
}

function* deleteAccountAsync(action) {
    try {
        const accountName = action.payload;
        yield deleteAccount(accountName);
        yield getAccountsAsync();
    }
    catch (err) {
        console.error('Failed to create new trade: ', err);
    }
}

function* createTradeAsync(action) {
    try {
        const account = action.payload.account;
        const trade = action.payload.trade;
        const tradeWallet = yield createTrade(account, trade);
        yield put(setTrade(account.name, tradeWallet));
        // yield getAccountsAsync();
    }
    catch (err) {
        console.error('Failed to delete an account: ', err);
    }
}

function* fetchAccountTradesAsync(action) {
    try {
        const account = action.payload;
        const trades = yield getAccountTrades(account);
        yield put(updateFetchedAccountTrades(account.name, trades));
    }
    catch (err) {
        console.error('Failed to fetch account trades: ', err);
    }
}

function* fetchAccountBalanceAsync(action) {
    try {
        const account = action.payload;
        const balance = yield getAccountBalance(account);
        yield put(updateFetchedAccountBalance(account.name, balance));
    }
    catch (err) {
        console.error('Failed to fetch account trades: ', err);
    }
}

export function* AccountSagas() {
    return yield all([
        takeEvery(AccountActions.GET_ACCOUNTS, getAccountsAsync),
        takeEvery(AccountActions.CREATE_ACCOUNT, createAccountAsync),
        takeEvery(AccountActions.EDIT_ACCOUNT, editAccountAsync),
        takeEvery(AccountActions.DELETE_ACCOUNT, deleteAccountAsync),
        takeEvery(AccountActions.FETCH_ACCOUNT_TRADES, fetchAccountTradesAsync),
        takeEvery(AccountActions.FETCH_ACCOUNT_BALANCE, fetchAccountBalanceAsync),
        takeEvery(AccountActions.CREATE_TRADE, createTradeAsync)
    ]);
}