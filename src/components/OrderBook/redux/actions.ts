import { createAction } from 'redux-actions';
import { Exchange, ExchangeOrderBook, AccountCredentials } from 'businessLogic/model';

export const OrderBookActions = {
    GET_EXCHANGES: 'OrderBook/GET_EXCHANGES',
    SET_EXCHANGES: 'OrderBook/SET_EXCHANGES',
    GET_ACTIVE_ORDER_BOOKS: 'OrderBook/GET_ACTIVE_ORDER_BOOKS',
    SET_ACTIVE_ORDER_BOOKS: 'OrderBook/SET_ACTIVE_ORDER_BOOKS',
    SIGN_IN_TO_EXCHANGE: 'OrderBook/SIGN_IN_TO_EXCHANGE',
    SIGN_IN_TO_EXCHANGE_RESULT: 'OrderBook/SIGN_IN_TO_EXCHANGE_RESULT',
    LOG_OUT_FROM_EXCHANGE: 'OrderBook/LOG_OUT_FROM_EXCHANGE',
    LOG_OUT_FROM_EXCHANGE_RESULT: 'OrderBook/LOG_OUT_FROM_EXCHANGE_RESULT'
};

export const getExchanges = createAction(OrderBookActions.GET_EXCHANGES);

export const setExchanges = createAction(OrderBookActions.SET_EXCHANGES, (exchanges: Exchange[]) => exchanges);

export const getActiveOrderBooks = createAction(OrderBookActions.GET_ACTIVE_ORDER_BOOKS, () => { });

export const serActiveOrderBooks = createAction(OrderBookActions.SET_ACTIVE_ORDER_BOOKS, (orderBooks: ExchangeOrderBook[]) => orderBooks);

export const signInToExchange = createAction(OrderBookActions.SIGN_IN_TO_EXCHANGE, (creds: AccountCredentials) => creds);

export const setSignInToExchangeResult = createAction(OrderBookActions.SIGN_IN_TO_EXCHANGE_RESULT, (exchange: string, err: Error) => { return { exchange, err }; });

export const logOutFromExchange = createAction(OrderBookActions.LOG_OUT_FROM_EXCHANGE, (exchange: string) => exchange);

export const setLogOutFromExchangeResult = createAction(OrderBookActions.LOG_OUT_FROM_EXCHANGE_RESULT, (exchange: string, err: Error) => { return { exchange, err }; });
