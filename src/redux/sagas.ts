
import { AppSagas } from 'components/App/redux/sagas';
import { OrderBookSagas } from 'components/OrderBook/redux/sagas';
import { ReportManagerSagas } from 'components/ReportManager/redux/sagas';


import { actionChannel, fork, take, call, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';

export const throttle = (ms, pattern, task, ...args) => fork(function* () {
    const throttleChannel = yield actionChannel(pattern);

    while (true) {
        const action = yield take(throttleChannel);
        yield fork(task, args, action);
        yield call(delay, ms);
    }
});

export function* takeFirst(pattern, saga, ...args) {
    const task = yield fork(function* () {
        while (true) {
            const action = yield take(pattern);
            yield call(saga, args.concat(action));
        }
    });
    return task;
}

export default function* rootSaga(): any {
    yield all([
        AppSagas(),
        OrderBookSagas(),
        ReportManagerSagas()
    ]);

}