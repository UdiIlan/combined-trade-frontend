import * as _ from 'lodash';
import { AccountActions } from './actions';
import { handleActions, Action } from 'redux-actions';
import { Account, OrderStatus } from 'businessLogic/model';



export interface AccountState {
    accounts: Account[];
}

const INITIAL_STATE: AccountState = {
    accounts: []
};

let reducerMap = {};

reducerMap[AccountActions.SET_ACCOUNTS] = (state: AccountState, action: Action<any>): AccountState => {
    return { ...state, accounts: action.payload };
};

reducerMap[AccountActions.FETCH_ACCOUNT_TRADES] = (state: AccountState, action: Action<{ accountName: string, trades: OrderStatus[] }>): AccountState => {
    if (_.isEmpty(state.accounts)) return state;

    const { accountName, trades } = action.payload;
    let accountIndex = _.findIndex(state.accounts, { name: accountName });

    if (accountIndex < 0) return state;

    const newAccounts = [...state.accounts];
    const account = { ...newAccounts[accountIndex] };
    account.trades = trades;

    return { ...state, accounts: newAccounts };
};

export default handleActions<AccountState, any>(reducerMap, INITIAL_STATE);