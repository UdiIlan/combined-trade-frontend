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
    'account_details' |
    'usd_balance' |
    'not_available' |
    'unified' |
    'asks' |
    'bids' |
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
    'logout' |
    'no_user' |
    'sent_transactions' |
    'transactions' |
    'export_all_orders' |
    'export_shown_orders' |
    'unavailable' |
    'manual_short' |
    'timed_short' |
    'finished' |
    'cancelled' |
    'size' |
    'price' |
    'price_limit' |
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
    'sell_limit' |
    'selected_currency' |
    'back_to_orders_book' |
    'reports' |
    'choose_exchanges' |
    'choose_language' |
    'user_settings' |
    'contact_support' |
    'dark_theme' |
    'loading_account_info' |
    'choose' |
    'exchanges' |
    'select_exchanges' |
    'are_you_sure' |
    'cancel_order_confirm' |
    'trading_area' |
    'sold' |
    'bought' |
    'out_of' |
    'send' |
    'send_new_order' |
    'invalid_order' |
    'min_order_price_err' |
    'order_status' |
    'order_time' |
    'exchange' |
    'order_id' |
    'logout_exchange_confirm' |
    'stop_exchange_confirm' |
    'remove_exchange_confirm'|
    'hide_exchange_confirm'|
    'stop' |
    'remove' |
    'hide'|
    'login' |
    'timed_order_success'
    ;