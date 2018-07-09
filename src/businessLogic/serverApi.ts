const config = require('config');
import { Fetcher } from 'rest-fetcher';
import { AccountCredentials } from './model';

const fetcher = new Fetcher(config.baseUrl);

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
