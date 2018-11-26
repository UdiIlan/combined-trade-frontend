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
    { id: 'startTime', title: 'Start Time', render: item => DateUtils.defaultFormat(item.startTime) },
    { id: 'assetPair', title: 'Asset Pair' },
    { id: 'actionType', title: 'Action Type', render: item => getLocalizedText(item.actionType) },
    { id: 'status', title: 'Status' },
    { id: 'requestedSize', title: 'Requested Size', render: item => parseFloat(item.requestedSize).toFixed(4) },
    { id: 'requestedPrice', title: 'Requested Price', render: item => MathUtils.toFixed(item.requestedPrice) },
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
                <div className={styles.dashboardContent}>

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
                                    // forceNestedRendering
                                    // renderNestedItems={(item) => this.renderOrderChildren(item)}
                                    /> : ''
                                }
                            </div>
                        </Widget>
                    </div>
                    <div className={styles.widgetColumn} >
                        <Widget title={<div className={styles.title}>Balance</div>} className={styles.widget} loading={!this.props.accountBalance}>
                        </Widget>

                        <Widget title={<div className={styles.title}>Funds<Link className={styles.link} to={'/funds'} /></div>} className={styles.widget} loading={!this.props.accountFunds}>
                        </Widget>

                    </div>
                </div>

            </div>
        );
    }

    renderOrderChildren(item: OrderStatus) {
        return (
            <div className={styles.orderNestedContainer}>
                <InputText outlined disabled value={item.executionSize} label={'Executed so far'} />
                <InputText outlined disabled value={item.elapsedTimeMinutes} label={'Elapsed Time (in minutes)'} />
                <InputText outlined disabled value={item.actionType} label={'Action Type'} />
                <InputText outlined disabled value={item.executedTargetSize} label={'Target asset executed so far'} />
                <InputText outlined disabled value={item.tradeOrderId} label={'Order Id'} />
                {item.executionMessage && <InputText outlined disabled value={item.executionMessage} label={'Execution Message'} />}

            </div>
        );
    }
}

