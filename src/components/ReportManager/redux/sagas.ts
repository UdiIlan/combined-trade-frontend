
import * as _ from 'lodash';
import { ReportManagerActions, setOrdersReport } from './actions';
import { takeEvery, all, put } from 'redux-saga/effects';
import { getOrdersReport } from 'businessLogic/serverApi';
import { DateUtils } from 'businessLogic/utils';


function* getOrdersReportAsync(action) {
    try {
        const res = yield getOrdersReport(action.payload);
        const normalizedData = _.map(res, item => { return { ...item, orderTime: DateUtils.parseUTtcToLocalTime(item.orderTime) }; });

        // // Those are commands that the user had manually triggered.
        // const userManualOrders = _.filter(normalizedData, order => order.status === 'Make Order' || order.status === 'Timed Take Order' ||  order.status === 'Timed Order' || !order.timed_order);

        // // Set children order for each command
        // _.forEach(userManualOrders, (command, index) => {

        //     if (!command.timed_order) {
        //         command.children = [];
        //         return;
        //     }

        //     // for each command take all the automated orders in between this order original index and the previous user command.
        //     const cmdIndex = normalizedData.indexOf(command);
        //     const prevCmdIndex = index - 1 >= 0 ? normalizedData.indexOf(userManualOrders[index - 1]) + 1 : 0;
        //     command.children = _.slice(normalizedData, prevCmdIndex, cmdIndex);

        // });

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