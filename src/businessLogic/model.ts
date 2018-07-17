/************************** Common ******************************************** */

export type AppTheme = 'light' | 'dark';

export type SupportedCurrencies = 'BTC' | 'BCH';

export type SupportedFiatCurrencies = 'USD';

export const UNIFIED_EXCHANGE_KEY = 'Unified';


/************************** Exchange ******************************************** */
export interface ExchangeCoinBalance {
    coin: SupportedCurrencies | SupportedFiatCurrencies;
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
    LOGGED_IN,
    REMOVED
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

export type OrderActionType = 'buy' | 'sell' | 'timed_buy' | 'timed_sell' | 'buy_limit' | 'sell_limit';

export interface OrderAction {
    action_type: OrderActionType;
    size_coin: number;
    crypto_type: SupportedCurrencies;
    price_fiat: number;
    fiat_type: SupportedFiatCurrencies;
    duration_sec: number;
    max_order_size: number;
    exchanges: string[];
    status?: 'success' | 'failed' | 'pending' | 'in-progress';
}