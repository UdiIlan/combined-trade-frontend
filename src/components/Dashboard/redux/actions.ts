import { createAction } from 'redux-actions';


export const DashboardActions = {
    GET_USER_BALANCE: 'DASHBOARD/GET_USER_BALANCE',
    SET_USER_BALANCE: 'DASHBOARD/SET_USER_BALANCE'
};


export const getUserBalance = createAction(DashboardActions.GET_USER_BALANCE, () => {});
export const setUserBalance = createAction(DashboardActions.SET_USER_BALANCE, (userBalance: object) => { return { userBalance}; });

