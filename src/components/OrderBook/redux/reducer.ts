import * as _ from 'lodash';
import { OrderBookActions } from './actions';
import { handleActions, Action } from 'redux-actions';
import { Exchange, ExchangeOrderBook, AccountCredentials, ExchangeStatus } from 'businessLogic/model';

export interface OrderBookState {
    exchanges: Exchange[];
    loading?: boolean;
    removedExchanges: string[];
}

const INITIAL_STATE: OrderBookState = {
    exchanges: [],
    loading: true,
    removedExchanges: []
};

let reducerMap = {};

reducerMap[OrderBookActions.GET_EXCHANGES] = (state: OrderBookState, action: Action<void>): OrderBookState => {
    return { ...state, loading: true };
};

reducerMap[OrderBookActions.SET_EXCHANGES] = (state: OrderBookState, action: Action<Exchange[]>): OrderBookState => {
    return { ...state, exchanges: action.payload, loading: false };
};

reducerMap[OrderBookActions.SET_ACTIVE_ORDER_BOOKS] = (state: OrderBookState, action: Action<ExchangeOrderBook[]>): OrderBookState => {
    const orderBooks = action.payload;
    const exchanges = [...state.exchanges];

    _.forEach(exchanges, exchange => {
        const ob = _.find(orderBooks, { exchange: exchange.name });
        if (!ob)
            exchange.status = ExchangeStatus.STOPPED;
        else
            exchange.orderBook = ob;
    });
    return { ...state, exchanges: exchanges };
};

reducerMap[OrderBookActions.SIGN_IN_TO_EXCHANGE] = (state: OrderBookState, action: Action<AccountCredentials>): OrderBookState => {
    const exchanges = [...state.exchanges];
    const exchange: Exchange = _.find(exchanges, { name: action.payload.exchange });
    if (!exchange) return state;
    exchange.status = ExchangeStatus.LOGGING_IN;
    exchange.invalidLogin = undefined;
    return { ...state, exchanges: exchanges };
};

reducerMap[OrderBookActions.SIGN_IN_TO_EXCHANGE_RESULT] = (state: OrderBookState, action: Action<{ exchange: string, err: Error }>): OrderBookState => {
    const exchanges = [...state.exchanges];
    const exchange: Exchange = _.find(exchanges, { name: action.payload.exchange });
    if (!exchange) return state;

    if (!action.payload.err) {
        exchange.invalidLogin = undefined;
        exchange.status = ExchangeStatus.LOGGED_IN;
    }
    else {
        exchange.status = ExchangeStatus.RUNNING;
        exchange.invalidLogin = action.payload.err;
    }

    return { ...state, exchanges: exchanges };
};


reducerMap[OrderBookActions.LOG_OUT_FROM_EXCHANGE_RESULT] = (state: OrderBookState, action: Action<{ exchange: string, err: Error }>): OrderBookState => {
    const exchanges = [...state.exchanges];
    const exchange: Exchange = _.find(exchanges, { name: action.payload.exchange });
    if (!exchange) return state;

    if (!action.payload.err) {
        exchange.status = ExchangeStatus.RUNNING;
    }
    return { ...state, exchanges: exchanges };
};


reducerMap[OrderBookActions.REMOVE_EXCHANGE] = (state: OrderBookState, action: Action<string>): OrderBookState => {
    const removedExchanges = [...state.removedExchanges];
    removedExchanges.push(action.payload);
    return { ...state, removedExchanges: removedExchanges };
};


reducerMap[OrderBookActions.EXCHANGE_WAS_ADDED] = (state: OrderBookState, action: Action<string>): OrderBookState => {
    const removedExchanges = [...state.removedExchanges];
    const addExchangeIndex = removedExchanges.indexOf(action.payload);

    if (addExchangeIndex < 0) return state;

    removedExchanges.splice(addExchangeIndex, 1);
    return { ...state, removedExchanges: removedExchanges };
};

export default handleActions<OrderBookState, any>(reducerMap, INITIAL_STATE);