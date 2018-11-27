import * as React from 'react';
import * as _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { OrderActionStatus } from 'businessLogic/model';
import Card from 'components/common/containers/Card';
import { Account, OrderStatus, DepositRequest } from 'businessLogic/model';
import Widget from 'components/common/containers/Widget';
import { InputText } from 'components/common/core';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import Grid from 'components/common/dataLayouts/Grid';
import { DateUtils, MathUtils } from 'businessLogic/utils';
import { getLocalizedText } from 'lang';


const TRADES_COLUMNS = [
    { id: 'startTime', title: 'Time', render: item => DateUtils.defaultFormat(item.startTime) },
    { id: 'assetPair', title: 'Asset' },
    { id: 'actionType', title: 'Action', render: item => getLocalizedText(item.actionType) },
    { id: 'status', title: 'Status' },
    { id: 'requestedSize', title: 'Size', render: item => parseFloat(item.requestedSize).toFixed(4) },
    { id: 'requestedPrice', title: 'Price', render: item => MathUtils.toFixed(item.requestedPrice) },
];

export interface AccountDashboardProps {
    account: Account;
    accountBalance?: object;
    accountTrades?: object;
    accountFunds?: object;

}


export default class AccountDashboard extends React.Component<AccountDashboardProps, any> {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        const { account } = this.props;
        return (
            <div className={styles.dashboard}>
                <InputText className={styles.description} disabled={true} outlined label='Description' value={this.props.account ? this.props.account.description : 'default account description'}> </InputText>
                <div className={styles.dashboardContainer}>
                    <div className={styles.dashboardContent}>

                        <div className={styles.firstWidgetColumn}>
                            <Widget title={<div className={styles.title}>Balance</div>} className={styles.firstWidget} loading={!this.props.accountBalance}>
                            </Widget>
                        </div>
                        <div className={styles.widgetColumn} >
                            <Widget title={<div className={styles.title}>Trades<Link className={styles.link} to={'/trades'} /></div>} className={styles.middleWidget} /*loading={!this.props.accountTrades}*/>
                                <div>
                                    {this.props.account.trades ?
                                        <Grid
                                            sortBy='startTime'
                                            sortDirection='desc'
                                            className={styles.grid}
                                            data={this.props.account.trades.slice(0, 5)}
                                            columns={TRADES_COLUMNS}
                                            disablePagination={true}
                                        /> : ''
                                    }
                                </div>
                            </Widget>

                            <Widget title={<div className={styles.title}>Funds<Link className={styles.link} to={'/funds'} /></div>} className={styles.lastWidget} loading={!this.props.accountFunds}>
                            </Widget>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

