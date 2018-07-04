import * as React from 'react';
const styles = require('./styles.scss');
import { getLocalizedText } from 'lang';
import { ExchangeCoinBalance, SupportedCurrencies, ExchangeStatus } from 'businessLogic/model';
// import ExchangeHeaderBar from './ExchangeHeaderBar';

export interface ExchangeInfoProps {
    name: string;
    status: ExchangeStatus;
    selectedCurrency: SupportedCurrencies;
    selectedCurrencyBalance?: ExchangeCoinBalance;
    usdBalance?: ExchangeCoinBalance;
    totalUSD?: number;
    signedInUser?: string;
}

export default class ExchangeInfo extends React.Component<ExchangeInfoProps, any> {

    constructor(props: ExchangeInfoProps) {
        super(props);
    }

    render() {

        const { name, status, selectedCurrency, selectedCurrencyBalance, totalUSD, signedInUser, usdBalance } = this.props;
        const naText = getLocalizedText('not_available');

        return (
            <div className={styles.exchangeInfo}>

                {/* <ExchangeHeaderBar status={status} signedInUser={signedInUser} name={name} /> */}

                <div className={styles.balanceContainer}>
                    <div className={styles.balanceItem}>
                        <span className={styles.balanceItemLabel}>{getLocalizedText('usd_balance')}</span>
                        <span className={styles.balanceItemValue}>{!!usdBalance ? usdBalance.amount : naText}</span>
                    </div>
                    <div className={styles.balanceItem}>
                        <span className={styles.balanceItemLabel}>{`${selectedCurrency} ${getLocalizedText('balance')}`}</span>
                        <span className={styles.balanceItemValue}>{!!selectedCurrencyBalance ? selectedCurrencyBalance.amount : naText}</span>
                    </div>
                    <div className={styles.balanceItem}>
                        <span className={styles.balanceItemLabel}>{`${getLocalizedText('total')} ${getLocalizedText('usd_balance')}`}</span>
                        <span className={styles.balanceItemValue}>{totalUSD || naText}</span>
                    </div>
                </div>
            </div>
        );
    }
}