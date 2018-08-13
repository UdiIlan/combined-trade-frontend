import * as React from 'react';
import { getLocalizedText } from 'lang';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import Card from 'components/common/containers/Card';
import { default as Grid, GridColumn } from 'components/common/dataLayouts/Grid';
import { DateUtils, MathUtils } from 'businessLogic/utils';

const REPORT_COLUMNS: GridColumn[] = [
    { id: 'action_type', title: 'Action Type', render: item => getLocalizedText(item.action_type) },
    { id: 'crypto_type', title: 'Crypto Type' },
    { id: 'crypto_size', title: 'Size', render: item => parseFloat(item.crypto_size).toFixed(4) },
    { id: 'price_fiat', title: 'Price', render: item => MathUtils.toFixed(item.price_fiat) },
    { id: 'order_time', title: 'Date', render: item => DateUtils.defaultFormat(item.order_time) },
    { id: 'status', title: 'Status' },
    { id: 'exchange', title: 'Exchange' },
    { id: 'exchange_id', title: 'ID' },
    { id: 'crypto_available', title: 'Crypto Balance', render: item => parseFloat(item.crypto_available).toFixed(4) },
    { id: 'usd_balance', title: 'USD Balance', render: item => parseFloat(item.usd_balance).toFixed(4) },
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
                    sortBy='order_time'
                    sortDirection='desc'
                    className={styles.grid}
                    data={this.props.data}
                    columns={REPORT_COLUMNS}
                    renderNestedItems={(item) => this.renderOrderChildren(item)}
                />
            </Card>
        );
    }

    renderOrderChildren(item) {
        return (
            <div className={styles.orderNestedContainer}>
                <Grid
                    sortBy='order_time'
                    sortDirection='desc'
                    nested
                    data={item.children}
                    columns={REPORT_COLUMNS}
                />
            </div>
        );
    }
}