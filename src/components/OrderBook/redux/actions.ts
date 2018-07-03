import { createAction } from 'redux-actions';
import { Exchange, ExchangeOrderBook } from 'businessLogic/model';

export const OrderBookActions = {
    GET_EXCHANGES: 'OrderBook/GET_EXCHANGES',
    SET_EXCHANGES: 'OrderBook/SET_EXCHANGES',
    GET_ACTIVE_ORDER_BOOKS: 'OrderBook/GET_ACTIVE_ORDER_BOOKS',
    SET_ACTIVE_ORDER_BOOKS: 'OrderBook/SET_ACTIVE_ORDER_BOOKS',
};

export const getExchanges = createAction(OrderBookActions.GET_EXCHANGES);

export const setExchanges = createAction(OrderBookActions.SET_EXCHANGES, (exchanges: Exchange[]) => exchanges);

export const getActiveOrderBooks = createAction(OrderBookActions.GET_ACTIVE_ORDER_BOOKS, () => { });

export const serActiveOrderBooks = createAction(OrderBookActions.SET_ACTIVE_ORDER_BOOKS, (orderBooks: ExchangeOrderBook[]) => orderBooks);