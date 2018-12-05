import { AccountActions, setAccounts, updateFetchedAccountTrades, updateFetchedAccountBalance, setTrade, updateFetchedAccountWithdrawals, setWithdrawal } from './actions';
import { takeEvery, all, put } from 'redux-saga/effects';
import { getAccounts, createNewAccount, getAccountTrades, updateAccount, deleteAccount, getAccountBalance, createTrade, getAccountWithdrawals, createWithdrawal } from 'businessLogic/serverApi';
import { showErrorMessage } from '../../App/redux/actions';


function* getAccountsAsync() {
    try {
        const accounts = yield getAccounts();
        yield put(setAccounts(accounts));
    }
    catch (err) {
        console.error('Failed to fetch accounts info: ', err);
        yield put(showErrorMessage('Failed to fetch accounts info'));
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
         const funds = yield getAccountWithdrawals(account);
         yield put(updateFetchedAccountWithdrawals(account.name, funds));
    }
    catch (err) {
        console.error('Failed to create a new account: ', err);
        yield put(showErrorMessage('Failed to create a new account'));
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
        const funds = yield getAccountWithdrawals(account);
        yield put(updateFetchedAccountWithdrawals(account.name, funds));
    }
    catch (err) {
        console.error('Failed to edit an account: ', err);
        yield put(showErrorMessage('Failed to edit an account'));
    }
}

function* deleteAccountAsync(action) {
    try {
        const accountName = action.payload;
        yield deleteAccount(accountName);
        yield getAccountsAsync();
    }
    catch (err) {
        console.error('Failed to delete account: ', err);
        yield put(showErrorMessage('Failed to delete account'));
    }
}

function* createTradeAsync(action) {
    try {
        const account = action.payload.account;
        const trade = action.payload.trade;
        const tradeWallet = yield createTrade(account, trade);
        yield put(setTrade(account.name, tradeWallet));
    }
    catch (err) {
        console.error('Failed to create a new trade request: ', err);
        yield put(showErrorMessage('Failed to create a new trade request'));
    }
}

function* createWithdrawalAsync(action) {
    try {
        const account = action.payload.account;
        const withdrawal = action.payload.withdrawal;
        const res = yield createWithdrawal(account, withdrawal);
        yield put(setWithdrawal(account.name, res.transactionId));

    }
    catch (err) {
        console.error('Failed to withdrawal: ', err);
        yield put(showErrorMessage('Failed to withdrawal'));
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
        yield put(showErrorMessage('Failed to fetch account trades'));
    }
}

function* fetchAccountWithdrawalsAsync(action) {
    try {
        const account = action.payload;
        const withdrawals = yield getAccountWithdrawals(account);
        yield put(updateFetchedAccountWithdrawals(account.name, withdrawals));
    }
    catch (err) {
        console.error('Failed to fetch account withdrawals: ', err);
        yield put(showErrorMessage('Failed to fetch account withdrawals'));
    }
}

function* fetchAccountBalanceAsync(action) {
    try {
        const account = action.payload;
        const balance = yield getAccountBalance(account);
        yield put(updateFetchedAccountBalance(account.name, balance));
    }
    catch (err) {
        console.error('Failed to fetch account balance: ', err);
        yield put(showErrorMessage('Failed to fetch account balance'));
    }
}

export function* AccountSagas() {
    return yield all([
        takeEvery(AccountActions.GET_ACCOUNTS, getAccountsAsync),
        takeEvery(AccountActions.CREATE_ACCOUNT, createAccountAsync),
        takeEvery(AccountActions.EDIT_ACCOUNT, editAccountAsync),
        takeEvery(AccountActions.DELETE_ACCOUNT, deleteAccountAsync),
        takeEvery(AccountActions.FETCH_ACCOUNT_TRADES, fetchAccountTradesAsync),
        takeEvery(AccountActions.FETCH_ACCOUNT_WITHDRAWALS, fetchAccountWithdrawalsAsync),
        takeEvery(AccountActions.FETCH_ACCOUNT_BALANCE, fetchAccountBalanceAsync),
        takeEvery(AccountActions.CREATE_TRADE, createTradeAsync),
        takeEvery(AccountActions.CREATE_WITHDRAWAL, createWithdrawalAsync)
    ]);
}