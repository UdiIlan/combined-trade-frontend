import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
const styles = require('./styles.scss');
import { Exchange as IExchange, SupportedCurrencies } from 'businessLogic/model';
import ExchangeInfo from './ExchangeInfo';
import ExchangeData from './ExchangeData';

export interface ExchangeProps {
    exchange: IExchange;
    selectedCurrency: SupportedCurrencies;
}

export default class Exchange extends React.Component<ExchangeProps, any> {

    constructor(props: ExchangeProps) {
        super(props);
    }

    render() {

        const { name, balance, totalUSD, status, signedInUser } = this.props.exchange;
        const { selectedCurrency } = this.props;
        const selectedCurrencyBalance = _.find(balance, { coin: selectedCurrency });

        return (
            <div className={styles.exchange}>
                <ExchangeInfo
                    name={name}
                    selectedCurrencyBalance={selectedCurrencyBalance}
                    status={status}
                    totalUSD={totalUSD}
                    signedInUser={signedInUser}
                    selectedCurrency={this.props.selectedCurrency}
                />

                <ExchangeData />
            </div>
        );
    }
}