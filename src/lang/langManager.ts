export type SupportedLanguages = 'en_us' | 'he_il' | 'zh_cn';
const DEFAULT_LANG = 'en_us';

let cur_lang = {};
let cur_lang_key: SupportedLanguages = DEFAULT_LANG;

export function getCurrentLanguage() {
    return cur_lang_key;
}

export function updateCurLang(langOption: SupportedLanguages) {
    cur_lang_key = langOption;
    cur_lang = require(`json-loader!lang/${langOption}.json`);
}

export function getLocalizedText(key: localizedKeys, fallBack?: string) {
    const localizedStr = !!cur_lang[key] ? cur_lang[key] : (fallBack || key);
    return localizedStr;
}

export type localizedKeys =
    'orderbook_header' |
    'btc_usd_option' |
    'bch_usd_option' |
    'bitstamp' |
    'bitfinex' |
    'gdax' |
    'account_details' |
    'usd_balance' |
    'not_available' |
    'unified' |
    'asks' |
    'bids' |
    'bitstamp_credentials' |
    'account_number' |
    'api_key' |
    'secret' |
    'spread' |
    'current' |
    'average' |
    'balance' |
    'BTC' |
    'BCH' |
    'buy_at' |
    'set_bitstamp_credentials' |
    'logout' |
    'no_user' |
    'sent_transactions' |
    'transactions' |
    'export_all_orders' |
    'export_shown_orders' |
    'unavailable' |
    'bitstamp_short' |
    'manual_short' |
    'timed_short' |
    'finished' |
    'cancelled' |
    'size' |
    'price' |
    'usd' |
    'best_exchange' |
    'sell' |
    'buy' |
    'timed_sell' |
    'timed_buy' |
    'duration' |
    'max_order_size' |
    'execute' |
    'cancel_timed_order' |
    'timed_order_status' |
    'order_details' |
    'sent_time' |
    'order_size' |
    'execution_status' |
    'execution_start_time' |
    'order_duration' |
    'execution_size' |
    'active' |
    'inactive' |
    'for' |
    'execution_status' |
    'not_started' |
    'running' |
    'pending' |
    'done' |
    'last' |
    'total' |
    'timed order' |
    'supportLink' |
    'cancel' |
    'ok' |
    'buy_limit' |
    'sell_limit'
    ;