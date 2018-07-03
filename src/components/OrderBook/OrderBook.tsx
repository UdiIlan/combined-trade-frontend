import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import Spinner from 'components/common/core/Spinner';
import { SupportedCurrencies, Exchange as IExchange } from 'businessLogic/model';
import { getExchanges } from './redux/actions';
import Exchange from 'components/Exchange';

export interface OrderBookProps {
    currentCurrency: SupportedCurrencies;
    exchanges: IExchange[];
    loading?: boolean;
    getExchanges();
}

class OrderBook extends React.Component<OrderBookProps, any> {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getExchanges();
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
        return _.map(exchanges, (exchange: IExchange) => <Exchange key={exchange.name}
            selectedCurrency={this.props.currentCurrency}
            exchange={exchange}
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
        getExchanges: () => dispatch(getExchanges())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBook);