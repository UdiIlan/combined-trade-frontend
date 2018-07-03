const config = require('config');
import { Fetcher } from 'rest-fetcher';
const fetcher = new Fetcher(config.baseUrl);


const textToJson = (text: string) => {
    if (!text || !text.replace) return text;
    return JSON.parse(text.replace(/'/g, '"'));
};

export const getExchanges = async (): Promise<any> => {
    const res = await fetcher.get('/GetSignedInCredentials');
    return textToJson(res);
};