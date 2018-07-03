
import * as _ from 'lodash';
import { OrderBookActions, setExchanges, serActiveOrderBooks } from './actions';
import { takeEvery, all, put, select } from 'redux-saga/effects';
import { getExchangesSignedInInfo, getExchangesAccountBalance, getActiveOrderBook } from 'businessLogic/serverApi';
import { Exchange, ExchangeStatus, ExchangeCoinBalance, ExchangeOrderBook } from 'businessLogic/model';

const getSelectedCurrency = (state) => state.app.currency;
const getExchanges = (state) => state.orderBook.exchanges;

function* getExchangesAsync(action) {
    try {
        const signedInInfo = yield getExchangesSignedInInfo();
        const accountBalance = yield getExchangesAccountBalance();

        const exchanges = _.map(Object.keys(signedInInfo), key => {
            const exchange = signedInInfo[key];
            const balance = accountBalance[key];
            const currencyBalances = balance && balance['balances'];
            return {
                name: key,
                status: exchange['is_user_signed_in'] === 'True' ? ExchangeStatus.LOGGED_IN : ExchangeStatus.RUNNING,
                signedInUser: exchange['signed_in_user'],
                fees: balance && balance['fees'],
                totalUSD: balance && balance['total_usd_value'] && balance['total_usd_value'].toFixed(2),
                balance: (!!currencyBalances ?
                    _.map(Object.keys(currencyBalances), key => {
                        const coinBalance = currencyBalances[key];
                        const fixedDecimalDigits = key === 'USD' ? 2 : 4;
                        return {
                            coin: key,
                            amount: !!coinBalance.amount ? coinBalance.amount.toFixed(fixedDecimalDigits) : undefined,
                            available: !!coinBalance.amount ? coinBalance.amount.toFixed(fixedDecimalDigits) : undefined,
                            price: coinBalance.price
                        } as ExchangeCoinBalance;
                    })
                    :
                    undefined)
            } as Exchange;
        });

        yield put(setExchanges(exchanges));
    }
    catch (err) {
        console.error('Failed to fetch exchanges info: ', err);
    }
}

function* getActiveOrdersAsync(action) {
    try {
        const selectedCurrency = yield select(getSelectedCurrency);
        const res = yield getActiveOrderBook(selectedCurrency);
        const activeBooks = _.map(Object.keys(res), key => {
            const orderBook = res[key];
            const exchangeOB = {
                exchange: key,
                asks: orderBook.asks,
                bids: orderBook.bids,
                averageSpread: !!orderBook['average_spread'] ? orderBook['average_spread'].toFixed(2) : undefined,
                lastPrice: orderBook['last_price']
            } as ExchangeOrderBook;

            if (!_.isEmpty(exchangeOB.asks) && !_.isEmpty(exchangeOB.asks)) {
                exchangeOB.currentSpread = exchangeOB.asks[0].price - exchangeOB.bids[0].price;
            }

            return exchangeOB;
        });
        yield put(serActiveOrderBooks(activeBooks));
    }
    catch (err) {
        console.error('Failed to fetch active order books: ', err);
    }
}

export function* OrderBookSagas() {
    return yield all([
        takeEvery(OrderBookActions.GET_EXCHANGES, getExchangesAsync),
        takeEvery(OrderBookActions.GET_ACTIVE_ORDER_BOOKS, getActiveOrdersAsync)
    ]);
}