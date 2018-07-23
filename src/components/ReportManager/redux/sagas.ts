
import * as _ from 'lodash';
import { ReportManagerActions, setOrdersReport } from './actions';
import { takeEvery, all, put } from 'redux-saga/effects';
import { getOrdersReport } from 'businessLogic/serverApi';
import { DateUtils } from 'businessLogic/utils';


function* getOrdersReportAsync(action) {
    try {
        const res = yield getOrdersReport(action.payload);
        const normalizedData = _.map(res, item => { return { ...item, order_time: DateUtils.parseUTtcToLocalTime(item.order_time) }; });
        yield put(setOrdersReport(normalizedData));
    }
    catch (err) {
        console.error('Failed to fetch order report: ', err);
    }
}


export function* ReportManagerSagas() {
    return yield all([
        takeEvery(ReportManagerActions.GET_ORDERS_REPORT, getOrdersReportAsync),
    ]);
}