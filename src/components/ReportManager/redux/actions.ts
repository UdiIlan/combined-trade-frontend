import { createAction } from 'redux-actions';
import { Exchange } from 'businessLogic/model';

export const ReportManagerActions = {
    GET_ORDERS_REPORT: 'ReportManager/GET_ORDERS_REPORT',
    SET_ORDERS_REPORT: 'ReportManager/SET_ORDERS_REPORT',
};

export const getOrdersReport = createAction(ReportManagerActions.GET_ORDERS_REPORT, (filters: any) => filters);

export const setOrdersReport = createAction(ReportManagerActions.SET_ORDERS_REPORT, (data: any[]) => data);
