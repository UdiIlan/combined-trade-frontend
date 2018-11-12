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
    return {usd: '2000.44', btc: '100.21', eth: '500.34', bch: '235.75', ins: '155.10'};
};


export const getExchangeRates =  () => {
    return {BTC: '6308.23', BCH: '1000.15', ETH: '3003.90', AST: '2500.25', BDL: '455.16'};
};

export const getTrendData =  (currency: string) => {
    switch (currency) {
        case 'BTC/USD':
            return [{ x: 7, y: 0 }, { x: 8, y: 8 }, { x: 9, y: 14 }, { x: 10, y: 17 }];
        case 'BCH/USD':
            return [{ x: 2, y: 0 }, { x: 3, y: 4 }, { x: 6, y: 9 }, { x: 7, y: 8 }];
        case 'ETH/USD':
            return [{ x: 3, y: 1 }, { x: 5, y: 7 }, { x: 9, y: 3 }, { x: 6, y: 5 }];
    }
    return [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }];
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
