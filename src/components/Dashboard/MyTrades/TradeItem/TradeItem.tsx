import * as React from 'react';
import * as _ from 'lodash';
// const styles = require('./styles.scss');
import { Trade } from '../MyTrades';
import { getLocalizedText, SupportedLanguages } from 'lang';

export interface TradeItemProps {
    trade: Trade;
}



export default class TradeItem extends React.Component<TradeItemProps, any> {

    constructor(props: TradeItemProps) {
        super(props);
    }

    shouldComponentUpdate(nextProps: TradeItemProps, nextState) {
        return !_.isEqual(this.props, nextProps);
    }

    render() {
        const { trade } = this.props;
        return (
            <div>
                <span >{trade.price}</span>
                <span > {trade.amount} </span>
                <span >{trade.type}</span>
            </div>
        );
    }

}