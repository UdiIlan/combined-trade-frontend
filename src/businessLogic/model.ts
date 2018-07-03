
/************************** Common ******************************************** */
export type SupportedCurrencies = 'BTC' | 'BCH';


/************************** Exchange ******************************************** */
export interface ExchangeCoinBalance {
    coin: SupportedCurrencies;
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
    STOP,
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
}