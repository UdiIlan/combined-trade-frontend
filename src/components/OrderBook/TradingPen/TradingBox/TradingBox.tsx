import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import { getLocalizedText } from 'lang';
import Button from 'components/common/core/Button';
import InputText from 'components/common/core/InputText';
import Select from 'components/common/core/Select';
import { default as Dialog, DialogProps } from 'components/common/modals/Dialog';
import { OrderAction, OrderActionType, SupportedFiatCurrencies, SupportedCurrencies } from 'businessLogic/model';

export interface TradingBoxProps {
    exchanges?: string[];
    selectedCurrency: SupportedCurrencies;
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
    }

    confirmOrder() {
        const { size, price, operation } = this.state;
        this.setState({
            confirmDialog:
            {
                title: 'Send New Order',
                subTitle: [<span key='row1'>{`You are about to ${operation} ${size} ${this.props.selectedCurrency} for ${price} USD.`}</span>, <br key='separator' />, <span key='row2'>Are you sure?</span>],
                onOkClick: this.execute,
                onCancelClick: () => this.setState({ confirmDialog: undefined }),
                okBtnText: 'Send'
            }
        });
    }

    private execute() {
        const { size, price, operation, exchange, duration_sec, max_order_size } = this.state;
        this.setState({ confirmDialog: undefined, size: undefined, price: undefined, operation: undefined, exchange: undefined, duration_sec: undefined, max_order_size: undefined });
        this.props.sendNewOrderCommand({
            size_coin: size,
            price_fiat: price,
            crypto_type: this.props.selectedCurrency,
            fiat_type: 'USD',
            action_type: operation,
            exchanges: [exchange],
            duration_sec: duration_sec || 0,
            max_order_size: max_order_size || 0
        });
    }

    render() {
        const { size, price, operation, exchange, confirmDialog, duration_sec, max_order_size } = this.state;
        const exchanges = [...this.props.exchanges];
        if (exchanges.length > 1) exchanges.splice(0, 0, getLocalizedText('best_exchange'));
        exchanges.splice(0, 0, '');

        return (


            <div className={styles.tradingBox}>

                <Select selectedValue={exchange} className={styles.tradingOption} theme='white' formControl formLabelText='Exchange' onChange={(e) => this.setState({ exchange: e.target.value })}>
                    {_.map(exchanges, (exchange) => <option key={exchange} value={exchange}>{exchange}</option>)}
                </Select>

                <InputText value={size} className={styles.tradingOption} theme='white' onChange={(e) => this.setState({ size: e.target.value })} label={getLocalizedText('size')} name='size' type='number' />

                <InputText value={price} className={styles.tradingOption} theme='white' onChange={(e) => this.setState({ price: e.target.value })} label={getLocalizedText('price')} name='price' type='number' />

                <Select selectedValue={operation} className={styles.tradingOption} theme='white' formControl formLabelText='Trade Option' onChange={e => this.setState({ operation: e.target.value })}>
                    <option value='' />
                    <option value='buy'>{getLocalizedText('buy')}</option>
                    <option value='sell'>{getLocalizedText('sell')}</option>
                    <option value='timed_buy'>{getLocalizedText('timed_buy')}</option>
                    <option value='timed_sell'>{getLocalizedText('timed_sell')}</option>
                    <option value='buy_limit'>Buy Limit Making</option>
                    <option value='sell_limit'>Sell Limit Making</option>
                </Select>

                {
                    (!!operation && operation !== 'buy' && operation !== 'sell') &&
                    [
                        <InputText value={duration_sec} className={styles.tradingOption} key='duration' theme='white' onChange={(e) => this.setState({ duration_sec: e.target.value })} label={getLocalizedText('duration')} name='duration' type='number' />,
                        <InputText value={max_order_size} key='max_order_size' theme='white' onChange={(e) => this.setState({ max_order_size: e.target.value })} label={getLocalizedText('max_order_size')} name='max_order_size' type='number' />
                    ]
                }

                <Button className={cx(styles.colorInput, styles.tradingOption)} disabled={!size || !price || !operation || !exchange} onClick={() => this.confirmOrder()}>Go</Button>

                {confirmDialog && <Dialog open={true} {...confirmDialog} />}

            </div>
        );
    }

}