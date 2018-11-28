import * as _ from 'lodash';
const config = require('config');
import { Fetcher } from 'rest-fetcher';
import { AccountCredentials, OrderAction, Account, OrderStatus } from './model';

const fetcher = new Fetcher({
    baseUrl: config.baseUrl,
    defaultHeaders: {
        'Content-Type': 'application/json'
    }
});

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

export const getTotalUserBalance = () => {
    return { usd: '2000.44', btc: '100.21', eth: '500.34', bch: '235.75', ins: '155.10' };
};


export const getExchangeRates = () => {
    return { BTC: '6308.23', BCH: '1000.15', ETH: '3003.90', AST: '2500.25', BDL: '455.16' };
};

export const getTrendData = (currency: string) => {
    switch (currency) {
        case 'BTC/USD':
            return [{ x: new Date(2018, 6, 4), y: 0 }, { x: new Date(2018, 7, 4), y: 8 }, { x: new Date(2018, 8, 4), y: 14 }, { x: new Date(2018, 9, 4), y: 17 }];
        case 'BCH/USD':
            return [{ x: new Date(2018, 4, 4), y: 5 }, { x: new Date(2018, 6, 4), y: 3 }, { x: new Date(2018, 8, 4), y: 9 }, { x: new Date(2018, 10, 4), y: 12 }];
        case 'ETH/USD':
            return [{ x: new Date(2018, 6, 4), y: 3 }, { x: new Date(2018, 8, 4), y: 2 }, { x: new Date(2018, 9, 4), y: 4 }, { x: new Date(2018, 10, 4), y: 17 }];
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
    const res = await fetcher.post('/reports/sentOrders', { limit, filter: filters });
    return textToJson(res);
};



/****************************************** Payment system APIs ********************************************* */

export const getAccounts = async (): Promise<Account[]> => {
    const res = await fetcher.get('/accounts/', undefined, undefined, { userid: 1 });
    return res ? _.values(res) : [];
};

export const createNewAccount = async (account: Account): Promise<Account> => {
    const res = await fetcher.post('/accounts/', account, undefined, { userid: 3 });
    return res;
};


export const updateAccount = async (account: Account): Promise<Account> => {
    // const res = await fetcher.put(`/accounts/${account.name}`, account, undefined, { userid: 4 });
    const res = { name: 'mock', description: 'mock' };
    return res;
};

export const deleteAccount = async (accountName: string): Promise<any> => {
    const res = await fetcher.delete(`/accounts/${accountName}`, undefined, undefined, { userid: 5 });
    return res;
};

export const getAccountTrades = async (account: Account, index = 0, size = 1000): Promise<OrderStatus[]> => {
    // const res = await fetcher.get(`/accounts/${account.name}/trades/?index=${index}&size=${size}`);
    // return res;

    const orders: OrderStatus[] =
        [
            {
                account: 'BTC.com',
                startTime: new Date('2017-03-05T23:39:05.651638+00:00'),
                elapsedTimeMinutes: 15.42,
                assetPair: 'BTC-USD',
                actionType: 'sell',
                status: 'Done',
                requestedSize: 1500,
                requestedPrice: 6300,
                executionSize: 1001,
                executedTargetSize: 850000,
                tradeOrderId: 'ABC2D',
                walletPlan: [
                    {
                        walletAddress: 'bc1qdp9q0lae7vz9vn4drw4e48kqkk44sccp34008s',
                        size: 750
                    },
                    {
                        walletAddress: 'rj5qdp9q0lae7vz9vn4drw4e48kqkk44sccp34118s',
                        size: 251
                    }
                ]
            },
            {
                account: 'BTC.com',
                startTime: new Date('2018-11-18T23:44:13.651638+00:00'),
                elapsedTimeMinutes: 15.42,
                assetPair: 'BTC-USD',
                actionType: 'sell',
                status: 'Done',
                requestedSize: 8300,
                requestedPrice: 6300,
                executionSize: 1001,
                executedTargetSize: 850000,
                tradeOrderId: 'FASDF87',
                walletPlan: [
                    {
                        walletAddress: 'bc1qdp9q0lae7vz9vn4drw4e48kqkk44sccp34008s',
                        size: 750
                    },
                    {
                        walletAddress: 'rj5qdp9q0lae7vz9vn4drw4e48kqkk44sccp34118s',
                        size: 251
                    }
                ]
            },
            {
                account: 'BTC.com',
                startTime: new Date('2017-04-20T21:25:52.651638+00:00'),
                elapsedTimeMinutes: 15.42,
                assetPair: 'BTC-USD',
                actionType: 'sell',
                status: 'Done',
                requestedSize: 720,
                requestedPrice: 6300,
                executionSize: 1001,
                executedTargetSize: 850000,
                tradeOrderId: 'FSADFS5',
                walletPlan: [
                    {
                        walletAddress: 'bc1qdp9q0lae7vz9vn4drw4e48kqkk44sccp34008s',
                        size: 750
                    },
                    {
                        walletAddress: 'rj5qdp9q0lae7vz9vn4drw4e48kqkk44sccp34118s',
                        size: 251
                    }
                ]
            }
        ];

    return new Promise<OrderStatus[]>((resolve, reject) => {
        return resolve(orders);
    });
};


export const getAccountBalance = async (account: Account, index = 0, size = 1000): Promise<object> => {
    // const res = await fetcher.get(`/accounts/${account.name}/trades/?index=${index}&size=${size}`);
    // return res;

    const balance = {usd: 2000, btc: 500, bch: 350, eth: 1000};

    return new Promise<object>((resolve, reject) => {
        return resolve(balance);
    });
};