import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import Spinner from 'components/common/core/Spinner';
import { SupportedCurrencies, Exchange as IExchange, AccountCredentials } from 'businessLogic/model';
import { getExchanges, getActiveOrderBooks, signInToExchange, logOutFromExchange } from './redux/actions';
import Exchange from 'components/Exchange';

export interface OrderBookProps {
    currentCurrency: SupportedCurrencies;
    exchanges: IExchange[];
    loading?: boolean;
    getExchanges();
    getActiveOrderBooks();
    signInToExchange(creds: AccountCredentials);
    logOutFromExchange(exchange: string);
}

class OrderBook extends React.Component<OrderBookProps, any> {

    constructor(props) {
        super(props);
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

        const { loading, exchanges } = this.props;

        return (
            <div className={styles.orderBook}>
                {loading || _.isEmpty(exchanges) ?
                    <Spinner className={styles.loader} size={80} text={'Loading Account Info...'} />
                    :
                    this.renderExchanges(exchanges)}
            </div>
        );
    }

    renderExchanges(exchanges: IExchange[]) {
        return _.map(exchanges, (exchange: IExchange) =>
            <Exchange key={exchange.name}
                selectedCurrency={this.props.currentCurrency}
                exchange={exchange}
                signInToExchange={this.props.signInToExchange}
                logOutFromExchange={this.props.logOutFromExchange}
            />);
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        currentCurrency: _.get(state, 'app.currency', 'BTC'),
        exchanges: _.get(state, 'orderBook.exchanges', []),
        loading: _.get(state, 'orderBook.loading', false)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getExchanges: () => dispatch(getExchanges()),
        getActiveOrderBooks: () => dispatch(getActiveOrderBooks()),
        signInToExchange: (creds: AccountCredentials) => dispatch(signInToExchange(creds)),
        logOutFromExchange: (exchange: string) => dispatch(logOutFromExchange(exchange))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBook);