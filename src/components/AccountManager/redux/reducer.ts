import { AccountActions } from './actions';
import { handleActions, Action } from 'redux-actions';
import { Account } from '../../../businessLogic/model';


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



export default handleActions<AccountState, any>(reducerMap, INITIAL_STATE);