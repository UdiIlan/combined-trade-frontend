
import * as _ from 'lodash';
import { ReportManagerActions, setOrdersReport } from './actions';
import { showToast } from 'components/App/redux/actions';
import { takeEvery, all, put, select } from 'redux-saga/effects';
import { getOrdersReport } from 'businessLogic/serverApi';
import { Exchange } from 'businessLogic/model';
import { getLocalizedText } from 'lang';


function* getOrdersReportAsync(action) {
    try {
        const res = yield getOrdersReport(action.payload);
        yield put(setOrdersReport(res));
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