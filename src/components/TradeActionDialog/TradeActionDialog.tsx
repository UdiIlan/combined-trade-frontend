import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
import { getLocalizedText } from 'lang';
import Dialog from 'components/common/modals/Dialog';
import InputText from 'components/common/core/InputText';
import Select from 'components/common/core/Select';
import { OrderAction, OrderActionType, SupportedFiatCurrencies, SupportedCurrencies } from 'businessLogic/model';

export interface TradeActionDialogProps {
    exchanges?: string[];
    selectedCurrency: SupportedCurrencies;
    sendNewOrderCommand(command: OrderAction);
    onCancel();
}

export interface TradeActionDialogState {
    size?: number;
    price?: number;
    fiatCurrency?: SupportedFiatCurrencies;
    operation?: OrderActionType;
    exchange?: string;
}

export default class TradeActionDialog extends React.Component<TradeActionDialogProps, TradeActionDialogState> {

    constructor(props) {
        super(props);
        this.state = {};
    }


    private execute() {
        const { size, price, operation, exchange } = this.state;
        this.props.sendNewOrderCommand({
            size_coin: size,
            price_fiat: price,
            crypto_type: this.props.selectedCurrency,
            fiat_type: 'USD',
            action_type: operation,
            exchanges: [exchange],
            duration_sec: 0,
            max_order_size: 0
        });
    }

    render() {
        const { size, price, operation, exchange } = this.state;
        const exchanges = [...this.props.exchanges];
        exchanges.splice(0, 0, '');

        return (
            <Dialog
                open={true}
                okBtnText='Execute'
                okBtnDisabled={!size || !price || !operation || !exchange}
                title={'New Trading Action'}
                onOkClick={() => this.execute()}
                onCancelClick={this.props.onCancel}
            >

                <div className={styles.tradeActionDialogContent}>
                    <InputText onChange={(e) => this.setState({ size: e.target.value })} label={getLocalizedText('size')} name='size' type='number' />

                    <InputText onChange={(e) => this.setState({ price: e.target.value })} label={getLocalizedText('price')} name='price' type='number' />

                    <Select formControl formLabelText='Trade Option' onChange={e => this.setState({ operation: e.target.value })}>
                        <option value='' />
                        <option value='buy'>{getLocalizedText('buy')}</option>
                        <option value='sell'>{getLocalizedText('sell')}</option>
                        <option value='timed-buy'>{getLocalizedText('timed_buy')}</option>
                        <option value='timed-sell'>{getLocalizedText('timed_sell')}</option>
                        <option value='buy-limit-making'>Buy Limit Making</option>
                        <option value='sell-limit-making'>Sell Limit Making</option>
                    </Select>

                    <Select formControl formLabelText='Exchange' onChange={(e) => this.setState({ exchange: e.target.value })}>
                        {_.map(exchanges, (exchange) => <option key={exchange} value={exchange}>{exchange}</option>)}
                    </Select>
                </div>

            </Dialog>
        );
    }

}