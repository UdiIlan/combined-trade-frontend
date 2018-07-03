
import * as _ from 'lodash';
import { OrderBookActions, setExchanges } from './actions';
import { takeEvery, all, put } from 'redux-saga/effects';
import { getExchanges } from 'businessLogic/serverApi';
import { Exchange, ExchangeStatus } from 'businessLogic/model';

function* getExchangesAsync(action) {
    try {
        const res = yield getExchanges();
        const exchanges = _.map(Object.keys(res), key => {
            const exchange = res[key];
            return {
                name: key,
                status: exchange['is_user_signed_in'] === 'True' ? ExchangeStatus.LOGGED_IN : ExchangeStatus.RUNNING,
                signedInUser: exchange['signed_in_user']
            } as Exchange;
        });
        yield put(setExchanges(exchanges));
    }
    catch (err) {
        console.error('Failed to fetch exchanges info: ', err);
    }
}

export function* OrderBookSagas() {
    return yield all([
        takeEvery(OrderBookActions.GET_EXCHANGES, getExchangesAsync),
    ]);
}