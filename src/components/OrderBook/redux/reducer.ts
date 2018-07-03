import { OrderBookActions } from './actions';
import { handleActions, Action } from 'redux-actions';
import { SupportedCurrencies, Exchange } from 'businessLogic/model';

export interface OrderBookState {
    exchanges: Exchange[];
    loading?: boolean;
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
    return { ...state, exchanges: action.payload, loading: false };
};

reducerMap[OrderBookActions.GET_ACTIVE_ORDER_BOOKS] = (state: OrderBookState, action: Action<void>): OrderBookState => {
    return { ...state };
};

reducerMap[OrderBookActions.SET_ACTIVE_ORDER_BOOKS] = (state: OrderBookState, action: Action<any>): OrderBookState => {
    return { ...state };
};

export default handleActions<OrderBookState, any>(reducerMap, INITIAL_STATE);