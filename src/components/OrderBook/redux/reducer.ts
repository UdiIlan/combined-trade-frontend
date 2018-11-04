import * as _ from 'lodash';
import { OrderBookActions } from './actions';
import { handleActions, Action } from 'redux-actions';
import { ExchangeUtils } from 'businessLogic/utils';
import {
    Exchange, ExchangeOrderBook, AccountCredentials,
    ExchangeStatus, OrderAction, OrderActionStatus,
    TimedOrderActionStatus
} from 'businessLogic/model';

export interface OrderBookState {
    exchanges: Exchange[];
    loading?: boolean;
    exchangesStatus?: {};
    userOrders?: OrderActionStatus[];
    runningTimedOrder?: TimedOrderActionStatus;
}

const INITIAL_STATE: OrderBookState = {
    exchanges: [],
    loading: true
};

let reducerMap = {};

reducerMap[OrderBookActions.GET_EXCHANGES] = (state: OrderBookState, action: Action<void>): OrderBookState => {
    return { ...state, loading: true };
};

reducerMap[OrderBookActions.SET_EXCHANGES] = (state: OrderBookState, action: Action<Exchange[]>): OrderBookState => {
    if (!state.exchangesStatus) {
        const exchangesStatus = {};
        _.forEach(action.payload, ((exchange: Exchange) => exchangesStatus[exchange.name] = exchange.status !== ExchangeStatus.STOPPED));
        return { ...state, exchanges: action.payload, exchangesStatus: exchangesStatus, loading: false };
    }
    else
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
    const newExchangesStatus = { ...state.exchangesStatus };
    newExchangesStatus[action.payload] = false;
    return { ...state, exchangesStatus: newExchangesStatus };
};

reducerMap[OrderBookActions.SET_EXCHANGES_STATUS] = (state: OrderBookState, action: Action<{}>): OrderBookState => {
    return { ...state, exchangesStatus: action.payload };
};

reducerMap[OrderBookActions.SEND_ORDER_COMMAND] = (state: OrderBookState, action: Action<OrderAction>): OrderBookState => {

    const newUserOrders = state.userOrders ? [...state.userOrders] : [];
    const { exchanges, size_coin, fiat_type, duration_sec, max_order_size, ...other } = action.payload;
    newUserOrders.splice(0, 0, {
        ...other,
        crypto_size: size_coin,
        status: 'pending',
        exchange: exchanges[0],
        order_time: new Date()
    });
    return { ...state, userOrders: newUserOrders };
};

reducerMap[OrderBookActions.SET_USER_SENT_ORDERS] = (state: OrderBookState, action: Action<OrderActionStatus[]>): OrderBookState => {
    let newUserOrders = [...action.payload];

    if (!_.isEmpty(state.userOrders) && !_.isEmpty(newUserOrders)) {
        // check if the last item is pushed by SEND_ORDER_COMMAND action, nut not yet returned from the server
        newUserOrders = _.orderBy(newUserOrders, ['order_time'], 'desc');
        const lastObj = newUserOrders[0];
        const curLastObj = _.orderBy([...state.userOrders], ['order_time'], 'desc')[0];

        if (lastObj.order_time.setMilliseconds(0) < curLastObj.order_time.setMilliseconds(0)) // ignore milliseconds
            newUserOrders.splice(0, 0, curLastObj);
    }

    return { ...state, userOrders: newUserOrders };
};

reducerMap[OrderBookActions.SET_TIMED_ORDER_STATUS] = (state: OrderBookState, action: Action<TimedOrderActionStatus>): OrderBookState => {
    return { ...state, runningTimedOrder: action.payload };
};

reducerMap[OrderBookActions.CANCEL_TIMED_ORDER] = (state: OrderBookState, action: Action<TimedOrderActionStatus>): OrderBookState => {
    return { ...state, runningTimedOrder: undefined };
};

reducerMap[OrderBookActions.SET_ACCOUNT_BALANCE] = (state: OrderBookState, action: Action<any>): OrderBookState => {
    if (_.isEmpty(state.exchanges)) return state;

    const exchanges = [...state.exchanges];
    const accountBalance = action.payload;

    _.forEach(exchanges, (exchange: Exchange) => {
        ExchangeUtils.updateBalance(exchange, accountBalance);
    });

    return { ...state, exchanges };
};

export default handleActions<OrderBookState, any>(reducerMap, INITIAL_STATE);