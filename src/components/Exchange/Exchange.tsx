import * as React from 'react';
import * as _ from 'lodash';
import Card from '@material-ui/core/Card';
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

        const { name, balance, totalUSD, status, signedInUser, orderBook } = this.props.exchange;
        const { selectedCurrency } = this.props;
        const selectedCurrencyBalance = _.find(balance, { coin: selectedCurrency });
        const usdBalance = _.find(balance, { coin: 'USD' });

        return (

            < Card className={styles.exchange} >
                <ExchangeInfo
                    name={name}
                    selectedCurrencyBalance={selectedCurrencyBalance}
                    status={status}
                    totalUSD={totalUSD}
                    signedInUser={signedInUser}
                    selectedCurrency={this.props.selectedCurrency}
                    usdBalance={usdBalance}
                />

                <ExchangeData orderBook={orderBook} />
            </Card >
        );
    }
}