import { createAction } from 'redux-actions';
import {
    Exchange, ExchangeOrderBook, AccountCredentials, OrderAction,
    OrderActionStatus, TimedOrderActionStatus
} from 'businessLogic/model';

export const OrderBookActions = {
    GET_EXCHANGES: 'OrderBook/GET_EXCHANGES',
    SET_EXCHANGES: 'OrderBook/SET_EXCHANGES',
    GET_ACTIVE_ORDER_BOOKS: 'OrderBook/GET_ACTIVE_ORDER_BOOKS',
    SET_ACTIVE_ORDER_BOOKS: 'OrderBook/SET_ACTIVE_ORDER_BOOKS',
    SIGN_IN_TO_EXCHANGE: 'OrderBook/SIGN_IN_TO_EXCHANGE',
    SIGN_IN_TO_EXCHANGE_RESULT: 'OrderBook/SIGN_IN_TO_EXCHANGE_RESULT',
    LOG_OUT_FROM_EXCHANGE: 'OrderBook/LOG_OUT_FROM_EXCHANGE',
    LOG_OUT_FROM_EXCHANGE_RESULT: 'OrderBook/LOG_OUT_FROM_EXCHANGE_RESULT',
    STOP_EXCHANGE: 'OrderBook/STOP_EXCHANGE',
    START_EXCHANGE: 'OrderBook/START_EXCHANGE',
    REMOVE_EXCHANGE: 'OrderBook/REMOVE_EXCHANGE',
    SEND_ORDER_COMMAND: 'OrderBook/SEND_ORDER_COMMAND',
    SELECT_EXCHANGES: 'OrderBook/SELECT_EXCHANGES',
    SET_EXCHANGES_STATUS: 'OrderBook/SET_EXCHANGES_STATUS',
    GET_USER_SENT_ORDERS: 'OrderBook/GET_USER_SENT_ORDERS',
    SET_USER_SENT_ORDERS: 'OrderBook/SET_USER_SENT_ORDERS',
    GET_TIMED_ORDER_STATUS: 'OrderBook/GET_TIMED_ORDER_STATUS',
    SET_TIMED_ORDER_STATUS: 'OrderBook/SET_TIMED_ORDER_STATUS',
    CANCEL_TIMED_ORDER: 'OrderBook/CANCEL_TIMED_ORDER',
    SET_ACCOUNT_BALANCE: 'OrderBook/SET_ACCOUNT_BALANCE',
};

export const getExchanges = createAction(OrderBookActions.GET_EXCHANGES);

export const setExchanges = createAction(OrderBookActions.SET_EXCHANGES, (exchanges: Exchange[]) => exchanges);

export const getActiveOrderBooks = createAction(OrderBookActions.GET_ACTIVE_ORDER_BOOKS, () => { });

export const serActiveOrderBooks = createAction(OrderBookActions.SET_ACTIVE_ORDER_BOOKS, (orderBooks: ExchangeOrderBook[]) => orderBooks);

export const signInToExchange = createAction(OrderBookActions.SIGN_IN_TO_EXCHANGE, (creds: AccountCredentials) => creds);

export const setSignInToExchangeResult = createAction(OrderBookActions.SIGN_IN_TO_EXCHANGE_RESULT, (exchange: string, err: Error) => { return { exchange, err }; });

export const logOutFromExchange = createAction(OrderBookActions.LOG_OUT_FROM_EXCHANGE, (exchange: string) => exchange);

export const setLogOutFromExchangeResult = createAction(OrderBookActions.LOG_OUT_FROM_EXCHANGE_RESULT, (exchange: string, err: Error) => { return { exchange, err }; });

export const startExchange = createAction(OrderBookActions.START_EXCHANGE, (exchange: string) => exchange);

export const stopExchange = createAction(OrderBookActions.STOP_EXCHANGE, (exchange: string) => exchange);

export const removeExchange = createAction(OrderBookActions.REMOVE_EXCHANGE, (exchange: string) => exchange);

export const selectExchanges = createAction(OrderBookActions.SELECT_EXCHANGES, (exchangesToAdd: string[], exchangesToRemove: string[]) => { return { exchangesToAdd, exchangesToRemove }; });

export const setExchangesStatus = createAction(OrderBookActions.SET_EXCHANGES_STATUS, (exchangesStatus: {}) => exchangesStatus);

export const sendOrderCommand = createAction(OrderBookActions.SEND_ORDER_COMMAND, (command: OrderAction) => command);

export const getUserOrdersStatus = (limit = 100) => {
    const getUserOrdersStatusCreator =  createAction(OrderBookActions.GET_USER_SENT_ORDERS, (limit: number) => limit);
    return getUserOrdersStatusCreator(limit);
};

export const setUserSentOrders = createAction(OrderBookActions.SET_USER_SENT_ORDERS, (lastOrders: OrderActionStatus[]) => lastOrders);

export const getTimedOrderStatus = createAction(OrderBookActions.GET_TIMED_ORDER_STATUS, () => { });

export const setTimedOrderStatus = createAction(OrderBookActions.SET_TIMED_ORDER_STATUS, (timedOrder: TimedOrderActionStatus) => timedOrder);

export const cancelTimedOrder = createAction(OrderBookActions.CANCEL_TIMED_ORDER, () => { });

export const setAccountBalance = createAction(OrderBookActions.SET_ACCOUNT_BALANCE, (newBalance) => newBalance);
