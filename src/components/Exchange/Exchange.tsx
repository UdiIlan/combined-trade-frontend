import * as React from 'react';
import * as _ from 'lodash';
import Card from '@material-ui/core/Card';
const styles = require('./styles.scss');
import { Exchange as IExchange, SupportedCurrencies, AccountCredentials, ExchangeStatus } from 'businessLogic/model';
import ExchangeInfo from './ExchangeInfo';
import ExchangeData from './ExchangeData';
import ExchangeHeaderBar from './ExchangeHeaderBar';
import SignInExchangeDialog from 'components/SignInExchangeDialog';

export interface ExchangeProps {
    exchange: IExchange;
    selectedCurrency: SupportedCurrencies;
    signInToExchange(creds: AccountCredentials);
}

interface ExchangeState {
    openSignInDialog?: boolean;
}

export default class Exchange extends React.Component<ExchangeProps, ExchangeState> {

    constructor(props: ExchangeProps) {
        super(props);
        this.state = { openSignInDialog: false };
    }


    componentWillReceiveProps(nextProps: ExchangeProps) {
        if (this.props.exchange.status === ExchangeStatus.LOGGING_IN && nextProps.exchange.status === ExchangeStatus.LOGGED_IN) {
            this.setState({ openSignInDialog: false });
        }
    }


    render() {

        const { name, balance, totalUSD, status, signedInUser, orderBook } = this.props.exchange;
        const { selectedCurrency, signInToExchange } = this.props;
        const selectedCurrencyBalance = _.find(balance, { coin: selectedCurrency });
        const usdBalance = _.find(balance, { coin: 'USD' });

        return (

            < Card className={styles.exchange} >

                <div className={styles.exchangeHeader}>
                    <ExchangeHeaderBar status={status} signedInUser={signedInUser} name={name} signInToExchange={() => this.setState({ openSignInDialog: true })} />

                    <ExchangeInfo
                        name={name}
                        selectedCurrencyBalance={selectedCurrencyBalance}
                        status={status}
                        totalUSD={totalUSD}
                        signedInUser={signedInUser}
                        selectedCurrency={this.props.selectedCurrency}
                        usdBalance={usdBalance}
                    />
                </div>

                <ExchangeData orderBook={orderBook} />

                {this.renderSignInDialog()}

            </Card >
        );
    }

    renderSignInDialog() {
        return (
            <SignInExchangeDialog
                open={this.state.openSignInDialog}
                exchange={this.props.exchange.name}
                signInToExchange={this.props.signInToExchange}
                onCancel={() => this.setState({ openSignInDialog: false })}
            />
        );
    }
}