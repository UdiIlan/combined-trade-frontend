import * as React from 'react';
import { getLocalizedText } from 'lang';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import Card from 'components/common/containers/Card';
import { default as Grid, GridColumn } from 'components/common/dataLayouts/Grid';
import { DateUtils, MathUtils } from 'businessLogic/utils';

const REPORT_COLUMNS: GridColumn[] = [
    { id: 'actionType', title: 'Action Type', render: item => getLocalizedText(item.actionType) },
    { id: 'assetPair', title: 'Crypto Type' },
    { id: 'size', title: 'Size', render: item => parseFloat(item.size).toFixed(4) },
    { id: 'price', title: 'Price', render: item => MathUtils.toFixed(item.price) },
    { id: 'orderTime', title: 'Date', render: item => DateUtils.defaultFormat(item.orderTime) },
    { id: 'status', title: 'Status' },
    { id: 'exchange', title: 'Exchange' },
    { id: 'tradeOrderId', title: 'ID' },
    { id: 'exchangeOrderId', title: 'Exchange Order ID' },
    { id: 'currencyFromAvailable', title: 'Crypto Balance', render: item => parseFloat(item.currencyFromAvailable).toFixed(4) },
    { id: 'currencyToAvailable', title: 'USD Balance', render: item => parseFloat(item.currencyToAvailable).toFixed(4) },
    { id: 'ask', title: 'Ask' },
    { id: 'bid', title: 'Bid' },
];

interface ReportDataProps {
    data?: any[];
    loading?: boolean;
}

export default class ReportData extends React.Component<ReportDataProps, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className={cx(styles.reportData, { blurring: this.props.loading })}>
                <Grid
                    sortBy='orderTime'
                    sortDirection='desc'
                    className={styles.grid}
                    data={this.props.data}
                    columns={REPORT_COLUMNS}
                    nestedDataPropertyName='childOrders'
                    renderNestedItems={(item) => this.renderOrderChildren(item)}
                />
            </Card>
        );
    }

    renderOrderChildren(item) {
        return (
            <div className={styles.orderNestedContainer}>
                <Grid
                    sortBy='orderTime'
                    sortDirection='desc'
                    nested
                    data={item.childOrders}
                    columns={REPORT_COLUMNS}
                />
            </div>
        );
    }
}