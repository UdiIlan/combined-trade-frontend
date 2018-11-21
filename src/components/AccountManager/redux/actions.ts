import { createAction } from 'redux-actions';


export const AccountActions = {
    GET_ACCOUNTS: 'ACCOUNT/GET_ACCOUNTS',
    SET_ACCOUNTS: 'ACCOUNT/SET_ACCOUNTS'
};


export const getAccounts = createAction(AccountActions.GET_ACCOUNTS, () => {});
export const setAccounts = createAction(AccountActions.SET_ACCOUNTS, (accounts: Account[]) => { return accounts; });