import { createAction } from 'redux-actions';
import { Account } from 'businessLogic/model';


export const AccountActions = {
    GET_ACCOUNTS: 'ACCOUNT/GET_ACCOUNTS',
    SET_ACCOUNTS: 'ACCOUNT/SET_ACCOUNTS',
    CREATE_ACCOUNT: 'ACCOUNT/CREATE_ACCOUNT'
};


export const getAccounts = createAction(AccountActions.GET_ACCOUNTS, () => { });
export const setAccounts = createAction(AccountActions.SET_ACCOUNTS, (accounts: Account[]) => { return accounts; });
export const createAccount = createAction(AccountActions.CREATE_ACCOUNT, (account: Account) => { return account; });