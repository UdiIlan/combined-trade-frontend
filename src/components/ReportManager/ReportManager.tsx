import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
const styles = require('./styles.scss');
import { getOrdersReport, setOrdersReport } from './redux/actions';
import FilterBar from './FilterBar';
import ReportData from './ReportData';
import { UNIFIED_EXCHANGE_KEY } from 'businessLogic/model';


interface ReportManagerProps {
    data?: any[];
    loading?: boolean;
    exchanges: string[];
    getOrdersReport(filters: any);
    resetOrdersReport();
}

class ReportManager extends React.Component<ReportManagerProps, any> {

    constructor(props) {
        super(props);
        this.exportOrders = this.exportOrders.bind(this);
    }

    componentWillUnmount() {
        this.props.resetOrdersReport();
    }

    render() {

        const { data, getOrdersReport, exchanges, loading } = this.props;
        const actualExchanges = _.filter(exchanges, item => item !== UNIFIED_EXCHANGE_KEY);

        return (
            <div className={styles.reportManager}>
                <FilterBar
                    getReportData={getOrdersReport}
                    exchanges={actualExchanges}
                    loading={loading}
                    noData={_.isEmpty(data)}
                    export={this.exportOrders}
                />
                <ReportData data={data} />
            </div>
        );
    }

    exportOrders() {

        const orders = [];
        _.forEach(this.props.data, (order) => {
            orders.push(order);
            if (!_.isEmpty(order.children))
                _.forEach(order.children, order => orders.push(order));
        });

        const headers = ['Type', 'Exchange', 'Order Date and Time', 'Timed / Manual', 'Size', 'Coin', 'Price', 'Status', 'USD Balance', 'Crypto Balance'];
        const headers_row = headers.join(',');
        let data_rows = '';
        let timed_order_dict = { 0: 'Manual', 1: 'Timed' };
        for (let i = 0; i < orders.length; ++i) {
            let curr_row = [orders[i].action_type, orders[i].exchange, orders[i].order_time,
            timed_order_dict[orders[i].timed_order], parseFloat(orders[i].crypto_size).toFixed(4),
            orders[i].crypto_type, orders[i].price_fiat, orders[i].status,
            orders[i].usd_balance, orders[i].crypto_available];
            data_rows = data_rows + curr_row.join(',') + '\n';
        }
        let encodedUri = encodeURI('data:text/csv;charset=utf-8,' + headers_row + '\n' + data_rows);
        let link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        let currentDate = new Date();
        let datetime = `${currentDate.getFullYear()}_00${currentDate.getMonth() + 1}_00${currentDate.getDate()}_00${currentDate.getHours()}_00${currentDate.getMinutes()}_00${currentDate.getSeconds()}`;

        // Creating a downloadable link and clicking on it
        link.setAttribute('download', 'sent_orders_' + datetime + '.csv');
        link.innerHTML = 'Click Here to download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}


const mapStateToProps = (state) => {
    return {
        data: _.get(state, 'reportManager.data', []),
        loading: _.get(state, 'reportManager.loading', false),
        exchanges: _.map(_.get(state, 'orderBook.exchanges', []), exchange => exchange.name)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOrdersReport: (filters) => dispatch(getOrdersReport(filters)),
        resetOrdersReport: () => dispatch(setOrdersReport(undefined))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportManager);