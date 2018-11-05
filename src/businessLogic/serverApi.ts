const config = require('config');
import { Fetcher } from 'rest-fetcher';
import { AccountCredentials, OrderAction } from './model';

const fetcher = new Fetcher({ baseUrl: config.baseUrl });

const textToJson = (text: string) => {
    if (!text || !text.replace) return text;
    return JSON.parse(text.replace(/'/g, '"'));
};

export const getExchangesSignedInInfo = async (): Promise<any> => {
    const res = await fetcher.get('/GetSignedInCredentials');
    return textToJson(res);
};

export const getExchangesAccountBalance = async (): Promise<any> => {
    const res = await fetcher.get('/AccountBalance');
    return textToJson(res);
};

export const getTotalUserBalance =  () => {
    return {usd: '200', btc: '100'};
};

export const getActiveOrderBook = async (currency): Promise<any> => {
    const res = await fetcher.get(`/ActiveOrderbooks/${currency}-USD`);
    return textToJson(res);
};

export const signInToExchange = async (creds: AccountCredentials): Promise<any> => {
    const res = await fetcher.post('/SetClientCredentials', creds);
    return textToJson(res);
};

export const logOutFromExchange = async (exchange: string): Promise<any> => {
    const res = await fetcher.get(`/Logout/${exchange}`);
    return textToJson(res);
};

export const stopExchange = async (exchange: string): Promise<any> => {
    const res = await fetcher.get(`/StopOrderbook/${exchange}`);
    return textToJson(res);
};

export const startExchange = async (exchange: string): Promise<any> => {
    const res = await fetcher.get(`/StartOrderbook/${exchange}`);
    return textToJson(res);
};

export const sendOrderCommand = async (order: OrderAction): Promise<any> => {
    const res = await fetcher.post('/SendOrder', order);
    return textToJson(res);
};

export const getUserOrdersStatus = async (limit: number = 100): Promise<any> => {
    const res = await fetcher.get('/GetSentOrders', { limit });
    return textToJson(res);
};

export const getTimedOrderStatus = async (): Promise<any> => {
    const res = await fetcher.get('/GetTimedOrderStatus');
    return textToJson(res);
};

export const cancelTimedOrder = async (): Promise<any> => {
    const res = await fetcher.get('/CancelTimedOrder');
    return textToJson(res);
};

export const getOrdersReport = async (filters: any, limit = 1000): Promise<any> => {
    const res = await fetcher.post('/GetSentOrdersFiltered', { limit, filter: filters });
    return textToJson(res);
};
