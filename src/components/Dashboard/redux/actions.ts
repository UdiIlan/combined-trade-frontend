import { createAction } from 'redux-actions';


export const DashboardActions = {
    GET_USER_BALANCE: 'DASHBOARD/GET_USER_BALANCE',
    SET_USER_BALANCE: 'DASHBOARD/SET_USER_BALANCE',
    GET_EXCHANGE_RATES: 'DASHBOARD/GET_EXCHANGE_RATES',
    SET_EXCHANGE_RATES: 'DASHBOARD/SET_EXCHANGE_RATES',
    GET_CURRENCY_TREND: 'DASHBOARD/GET_CURRENCY_TREND',
    SET_CURRENCY_TREND: 'DASHBOARD/SET_CURRENCY_TREND'
};


export const getUserBalance = createAction(DashboardActions.GET_USER_BALANCE, () => {});
export const setUserBalance = createAction(DashboardActions.SET_USER_BALANCE, (userBalance: object) => { return userBalance; });
export const getExchangeRates = createAction(DashboardActions.GET_EXCHANGE_RATES, () => {});
export const setExchangeRates = createAction(DashboardActions.SET_EXCHANGE_RATES, (exchangeRates: object) => { return exchangeRates; });
export const getCurrencyTrend = createAction(DashboardActions.GET_CURRENCY_TREND, (currency: string) => { return currency; });
export const setCurrencyTrend = createAction(DashboardActions.SET_CURRENCY_TREND, (trendData: object[]) => { return trendData; });

