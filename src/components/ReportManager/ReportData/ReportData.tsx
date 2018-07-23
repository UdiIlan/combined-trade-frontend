import * as React from 'react';
const styles = require('./styles.scss');
import Card from 'components/common/containers/Card';
import { default as Grid, GridColumn } from 'components/common/dataLayouts/Grid';
import { DateUtils } from 'businessLogic/utils';

const REPORT_COLUMNS = [
    { id: 'action_type', title: 'Action Type' },
    { id: 'crypto_type', title: 'Crypto Type' },
    { id: 'crypto_size', title: 'Size' },
    { id: 'price_fiat', title: 'Price' },
    { id: 'order_time', title: 'Date', render: (item) => DateUtils.defaultFormat(item['order_time']) },
    { id: 'status', title: 'Status' },
    { id: 'exchange', title: 'Exchange' },
    { id: 'exchange_id', title: 'ID' },
    { id: 'crypto_available', title: 'Crypto Balance' },
    // { id: 'timed_order', title: 'Is Timed Order' },
    { id: 'usd_balance', title: 'USD Balance' },
    { id: 'ask', title: 'Ask' },
    { id: 'bid', title: 'Bid' },
];

interface ReportDataProps {
    data?: any[];
}

export default class ReportData extends React.Component<ReportDataProps, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className={styles.reportData}>
                <Grid className={styles.grid} data={this.props.data} columns={REPORT_COLUMNS} />
            </Card>
        );
    }
}