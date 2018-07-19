
import * as _ from 'lodash';
import {
    OrderBookActions, setExchanges, serActiveOrderBooks, setSignInToExchangeResult,
    setLogOutFromExchangeResult, getExchanges, setExchangesStatus, setUserSentOrders,
    setTimedOrderStatus, getTimedOrderStatus as getTimedOrderStatusAction
} from './actions';
import { showToast } from 'components/App/redux/actions';
import { takeEvery, all, put, select } from 'redux-saga/effects';
import {
    getExchangesSignedInInfo, getExchangesAccountBalance, getActiveOrderBook,
    signInToExchange, logOutFromExchange, startExchange, stopExchange, sendOrderCommand,
    getUserOrdersStatus, getTimedOrderStatus, cancelTimedOrder
}
    from 'businessLogic/serverApi';
import {
    Exchange, ExchangeStatus, ExchangeCoinBalance, ExchangeOrderBook,
    OrderAction, OrderActionStatus
} from 'businessLogic/model';
import { getLocalizedText } from 'lang';

const getSelectedCurrency = (state) => state.app.currency;
const getCurrentExchanges = (state) => state.orderBook.exchanges;
const getExchangesStatus = (state) => state.orderBook.exchangesStatus;

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

function* signInToExchangeAsync(action) {
    const { exchange } = action.payload;
    try {
        const res = yield signInToExchange(action.payload);
        if (res && res.set_credentials_status === 'True') {
            yield put(getExchanges());
            yield put(setSignInToExchangeResult(exchange, undefined));
            yield put(showToast({ intent: 'success', message: `Successfully connected to ${exchange}.` }));
        }
        else
            yield put(setSignInToExchangeResult(exchange, new Error('Invalid credentials.')));
    }
    catch (err) {
        yield put(setSignInToExchangeResult(exchange, err));
        console.error('Failed to sign-in to exchange: ', err);
    }
}

function* logOutFromExchangeAsync(action) {
    const exchange = action.payload;
    try {
        const res = yield logOutFromExchange(exchange);
        yield put(getExchanges());
        yield put(setLogOutFromExchangeResult(exchange, undefined));
        yield put(showToast({ intent: 'info', message: `Disconnected from ${exchange}.` }));
    }
    catch (err) {
        yield put(setLogOutFromExchangeResult(exchange, err));
        console.error('Failed to log-out from exchange: ', err);
    }
}

function* startExchangeAsync(action) {
    const exchange = action.payload;
    try {
        const res = yield startExchange(exchange);
        if (res && res.start_result === 'True') {
            yield put(getExchanges());
            yield put(showToast({ intent: 'success', message: `${exchange} was successfully started.` }));
        }
        else {
            yield put(showToast({ intent: 'error', message: `Failed to start ${exchange}.` }));
        }
    }
    catch (err) {
        console.error('Failed to start exchange: ', err);
        yield put(showToast({ intent: 'error', message: `Failed to start ${exchange}.` }));
    }
}

function* stopExchangeAsync(action) {
    const exchange = action.payload;
    try {
        const res = yield stopExchange(exchange);
        if (res && res.stop_result === 'True') {
            yield put(getExchanges());
            yield put(showToast({ intent: 'info', message: `${exchange} was stopped.` }));
        }
        else {
            yield put(showToast({ intent: 'error', message: `Failed to stop ${exchange}.` }));
        }
    }
    catch (err) {
        console.error('Failed to stop exchange: ', err);
        yield put(showToast({ intent: 'error', message: `Failed to stop ${exchange}.` }));
    }
}

function* selectExchangesAsync(action) {
    const { exchangesToAdd, exchangesToRemove } = action.payload;
    const currentExchanges: Exchange[] = yield select(getCurrentExchanges);
    const newExchangesStatus = { ...yield select(getExchangesStatus) };
    const errs = [];


    try {

        // Add exchanges
        for (let newExchange of exchangesToAdd) {
            const curExchange: Exchange = _.find(currentExchanges, { name: newExchange });
            if (!curExchange) continue;

            if (curExchange.status === ExchangeStatus.STOPPED) {
                const res = yield startExchange(newExchange);
                if (res && res.start_result === 'True') {
                    newExchangesStatus[newExchange] = true;
                }
                else {
                    errs.push(`Failed to start ${newExchange}.`);
                }
            }
            else {
                newExchangesStatus[newExchange] = true;
            }
        }

        // Remove exchanges
        for (let exchangeToRemove of exchangesToRemove) {
            const curExchange: Exchange = _.find(currentExchanges, { name: exchangeToRemove });
            if (!curExchange) continue;

            if (curExchange.status !== ExchangeStatus.STOPPED) {
                const res = yield stopExchange(exchangeToRemove);
                if (res && res.stop_result === 'True') {
                    newExchangesStatus[exchangeToRemove] = false;
                }
                else {
                    errs.push(`Failed to remove ${exchangeToRemove}.`);
                }
            }
            else {
                newExchangesStatus[exchangeToRemove] = false;
            }
        }
    }
    catch (err) {
        console.error('Failed to select exchanges: ', err);
    }

    yield put(getExchanges());
    yield put(setExchangesStatus(newExchangesStatus));

    if (!_.isEmpty(errs)) {
        yield put(showToast({ intent: 'error', message: `Failed to select ${errs.length} exchanges.` }));
    }
    else {
        if (!_.isEmpty(exchangesToAdd)) yield put(showToast({ intent: 'success', message: `${exchangesToAdd.length} were exchanges successfully addeed.` }));
    }

}

function* sendOrderCommandAsync(action) {
    try {
        const command: OrderAction = action.payload;
        const res = yield sendOrderCommand(command);
        if (res.order_status === 'True') {
            let message;
            if (command.action_type === 'buy' || command.action_type === 'sell')
                message = `Successfully ${command.action_type === 'buy' ? 'bought' : 'sold'} ${command.size_coin} ${command.crypto_type} for ${command.price_fiat} ${command.fiat_type}.`;
            else {
                message = `Successfully sent new ${getLocalizedText(command.action_type)} command for ${command.size_coin} ${command.crypto_type} for ${command.price_fiat} ${command.fiat_type}.`;
                yield put(getTimedOrderStatusAction());
            }

            yield put(showToast({
                intent: 'success',
                message: message
            }));
        }
        else {
            const message = (command.action_type === 'buy' || command.action_type === 'sell') ?
                `Unable to ${getLocalizedText(command.action_type)} ${command.size_coin} ${command.crypto_type} for ${command.price_fiat} ${command.fiat_type}.` :
                `Failed to sent new ${getLocalizedText(command.action_type)} command for ${command.size_coin} ${command.crypto_type} for ${command.price_fiat} ${command.fiat_type}.`;
            yield put(showToast({
                intent: 'error',
                message: message
            }));
        }
    }
    catch (err) {
        console.error('Failed to send new order command: ', err);
        yield put(showToast({ intent: 'error', message: 'Failed to send new order command.' }));
    }
}

function* getUserOrdersStatusAsync(action) {
    try {
        let res = yield getUserOrdersStatus(100);

        // remove duplications (same order id with different status)
        res = _.uniqBy(res, 'exchange_id');

        const normalizedData: OrderActionStatus[] = _.map(res, item => {

            // convert UTC to local time
            const dateParts = item.order_time.split('.');
            dateParts.pop();
            const utcDateStr = `${dateParts.join('.')}.000Z`;

            return {
                ...item,
                order_time: new Date(utcDateStr),
                status: item.status.toLowerCase()
            };
        });

        // calculate last week date
        const date = new Date();
        date.setDate(date.getDate() - 7);

        const lastOrders = _.filter(normalizedData, (order: OrderActionStatus) => order.order_time > date);
        yield put(setUserSentOrders(lastOrders));

    }
    catch (err) {
        console.error('Failed to fetch user send orders: ', err);
    }
}

function* getTimedOrderStatusAsync(action) {
    try {
        const res = yield getTimedOrderStatus();
        const timedOrderStatus = res.timed_order_running === 'False' ? undefined : res;
        yield put(setTimedOrderStatus(timedOrderStatus));
    }
    catch (err) {
        console.error('Failed to fetch timed order status: ', err);
    }
}

function* cancelTimedOrderAsync(action) {
    try {
        const res = yield cancelTimedOrder();
    }
    catch (err) {
        console.error('Failed to fetch timed order status: ', err);
    }
}


export function* OrderBookSagas() {
    return yield all([
        takeEvery(OrderBookActions.GET_EXCHANGES, getExchangesAsync),
        takeEvery(OrderBookActions.GET_ACTIVE_ORDER_BOOKS, getActiveOrdersAsync),
        takeEvery(OrderBookActions.SIGN_IN_TO_EXCHANGE, signInToExchangeAsync),
        takeEvery(OrderBookActions.LOG_OUT_FROM_EXCHANGE, logOutFromExchangeAsync),
        takeEvery(OrderBookActions.START_EXCHANGE, startExchangeAsync),
        takeEvery(OrderBookActions.STOP_EXCHANGE, stopExchangeAsync),
        takeEvery(OrderBookActions.SELECT_EXCHANGES, selectExchangesAsync),
        takeEvery(OrderBookActions.SEND_ORDER_COMMAND, sendOrderCommandAsync),
        takeEvery(OrderBookActions.GET_USER_SENT_ORDERS, getUserOrdersStatusAsync),
        takeEvery(OrderBookActions.GET_TIMED_ORDER_STATUS, getTimedOrderStatusAsync),
        takeEvery(OrderBookActions.CANCEL_TIMED_ORDER, cancelTimedOrderAsync),
    ]);
}