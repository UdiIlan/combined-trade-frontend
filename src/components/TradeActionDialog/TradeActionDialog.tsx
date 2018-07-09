import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
import { getLocalizedText } from 'lang';
import Dialog from 'components/common/modals/Dialog';
import InputText from 'components/common/core/InputText';
import Select from 'components/common/core/Select';

export interface TradeActionDialogProps {
    exchanges?: string[];
    onCancel();
}

export interface TradeActionDialogState {
    size?: number;
    price?: number;
    operation?: 'buy' | 'sell' | 'timed-buy' | 'timed-sell' | 'buy-limit-making' | 'sell-limit-making';
    exchange?: string;
}

export default class TradeActionDialog extends React.Component<TradeActionDialogProps, TradeActionDialogState> {

    constructor(props) {
        super(props);
        this.state = {};
    }


    private execute() {
    }

    render() {
        const { size, price, operation } = this.state;
        const exchanges = [...this.props.exchanges];
        exchanges.splice(0, 0, '');

        return (
            <Dialog
                open={true}
                okBtnText='Execute'
                okBtnDisabled={!size || !price || !operation}
                title={'New Trading Action'}
                onOkClick={() => this.execute()}
                onCancelClick={this.props.onCancel}
            >

                <div className={styles.tradeActionDialogContent}>
                    <InputText onChange={(e) => this.setState({ size: e.target.value })} label={getLocalizedText('size')} name='size' type='number' />

                    <InputText onChange={(e) => this.setState({ price: e.target.value })} label={getLocalizedText('price')} name='price' type='number' />

                    <Select formControl formLabelText='Trade Option'>
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
                        {/* {_.map(([...this.props.exchanges].splice(0, 0, '')), (exchange) => <option key={exchange} value={exchange}>{exchange}</option>)} */}
                    </Select>
                </div>

            </Dialog>
        );
    }

}