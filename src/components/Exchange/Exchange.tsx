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
    logOutFromExchange(exchange: string);
}

interface ExchangeState {
    openSignInDialog?: boolean;
    openLogOutDialog?: boolean;
}

export default class Exchange extends React.Component<ExchangeProps, ExchangeState> {

    constructor(props: ExchangeProps) {
        super(props);
        this.state = { openSignInDialog: false };
    }


    componentWillReceiveProps(nextProps: ExchangeProps) {
        if (this.state.openSignInDialog && nextProps.exchange.status === ExchangeStatus.LOGGED_IN) {
            this.setState({ openSignInDialog: false });
        }
        if (this.state.openLogOutDialog && nextProps.exchange.status !== ExchangeStatus.LOGGED_IN) {
            this.setState({ openLogOutDialog: false });
        }
    }


    render() {

        const { name, balance, totalUSD, status, signedInUser, orderBook } = this.props.exchange;
        const { selectedCurrency } = this.props;
        const selectedCurrencyBalance = _.find(balance, { coin: selectedCurrency });
        const usdBalance = _.find(balance, { coin: 'USD' });

        return (

            < Card className={styles.exchange} >

                <div className={styles.exchangeHeader}>
                    <ExchangeHeaderBar
                        status={status}
                        signedInUser={signedInUser}
                        name={name}
                        hideActions={name === 'Unified'}
                        signInToExchange={() => this.setState({ openSignInDialog: true })}
                        logOutFromExchange={() => this.props.logOutFromExchange(this.props.exchange.name)/*  this.setState({ openLogOutDialog: true }) */} />

                    <ExchangeInfo
                        selectedCurrencyBalance={selectedCurrencyBalance}
                        totalUSD={totalUSD}
                        selectedCurrency={this.props.selectedCurrency}
                        usdBalance={usdBalance}
                    />
                </div>

                <ExchangeData orderBook={orderBook} />

                {this.state.openSignInDialog && this.renderSignInDialog()}

            </Card >
        );
    }

    renderSignInDialog() {
        const { exchange, signInToExchange } = this.props;
        return (
            <SignInExchangeDialog
                open={true}
                exchange={exchange.name}
                signInToExchange={signInToExchange}
                onCancel={() => this.setState({ openSignInDialog: false })}
                invalidLogin={exchange.invalidLogin}
                loggingIn={exchange.status === ExchangeStatus.LOGGING_IN}
            />
        );
    }
}