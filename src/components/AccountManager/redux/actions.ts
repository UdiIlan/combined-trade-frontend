import { createAction } from 'redux-actions';
import { Account, OrderStatus } from 'businessLogic/model';


export const AccountActions = {
    GET_ACCOUNTS: 'ACCOUNT/GET_ACCOUNTS',
    SET_ACCOUNTS: 'ACCOUNT/SET_ACCOUNTS',
    CREATE_ACCOUNT: 'ACCOUNT/CREATE_ACCOUNT',
    EDIT_ACCOUNT: 'ACCOUNT/EDIT_ACCOUNT',
    DELETE_ACCOUNT: 'ACCOUNT/DELETE_ACCOUNT',
    FETCH_ACCOUNT_TRADES: 'ACCOUNT/TRADE/GET_ORDERS',
    UPDATE_FETCHED_ACCOUNT_TRADES: 'ACCOUNT/TRADE/UPDATE_FETCHED_ACCOUNT_TRADES'
};


export const getAccounts = createAction(AccountActions.GET_ACCOUNTS, () => { });
export const setAccounts = createAction(AccountActions.SET_ACCOUNTS, (accounts: Account[]) => { return accounts; });
export const createAccount = createAction(AccountActions.CREATE_ACCOUNT, (account: Account) => { return account; });
export const editAccount = createAction(AccountActions.EDIT_ACCOUNT, (account: Account) => { return account; });
export const deleteAccount = createAction(AccountActions.DELETE_ACCOUNT, (accountName: string) => { return accountName; });
export const fetchAccountTrades = createAction(AccountActions.FETCH_ACCOUNT_TRADES, (account: Account) => account);
export const updateFetchedAccountTrades = createAction(AccountActions.UPDATE_FETCHED_ACCOUNT_TRADES, (accountName: string, trades: OrderStatus[]) => { return { accountName, trades }; });
