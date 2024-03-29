import * as React from 'react';
import * as _ from 'lodash';
import Card from 'components/common/containers/Card';
import { default as Dialog, DialogProps } from 'components/common/modals/Dialog';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import { Exchange as IExchange, SupportedCurrencies, AccountCredentials, ExchangeStatus, UNIFIED_EXCHANGE_KEY } from 'businessLogic/model';
import ExchangeInfo from './ExchangeInfo';
import ExchangeData from './ExchangeData';
import ExchangeHeaderBar from './ExchangeHeaderBar';
import SignInExchangeDialog from './SignInExchangeDialog';
import { getLocalizedText } from 'lang';

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
                title: `${getLocalizedText('logout')} ${name}`,
                subTitle: [<span key='row1'>{`${getLocalizedText('logout_exchange_confirm')} ${name}.`}</span>, <br key='separator' />, <span key='row2'>{getLocalizedText('are_you_sure')}</span>],
                onOkClick: () => this.props.logOutFromExchange(name),
                onCancelClick: () => this.closeConfirmationDialog(),
                okBtnText: getLocalizedText('logout')
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
                title: `${getLocalizedText('stop')} ${name}`,
                subTitle: [<span key='row1'>{`${getLocalizedText('stop_exchange_confirm')} ${name}.`}</span>, <br key='separator' />, <span key='row2'>{getLocalizedText('are_you_sure')}</span>],
                onOkClick: () => this.props.stopExchange(name),
                onCancelClick: () => this.closeConfirmationDialog(),
                okBtnText: getLocalizedText('stop')
            }
        });
    }

    remove(stop?: boolean) {
        const name = this.props.exchange.name;
        this.setState({
            confirmDialog:
            {
                title: `${stop ? getLocalizedText('remove') : getLocalizedText('hide')} ${name}`,
                subTitle: [<span key='row1'>{`${stop ? getLocalizedText('remove_exchange_confirm') : getLocalizedText('hide_exchange_confirm')} ${name}.`}</span>, <br key='separator' />, <span key='row2'>{getLocalizedText('are_you_sure')}</span>],
                onOkClick: () => {
                    if (stop) this.props.stopExchange(name);
                    this.props.removeExchange(name);
                },
                onCancelClick: () => this.closeConfirmationDialog(),
                okBtnText: stop ? getLocalizedText('remove') : getLocalizedText('hide')
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

            <Card className={cx(styles.exchange, { unified: name === UNIFIED_EXCHANGE_KEY })} >

                <div className={styles.exchangeHeader}>
                    <ExchangeHeaderBar
                        status={status}
                        signedInUser={signedInUser}
                        name={name}
                        hideActions={name === UNIFIED_EXCHANGE_KEY}
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