import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import { getLocalizedText } from 'lang';
import Button from 'components/common/core/Button';
import NumericInput from 'components/common/core/NumericInput';
import Select from 'components/common/core/Select';
import { default as Dialog, DialogProps } from 'components/common/modals/Dialog';
import {
    OrderAction, OrderActionType, SupportedFiatCurrencies,
    SupportedCurrencies, Exchange, UNIFIED_EXCHANGE_KEY, ExchangeCoinBalance
} from 'businessLogic/model';

export interface TradingBoxProps {
    exchanges?: Exchange[];
    selectedCurrency: SupportedCurrencies;
    disableTrade?: boolean;
    sendNewOrderCommand(command: OrderAction);
}

export interface TradingBoxState {
    size?: number;
    price?: number;
    duration_sec?: number;
    max_order_size?: number;
    fiatCurrency?: SupportedFiatCurrencies;
    operation?: OrderActionType;
    exchange?: string;
    confirmDialog?: DialogProps;
}

export default class TradingBox extends React.Component<TradingBoxProps, TradingBoxState> {

    constructor(props) {
        super(props);
        this.state = {};
        this.execute = this.execute.bind(this);
        this.onSizeChanged = this.onSizeChanged.bind(this);
    }

    shouldComponentUpdate(newProps: TradingBoxProps, newState: TradingBoxState) {
        return !_.isEqual(this.props, newProps) || !_.isEqual(this.state, newState);
    }

    private confirmOrder() {
        const { size, price, operation, exchange } = this.state;
        const orderFiatPrice = (price * size).toFixed(2);
        if (this.validateOrder(size, price, operation, exchange)) {
            this.setState({
                confirmDialog:
                {
                    title: getLocalizedText('send_new_order'),
                    subTitle: [<span key='row1'>{`You are about to ${this.getOperationText(operation)} ${size} ${this.props.selectedCurrency} for ${price} USD per ${this.props.selectedCurrency} (total price: ${orderFiatPrice}).`}</span>, <br key='separator' />, <span key='row2'>{getLocalizedText('are_you_sure')}</span>],
                    onOkClick: this.execute,
                    onCancelClick: () => this.setState({ confirmDialog: undefined }),
                    okBtnText: getLocalizedText('send')
                }
            });
        }
    }

    private getOperationText(operation: OrderActionType) {
        if (operation === 'buy' || operation === 'sell') return operation;

        switch (operation) {
            case 'buy_limit':
                return 'timed buy making';
            case 'sell_limit':
                return 'timed sell making';
            case 'timed_buy':
                return getLocalizedText('timed_buy');
            case 'timed_sell':
                return getLocalizedText('timed_sell');
        }
    }

    private validateOrder(size: number, price: number, operation: OrderActionType, exchangeName: string): boolean {

        exchangeName = exchangeName === getLocalizedText('best_exchange') ? UNIFIED_EXCHANGE_KEY : exchangeName;
        const exchange: Exchange = _.find(this.props.exchanges, { name: exchangeName });
        let msg = '';

        if (!exchange)
            msg = 'Invalid Exchange';
        else {
            switch (operation) {
                case 'timed_buy':
                case 'buy_limit':
                case 'buy': {
                    if (price < 5)
                        msg = getLocalizedText('min_order_price_err');

                    const orderFiatPrice = (price * size).toFixed(2);
                    if (Number(exchange.totalUSD) < Number(orderFiatPrice))
                        msg = `Inefficient balance (${exchange.totalUSD}) ,${orderFiatPrice} needed.`;
                    break;

                }
                case 'timed_sell':
                case 'sell_limit':
                case 'sell': {
                    const balance: ExchangeCoinBalance = _.find(exchange.balance, { coin: this.props.selectedCurrency });
                    if (Number(balance.amount) < Number(size))
                        msg = `${this.props.selectedCurrency} balance (${balance.amount}) is lower than the suggested size (${size}).`;
                }
            }
        }

        if (msg) {
            this.setState({
                confirmDialog:
                {
                    title: getLocalizedText('invalid_order'),
                    subTitle: msg,
                    onCancelClick: () => this.setState({ confirmDialog: undefined }),
                    okBtnHidden: true,
                    intent: 'danger',
                    cancelBtnText: 'OK'
                }
            });
        }


        return !msg;
    }

    private execute() {
        const { size, price, operation, exchange, duration_sec, max_order_size } = this.state;
        let exchanges = [];
        if (exchange === getLocalizedText('best_exchange'))
            _.forEach(this.props.exchanges, item => { if (item.name !== UNIFIED_EXCHANGE_KEY) exchanges.push(item.name); });
        else
            exchanges.push(exchange);

        const order: OrderAction = {
            size_coin: size,
            price_fiat: price,
            crypto_type: this.props.selectedCurrency,
            fiat_type: 'USD',
            action_type: operation,
            exchanges: exchanges
        };

        // Reset order details only on immediate actions.
        if (operation === 'buy' || operation === 'sell')
            this.reset();
        else {
            order.duration_sec = (duration_sec || 1) * 60; // duration_sec should be set in seconds.
            order.max_order_size =  max_order_size || 0;
            this.setState({ confirmDialog: undefined });
        }

        this.props.sendNewOrderCommand(order);
    }

    reset() {
        this.setState({ confirmDialog: undefined, size: undefined, price: undefined, operation: undefined, /* exchange: undefined, */ duration_sec: undefined, max_order_size: undefined });
    }

    private onSizeChanged(value: number) {
        const newSize = value;

        if (newSize === this.state.size) return;
        // set the default maxOrderSize value to the maximum of 0.2 and (newSize / 100)
        const maxOrderSize = Math.max((newSize < 0.2 ? 0.02 : 0.2), Number(newSize / 100));
        this.setState({ size: newSize, max_order_size: maxOrderSize });
    }

    render() {
        const { size, price, operation, exchange, confirmDialog, duration_sec, max_order_size } = this.state;
        const { disableTrade } = this.props;
        const exchanges = _.map([...this.props.exchanges], item => item.name === UNIFIED_EXCHANGE_KEY ? getLocalizedText('best_exchange') : item.name);

        // if no exchange is logged-in, disable trading
        const disabled = disableTrade || _.isEmpty(exchanges) || (exchanges.length === 1 && exchanges[0] === getLocalizedText('best_exchange'));

        if (exchanges.length === 2) exchanges.splice(1, 1);
        exchanges.splice(0, 0, '');

        return (

            <div className={styles.tradingBox}>

                <Select inline disabled={disabled} selectedValue={exchange} className={styles.tradingOption} formControl formLabelText={getLocalizedText('exchange')} onChange={(selection) => this.setState({ exchange: selection })}>
                    {_.map(exchanges, (exchange) => <option key={exchange} value={exchange}>{exchange}</option>)}
                </Select>

                <NumericInput inline name='size' disabled={disabled} value={size} min={0} className={styles.tradingOption} onBlur={this.onSizeChanged} label={getLocalizedText('size')} />

                <NumericInput inline name='price' disabled={disabled} value={price} min={0} className={styles.tradingOption} onChange={(e) => this.setState({ price: e.target.value })} label={getLocalizedText('price_limit')} />

                <Select inline disabled={disabled} selectedValue={operation} className={styles.tradingOption} formControl formLabelText='Trade Option' onChange={selection => this.setState({ operation: selection })}>
                    <option value='' />
                    <option value='buy'>{getLocalizedText('buy')}</option>
                    <option value='sell'>{getLocalizedText('sell')}</option>
                    {/*  {!disableTrade && [ */}
                    <option key='timed_buy' value='timed_buy'>{getLocalizedText('timed_buy')}</option>,
                    <option key='timed_sell' value='timed_sell'>{getLocalizedText('timed_sell')}</option>,
                    <option key='buy_limit' value='buy_limit'>{getLocalizedText('buy_limit')}</option>,
                    <option key='sell_limit' value='sell_limit'>{getLocalizedText('sell_limit')}</option>,
                   {/*  ]} */}
                </Select>

                {
                    (!!operation && operation !== 'buy' && operation !== 'sell') &&
                    [
                        <NumericInput inline disabled={disabled} min={1} value={duration_sec || 1} className={styles.tradingOption} key='duration' onChange={(e) => this.setState({ duration_sec: e.target.value })} label={getLocalizedText('duration')} name='duration' />,
                        <NumericInput inline disabled={disabled} min={0} value={max_order_size} key='max_order_size' onChange={(e) => this.setState({ max_order_size: e.target.value })} label={getLocalizedText('max_order_size')} name='max_order_size' />
                    ]
                }

                <Button className={cx(styles.colorInput, styles.tradingOption)} disabled={disabled || !size || !price || !operation || !exchange} onClick={() => this.confirmOrder()}>Go</Button>

                {confirmDialog && <Dialog open={true} {...confirmDialog} />}

            </div>
        );
    }

}