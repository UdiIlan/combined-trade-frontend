/************************** Common ******************************************** */

export type AppTheme = 'light' | 'dark';

export type SupportedCurrencies = 'BTC' | 'BCH';

export type SupportedFiatCurrencies = 'USD';

export const UNIFIED_EXCHANGE_KEY = 'Unified';

export interface UserDetails {
    userName: string;
    loggedInTime: Date;
}

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
    duration_sec?: number;
    max_order_size?: number;
    exchanges: string[];
}

export interface OrderActionStatus {
    action_type: OrderActionType;
    ask?: number;
    bid?: number;
    crypto_available?: number;
    crypto_size: number;
    crypto_type: SupportedCurrencies;
    exchange: string;
    exchange_id?: string;
    order_time: Date;
    price_fiat: number;
    status?: 'finished' | 'error' | 'pending' | 'in-progress' | 'cancelled' | 'open' | 'make order executed' | 'make order sent' | 'timed take order';
    timed_order?: number;
    usd_balance?: number;
}

export interface TimedOrderActionStatus {
    action_type: OrderActionType;
    server_time: Date;
    timed_order_done_size: number;
    timed_order_duration_sec: number;
    timed_order_elapsed_time: number;
    timed_order_execution_start_time: Date;
    timed_order_price_fiat: number;
    timed_order_required_size: number;
    timed_order_running: boolean;
    timed_order_sent_time: Date;
}

/*****************************************  Accounts  ************************************************* */
export interface Account {
    name: string;
    description?: string;
    trades?: any[];
    funds?: any[];
    balance?: object;
}

/********************************************* Trades *************************************************** */

export type OrderStatusMode = 'Done' | 'Failed' | 'In-Progress' | 'Canceled';

export interface DepositRequest {
    walletAddress: string;
    size: number;
    assetType?: string;
}

export interface OrderStatus {
    account: string;
    startTime: Date;
    elapsedTimeMinutes: number;
    assetPair: string;
    actionType: OrderActionType;
    status: OrderStatusMode;
    requestedSize: number;
    requestedPrice: number;
    executionSize: number;
    executedTargetSize: number;
    executionMessage?: string;
    tradeOrderId: string;
    walletPlan: DepositRequest[];
}

export interface TradeRequest {
    assetPair: string;
    actionType: string;
    size: number;
    price: number;
    durationMinutes: number;
}


/********************************************* Funds *************************************************** */

export type WithdrawalStatusMode = 'Done' | 'Failed' | 'In-Progress' | 'Canceled';


export interface WithdrawalStatus {
    account: string;
    transactionId: string;
    requestTime: Date;
    amount: number;
    assetType: string;
    status: WithdrawalStatusMode;
}

export interface WithdrawalRequest {
    assetType: string;
    amount: number;
}