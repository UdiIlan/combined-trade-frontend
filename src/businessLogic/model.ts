/************************** Common ******************************************** */
export type SupportedCurrencies = 'BTC' | 'BCH';


/************************** Exchange ******************************************** */
export interface ExchangeCoinBalance {
    coin: SupportedCurrencies | 'USD';
    amount: number;
    available: number;
    price?: number;
}

export interface ExchangeFees {
    make: number;
    take: number;
}

export enum ExchangeStatus {
    RUNNING,
    STOPPED,
    LOGGING_IN,
    LOGGED_IN
}

export interface Exchange {
    name: string;
    balance?: ExchangeCoinBalance[];
    fees: ExchangeFees;
    totalUSD: number;
    status: ExchangeStatus;
    signedInUser?: string;
    orderBook?: ExchangeOrderBook;
    invalidLogin?: Error;
}


export interface AccountCredentials {
    username: string;
    key: string;
    secret: string;
    exchange: string;
    taker_fee?: number;
    maker_fee?: number;
}


/************************** Exchange Order Book ******************************************** */
export interface Order {
    price: number;
    size: number;
    source: string;
}

export interface ExchangeOrderBook {
    exchange: string;
    asks?: Order[];
    bids?: Order[];
    averageSpread?: number;
    currentSpread?: number;
    lastPrice?: { price: number, time: Date, type: 'sell' | 'buy' };
}