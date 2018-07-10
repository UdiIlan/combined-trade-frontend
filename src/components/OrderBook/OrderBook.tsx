import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import Spinner from 'components/common/core/Spinner';
import { SupportedCurrencies, Exchange as IExchange, AccountCredentials, ExchangeStatus, OrderAction } from 'businessLogic/model';
import {
    getExchanges, getActiveOrderBooks, signInToExchange, logOutFromExchange,
    startExchange, stopExchange, removeExchange, addExchanges, sendOrderCommand
} from './redux/actions';
import Exchange from 'components/Exchange';
import Button from 'components/common/core/Button';
import TradeActionDialog from 'components/TradeActionDialog';
import AddExchangeDialog from 'components/AddExchangeDialog';

export interface OrderBookProps {
    currentCurrency: SupportedCurrencies;
    exchanges: IExchange[];
    removedExchanges: string[];
    loading?: boolean;
    getExchanges();
    getActiveOrderBooks();
    signInToExchange(creds: AccountCredentials);
    logOutFromExchange(exchange: string);
    stopExchange(exchange: string);
    startExchange(exchange: string);
    removeExchange(exchange: string);
    addExchanges(newExchanges: string[]);
    sendOrderCommand(command: OrderAction);
}

export interface OrderBookState {
    openTradingDialog?: boolean;
    openAddExchangeDialog?: boolean;
}

class OrderBook extends React.Component<OrderBookProps, OrderBookState> {

    constructor(props) {
        super(props);
        this.state = {};
        this.renderExchange = this.renderExchange.bind(this);
        this.trade = this.trade.bind(this);
    }

    private timerObj;

    componentWillMount() {
        this.props.getExchanges();
        this.restartTimer();
    }

    restartTimer() {
        clearTimeout(this.timerObj);
        this.timerObj = setTimeout(() => {
            if (!this.props.loading) this.props.getActiveOrderBooks();
            this.restartTimer();
        }, 3000);
    }


    render() {

        const { loading, exchanges, currentCurrency, sendOrderCommand } = this.props;

        return (
            <div className={styles.orderBook}>
                <div className={styles.content}>
                    {loading || _.isEmpty(exchanges) ?
                        <Spinner className={styles.loader} size={80} text={'Loading Account Info...'} />
                        :
                        this.renderExchanges(exchanges)}
                </div>

                <div className={styles.addContainer}>
                    <Button type='floating' className={styles.addExhBtn} iconName='add' intent='primary' onClick={() => this.setState({ openAddExchangeDialog: true })} />
                </div>

                {this.state.openTradingDialog &&
                    <TradeActionDialog
                        exchanges={_.map(_.filter(exchanges, (exchange: IExchange) => exchange.status === ExchangeStatus.LOGGED_IN), exchange => exchange.name)}
                        onCancel={() => this.setState({ openTradingDialog: false })}
                        sendNewOrderCommand={(command) => {
                            this.setState({ openTradingDialog: false });
                            sendOrderCommand(command);
                        }}
                        selectedCurrency={currentCurrency} />}

                {this.state.openAddExchangeDialog &&
                    <AddExchangeDialog
                        addExchanges={(newExchanges) => {
                            this.setState({ openAddExchangeDialog: false });
                            this.props.addExchanges(newExchanges);
                        }}
                        removedExchanges={this.props.removedExchanges}
                        onCancel={() => this.setState({ openAddExchangeDialog: false })} />}

            </div>
        );
    }

    renderExchanges(exchanges: IExchange[]) {

        if (!exchanges) return;
        exchanges = [...exchanges];
        exchanges = _.filter(exchanges, exchange => this.props.removedExchanges.indexOf(exchange.name) < 0);
        const unifiedIndex = _.findIndex(exchanges, { name: 'Unified' });
        const unified = exchanges[unifiedIndex];
        exchanges.splice(unifiedIndex, 1);

        return (
            <div className={styles.exchangesMain}>
                <div className={styles.unified}>
                    {this.renderExchange(unified)}
                    <div className={styles.divider} key='exchange-divider' />
                </div>
                <div className={styles.exchanges}>
                    {_.map(exchanges, this.renderExchange)}
                </div>
            </div>);

    }

    renderExchange(exchange: IExchange) {
        return (
            <Exchange key={exchange.name}
                selectedCurrency={this.props.currentCurrency}
                exchange={exchange}
                signInToExchange={this.props.signInToExchange}
                logOutFromExchange={this.props.logOutFromExchange}
                startExchange={this.props.startExchange}
                stopExchange={this.props.stopExchange}
                removeExchange={this.props.removeExchange}
            />);

    }

    trade() {
        this.setState({ openTradingDialog: true });
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        currentCurrency: _.get(state, 'app.currency', 'BTC'),
        exchanges: _.get(state, 'orderBook.exchanges', []),
        loading: _.get(state, 'orderBook.loading', false),
        removedExchanges: _.get(state, 'orderBook.removedExchanges', []),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getExchanges: () => dispatch(getExchanges()),
        getActiveOrderBooks: () => dispatch(getActiveOrderBooks()),
        signInToExchange: (creds: AccountCredentials) => dispatch(signInToExchange(creds)),
        logOutFromExchange: (exchange: string) => dispatch(logOutFromExchange(exchange)),
        stopExchange: (exchange: string) => dispatch(stopExchange(exchange)),
        startExchange: (exchange: string) => dispatch(startExchange(exchange)),
        removeExchange: (exchange: string) => dispatch(removeExchange(exchange)),
        addExchanges: (newExchanges: string[]) => dispatch(addExchanges(newExchanges)),
        sendOrderCommand: (command: OrderAction) => dispatch(sendOrderCommand(command)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps, undefined, { withRef: true })(OrderBook);