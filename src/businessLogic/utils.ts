import * as _ from 'lodash';
import { format as fnsFormat } from 'date-fns';
import { Exchange, ExchangeCoinBalance } from './model';

const normalizedTo2Digits = (num: number) => {
    return num < 10 ? `0${num}` : num;
};

export const DateUtils = {
    defaultFormat: (date: any) => {
        return `${date.getYear() - 100}-${normalizedTo2Digits(date.getMonth() + 1)}-${normalizedTo2Digits(date.getDate())} ${normalizedTo2Digits(date.getHours())}:${normalizedTo2Digits(date.getMinutes())}:${normalizedTo2Digits(date.getSeconds())}`;
    },
    lastWeek: () => {
        // calculate last week date
        const date = new Date();
        date.setDate(date.getDate() - 7);
        return date;
    },
    yesterday: () => {
        // calculate yesterday date
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return date;
    },
    format: (date: Date | number | string, format: string) => {
        return (fnsFormat(date, format));
    },
    parseUTtcToLocalTime: (strDate: string) => {
        // convert UTC to local time
        const dateParts = strDate.split('.');
        dateParts.pop();
        const utcDateStr = `${dateParts.join('.')}.000Z`;
        return new Date(utcDateStr);
    },
    toUTC: (date: Date) => {
        return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    }
};

export const ExchangeUtils = {
    updateBalance: (exchange: Exchange, accountBalance) => {
        const balance = accountBalance[exchange.name];
        const currencyBalances = balance && balance['balances'];
        exchange.fees = balance && balance['fees'];
        exchange.totalUSD = balance && balance['total_usd_value'] && balance['total_usd_value'].toFixed(2);
        exchange.balance = (!!currencyBalances ?
            _.map(Object.keys(currencyBalances), key => {
                const coinBalance = currencyBalances[key];
                const fixedDecimalDigits = key === 'USD' ? 2 : 4;
                return {
                    coin: key,
                    amount: !!coinBalance.amount ? coinBalance.amount.toFixed(fixedDecimalDigits) : undefined,
                    available: !!coinBalance.amount ? coinBalance.amount.toFixed(fixedDecimalDigits) : undefined,
                    price: coinBalance.price
                } as ExchangeCoinBalance;
            })
            :
            undefined);
    }
};
