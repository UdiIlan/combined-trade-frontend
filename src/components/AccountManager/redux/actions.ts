import { createAction } from 'redux-actions';
import { Account, OrderStatus, TradeRequest, WithdrawalRequest } from 'businessLogic/model';


export const AccountActions = {
    GET_ACCOUNTS: 'ACCOUNT/GET_ACCOUNTS',
    SET_ACCOUNTS: 'ACCOUNT/SET_ACCOUNTS',
    CREATE_ACCOUNT: 'ACCOUNT/CREATE_ACCOUNT',
    EDIT_ACCOUNT: 'ACCOUNT/EDIT_ACCOUNT',
    DELETE_ACCOUNT: 'ACCOUNT/DELETE_ACCOUNT',
    FETCH_ACCOUNT_BALANCE: 'ACCOUNT/FETCH_ACCOUNT_BALANCE',
    UPDATE_FETCHED_ACCOUNT_BALANCE: 'ACCOUNT/UPDATE_FETCHED_ACCOUNT_BALANCE',
    CREATE_TRADE: 'ACCOUNT/TRADE/CREATE_TRADE',
    SET_TRADE: 'ACCOUNT/TRADE/SET_TRADE',
    FETCH_ACCOUNT_TRADES: 'ACCOUNT/TRADE/GET_ORDERS',
    UPDATE_FETCHED_ACCOUNT_TRADES: 'ACCOUNT/TRADE/UPDATE_FETCHED_ACCOUNT_TRADES',
    RESET_NEW_TRADE: 'ACCOUNT/TRADE/RESET_NEW_TRADE',
    FETCH_ACCOUNT_WITHDRAWALS: 'ACCOUNT/FUNDS/GET_WITHDRAWALS',
    UPDATE_FETCHED_ACCOUNT_WITHDRAWALS: 'ACCOUNT/FUNDS/UPDATE_FETCHED_ACCOUNT_WITHDRAWALS',
    CREATE_WITHDRAWAL: 'ACCOUNT/FUNDS/CREATE_WITHDRAWAL',
    RESET_NEW_WITHDRAWAL: 'ACCOUNT/FUNDS/RESET_NEW_WITHDRAWAL',
};


export const getAccounts = createAction(AccountActions.GET_ACCOUNTS, () => { });
export const setAccounts = createAction(AccountActions.SET_ACCOUNTS, (accounts: Account[]) => { return accounts; });
export const createAccount = createAction(AccountActions.CREATE_ACCOUNT, (account: Account) => { return account; });
export const editAccount = createAction(AccountActions.EDIT_ACCOUNT, (account: Account) => { return account; });
export const deleteAccount = createAction(AccountActions.DELETE_ACCOUNT, (accountName: string) => { return accountName; });
export const fetchAccountTrades = createAction(AccountActions.FETCH_ACCOUNT_TRADES, (account: Account) => account);
export const fetchAccountBalance = createAction(AccountActions.FETCH_ACCOUNT_BALANCE, (account: Account) => account);
export const fetchAccountWithdrawals = createAction(AccountActions.FETCH_ACCOUNT_WITHDRAWALS, (account: Account) => account);
export const createTrade = createAction(AccountActions.CREATE_TRADE, (account: Account, trade: TradeRequest) => { return { account, trade }; });
export const createWithdrawal = createAction(AccountActions.CREATE_WITHDRAWAL, (account: Account, withdrawal: WithdrawalRequest) => { return { account, withdrawal }; });
export const setTrade = createAction(AccountActions.SET_TRADE, (accountName: string, tradeWallet: object[]) => { return {accountName, tradeWallet}; });
export const updateFetchedAccountTrades = createAction(AccountActions.UPDATE_FETCHED_ACCOUNT_TRADES, (accountName: string, trades: OrderStatus[]) => { return { accountName, trades }; });
export const updateFetchedAccountBalance = createAction(AccountActions.UPDATE_FETCHED_ACCOUNT_BALANCE, (accountName: string, balance: object) => { return { accountName, balance }; });
export const updateFetchedAccountWithdrawals = createAction(AccountActions.UPDATE_FETCHED_ACCOUNT_WITHDRAWALS, (accountName: string, withdrawals: object) => { return { accountName, withdrawals }; });
export const resetNewTrade = createAction(AccountActions.RESET_NEW_TRADE, () => { });
export const resetNewWithdrawal = createAction(AccountActions.RESET_NEW_WITHDRAWAL, () => { });
