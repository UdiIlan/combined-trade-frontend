
import { DashboardActions, setUserBalance, setExchangeRates, setCurrencyTrend } from './actions';
import { takeEvery, all, put, actionChannel } from 'redux-saga/effects';
import { getTotalUserBalance, getExchangeRates, getTrendData } from 'businessLogic/serverApi';


function* getUserBalanceAsync() {
    const userBalance = getTotalUserBalance();
    yield put(setUserBalance(userBalance));
}

function* getExchangeRatesAsync() {
    const exchangeRates = getExchangeRates();
    yield put(setExchangeRates(exchangeRates));
}

function* getCurrencyTrendAsync(action) {
    const currency = action.payload;
    const trendData = getTrendData(currency);
    yield put(setCurrencyTrend(trendData));
}



export function* DashboardSagas() {
    return yield all([
        takeEvery(DashboardActions.GET_USER_BALANCE, getUserBalanceAsync),
        takeEvery(DashboardActions.GET_EXCHANGE_RATES, getExchangeRatesAsync),
        takeEvery(DashboardActions.GET_CURRENCY_TREND, getCurrencyTrendAsync),
    ]);
}