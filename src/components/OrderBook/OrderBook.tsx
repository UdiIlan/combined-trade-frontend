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
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';

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
                <div className={styles.content}>
                    {loading || _.isEmpty(exchanges) ?
                        <Spinner className={styles.loader} size={80} text={'Loading Account Info...'} />
                        :
                        this.renderExchanges(exchanges)}
                </div>

                <div className={styles.addContainer}>
                    <Button variant='fab' className={styles.addExhBtn} color={'primary'}>
                        <Icon>
                            add
                    </Icon>
                    </Button>
                </div>
            </div>
        );
    }

    renderExchanges(exchanges: IExchange[]) {

        if (!exchanges) return;
        const unifiedIndex = _.findIndex(exchanges, { name: 'Unified' });
        const unified = exchanges[unifiedIndex];
        exchanges.splice(unifiedIndex, 1);


        return (
            <div className={styles.exchangesMain}>
                <div className={styles.unified}>
                    <Exchange key={unified.name}
                        selectedCurrency={this.props.currentCurrency}
                        exchange={unified}
                        signInToExchange={this.props.signInToExchange}
                        logOutFromExchange={this.props.logOutFromExchange}
                    />

                    <Divider className={styles.divider} key='exchange-divider' />
                </div>
                <div className={styles.exchanges}>
                    {_.map(exchanges, (exchange: IExchange) =>
                        <Exchange key={exchange.name}
                            selectedCurrency={this.props.currentCurrency}
                            exchange={exchange}
                            signInToExchange={this.props.signInToExchange}
                            logOutFromExchange={this.props.logOutFromExchange}
                        />)}
                </div>
            </div>);

    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        currentCurrency: _.get(state, 'app.currency', 'BTC'),
        exchanges: [..._.get(state, 'orderBook.exchanges', [])],
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