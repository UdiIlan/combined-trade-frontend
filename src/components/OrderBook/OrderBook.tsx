import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
const styles = require('./styles.scss');
import Spinner from 'components/common/core/Spinner';
import {
    SupportedCurrencies, Exchange as IExchange, AccountCredentials,
    UNIFIED_EXCHANGE_KEY, OrderAction, ExchangeStatus
} from 'businessLogic/model';
import {
    getExchanges, getActiveOrderBooks, signInToExchange, logOutFromExchange,
    startExchange, stopExchange, removeExchange, selectExchanges, sendOrderCommand
} from './redux/actions';
import Exchange from './Exchange';
import ManageExchangeDialog from './ManageExchangeDialog';
import TradingPen from './TradingPen';
import OrdersPen from './OrdersPen';

const EXCHANGE_PULLING_RATE = 3000;

export interface OrderBookProps {
    currentCurrency: SupportedCurrencies;
    exchanges: IExchange[];
    exchangesStatus: {};
    loading?: boolean;
    getExchanges();
    getActiveOrderBooks();
    signInToExchange(creds: AccountCredentials);
    logOutFromExchange(exchange: string);
    stopExchange(exchange: string);
    startExchange(exchange: string);
    removeExchange(exchange: string);
    selectExchanges(exchangesToAdd: string[], exchangesToRemove: string[]);
    sendOrderCommand(command: OrderAction);
}

export interface OrderBookState {
    openAddExchangeDialog?: boolean;
}

class OrderBook extends React.Component<OrderBookProps, OrderBookState> {

    constructor(props) {
        super(props);
        this.state = {};
        this.renderExchange = this.renderExchange.bind(this);
        this.manageExchanges = this.manageExchanges.bind(this);
    }

    private timerObj;

    componentWillMount() {
        this.props.getExchanges();
        this.restartTimer();
    }

    componentWillUnmount() {
        clearTimeout(this.timerObj);
    }

    restartTimer() {
        clearTimeout(this.timerObj);
        this.timerObj = setTimeout(() => {
            if (!this.props.loading) this.props.getActiveOrderBooks();
            this.restartTimer();
        }, EXCHANGE_PULLING_RATE);
    }


    render() {

        const { loading, exchanges, currentCurrency, sendOrderCommand } = this.props;

        return (
            <div className={styles.orderBook}>
                <div className={styles.content}>
                    {loading || _.isEmpty(exchanges) ?
                        <Spinner className={styles.loader} size={80} text={'Loading Account Info...'} />
                        :
                        [
                            <TradingPen
                                key='trading_pen'
                                selectedCurrency={currentCurrency}
                                exchanges={_.map(_.filter(exchanges, (exchange: IExchange) => exchange.status === ExchangeStatus.LOGGED_IN), exchange => exchange.name)}
                                sendNewOrderCommand={sendOrderCommand}
                                className={styles.tradingPen} />,
                            this.renderExchanges(exchanges),
                            <OrdersPen key='orders_pen' className={styles.orderStatus} />
                        ]
                    }
                </div>

                {this.state.openAddExchangeDialog &&
                    <ManageExchangeDialog
                        selectExchanges={(exchangesToAdd: string[], exchangesToRemove: string[]) => {
                            this.setState({ openAddExchangeDialog: false });
                            this.props.selectExchanges(exchangesToAdd, exchangesToRemove);
                        }}
                        exchangesStatus={this.props.exchangesStatus}
                        onCancel={() => this.setState({ openAddExchangeDialog: false })} />}

            </div>
        );
    }

    renderExchanges(exchanges: IExchange[]) {

        if (!exchanges) return;
        exchanges = [...exchanges];
        exchanges = _.filter(exchanges, exchange => this.props.exchangesStatus[exchange.name]);
        const unifiedIndex = _.findIndex(exchanges, { name: UNIFIED_EXCHANGE_KEY });
        const unified = exchanges[unifiedIndex];
        exchanges.splice(unifiedIndex, 1);

        return (
            <div key='exchangesMain' className={styles.exchangesMain}>
                <div className={styles.unified}>
                    {this.renderExchange(unified)}
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

    manageExchanges() {
        this.setState({ openAddExchangeDialog: true });
    }

}

const mapStateToProps = (state) => {
    return {
        currentCurrency: _.get(state, 'app.currency', 'BTC'),
        exchanges: _.get(state, 'orderBook.exchanges', []),
        loading: _.get(state, 'orderBook.loading', false),
        exchangesStatus: _.get(state, 'orderBook.exchangesStatus', {}),
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
        selectExchanges: (exchangesToAdd: string[], exchangesToRemove: string[]) => dispatch(selectExchanges(exchangesToAdd, exchangesToRemove)),
        sendOrderCommand: (command: OrderAction) => dispatch(sendOrderCommand(command)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps, undefined, { withRef: true })(OrderBook);