import * as React from 'react';
import * as _ from 'lodash';
import Card from 'components/common/containers/Card';
import { default as Dialog, DialogProps } from 'components/common/modals/Dialog';
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
    stopExchange(exchange: string);
    startExchange(exchange: string);
    removeExchange(exchange: string);
}

interface ExchangeState {
    openSignInDialog?: boolean;
    confirmDialog?: DialogProps;
}

export default class Exchange extends React.Component<ExchangeProps, ExchangeState> {

    constructor(props: ExchangeProps) {
        super(props);
        this.state = { openSignInDialog: false };
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
        this.stop = this.stop.bind(this);
        this.start = this.start.bind(this);
        this.remove = this.remove.bind(this);
    }


    componentWillReceiveProps(nextProps: ExchangeProps) {
        if (this.state.openSignInDialog && nextProps.exchange.status === ExchangeStatus.LOGGED_IN) {
            this.setState({ openSignInDialog: false });
        }
        if (!!this.state.confirmDialog && this.props.exchange.status === ExchangeStatus.LOGGED_IN && nextProps.exchange.status !== ExchangeStatus.LOGGED_IN) {
            this.setState({ confirmDialog: undefined });
        }
    }

    logIn() {
        this.setState({ openSignInDialog: true });
    }

    logOut() {
        const name = this.props.exchange.name;
        this.setState({
            confirmDialog:
            {
                title: `Log Out ${name}`,
                subTitle: [<span key='row1'>{`You are about to log out from ${name}.`}</span>, <br key='separator' />, <span key='row2'>Are you sure?</span>],
                onOkClick: () => this.props.logOutFromExchange(name),
                onCancelClick: () => this.closeConfirmationDialog(),
                okBtnText: 'Log Out'
            }
        });
    }

    start() {
        this.props.startExchange(this.props.exchange.name);
    }

    stop() {
        const name = this.props.exchange.name;
        this.setState({
            confirmDialog:
            {
                title: `Stop ${name}`,
                subTitle: [<span key='row1'>{`You are about to stop ${name}.`}</span>, <br key='separator' />, <span key='row2'>Are you sure?</span>],
                onOkClick: () => this.props.stopExchange(name),
                onCancelClick: () => this.closeConfirmationDialog(),
                okBtnText: 'Stop'
            }
        });
    }

    remove() {
        const name = this.props.exchange.name;
        this.setState({
            confirmDialog:
            {
                title: `Remove ${name}`,
                subTitle: [<span key='row1'>{`You are about to remove and stop ${name}.`}</span>, <br key='separator' />, <span key='row2'>Are you sure?</span>],
                onOkClick: () => {
                    this.props.stopExchange(name);
                    this.props.removeExchange(name);
                },
                onCancelClick: () => this.closeConfirmationDialog(),
                okBtnText: 'Remove'
            }
        });
    }


    closeConfirmationDialog() {
        this.setState({ confirmDialog: undefined });
    }



    render() {

        const { name, balance, totalUSD, status, signedInUser, orderBook } = this.props.exchange;
        const { selectedCurrency } = this.props;
        const selectedCurrencyBalance = _.find(balance, { coin: selectedCurrency });
        const usdBalance = _.find(balance, { coin: 'USD' });

        return (

            <Card className={styles.exchange} >

                <div className={styles.exchangeHeader}>
                    <ExchangeHeaderBar
                        status={status}
                        signedInUser={signedInUser}
                        name={name}
                        hideActions={name === 'Unified'}
                        startExchange={this.start}
                        stopExchange={this.stop}
                        signInToExchange={this.logIn}
                        logOutFromExchange={this.logOut}
                        removeExchange={this.remove} />

                    <ExchangeInfo
                        selectedCurrencyBalance={selectedCurrencyBalance}
                        totalUSD={totalUSD}
                        selectedCurrency={this.props.selectedCurrency}
                        usdBalance={usdBalance}
                    />
                </div>

                <ExchangeData orderBook={orderBook} stopped={status === ExchangeStatus.STOPPED} />

                {this.state.openSignInDialog && this.renderSignInDialog()}

                {!!this.state.confirmDialog && this.renderConfirmDialog()}

            </Card >
        );
    }

    renderSignInDialog() {
        const { exchange, signInToExchange } = this.props;
        return (
            <SignInExchangeDialog
                exchange={exchange.name}
                signInToExchange={signInToExchange}
                onCancel={() => this.setState({ openSignInDialog: false })}
                invalidLogin={exchange.invalidLogin}
                loggingIn={exchange.status === ExchangeStatus.LOGGING_IN}
            />
        );
    }

    renderConfirmDialog() {
        return <Dialog open={true} {...this.state.confirmDialog} />;
    }
}