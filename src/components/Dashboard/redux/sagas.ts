
import { DashboardActions, setUserBalance, setExchangeRates } from './actions';
import { takeEvery, all, put, actionChannel } from 'redux-saga/effects';
import { getTotalUserBalance, getExchangeRates } from 'businessLogic/serverApi';


function* getUserBalanceAsync() {
    const userBalance = getTotalUserBalance();
    yield put(setUserBalance(userBalance));
}

function* getExchangeRatesAsync() {
    const exchangeRates = getExchangeRates();
    yield put(setExchangeRates(exchangeRates));
}



export function* DashboardSagas() {
    return yield all([
        takeEvery(DashboardActions.GET_USER_BALANCE, getUserBalanceAsync),
        takeEvery(DashboardActions.GET_EXCHANGE_RATES, getExchangeRatesAsync),
    ]);
}