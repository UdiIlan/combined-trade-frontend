import * as React from 'react';
import { Link } from 'react-router-dom';
import { Account} from 'businessLogic/model';
import Widget from 'components/common/containers/Widget';
import { InputText } from 'components/common/core';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import Grid from 'components/common/dataLayouts/Grid';
import { TRADES_COLUMNS } from 'components/AccountManager/TradeManager/TradeManager';
import { FUNDS_COLUMNS } from 'components/AccountManager/FundsManager/FundsManager';



export interface AccountDashboardProps {
    account: Account;
    selectAccount(account);
}


export default class AccountDashboard extends React.Component<AccountDashboardProps, any> {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.selectAccount(this.props.account);
    }

    render() {
        const { account } = this.props;
        return (
            <div className={styles.dashboard}>
                <InputText className={styles.description} disabled={true} outlined label='Description' value={this.props.account ? this.props.account.description : 'default account description'}> </InputText>
                <div className={styles.dashboardContainer}>
                    <div className={styles.dashboardContent}>

                        <div className={styles.firstWidgetColumn}>
                            <Widget title={<div className={styles.title}>Balance</div>} className={styles.firstWidget} loading={!this.props.account.balance}>
                                <div>
                                    {this.props.account.balance ?
                                        <div className={styles.balance}>
                                            {Object.keys(this.props.account.balance).map(key => (
                                                <div className={styles.balanceItem} key={key}>
                                                    <span className={styles.asset}>{`${key.toUpperCase()}:`}</span>
                                                    <span className={styles.value}>{this.props.account.balance[key]}</span>
                                                </div>
                                            ))}
                                        </div> : ''
                                    }
                                </div>
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

                            <Widget title={<div className={styles.title}>Funds<Link className={styles.link} to={'/funds'} /></div>} className={styles.lastWidget} loading={!this.props.account.funds}>
                            <div>
                                    {this.props.account.funds ?
                                        <Grid
                                            sortBy='requestTime'
                                            sortDirection='desc'
                                            className={styles.grid}
                                            data={this.props.account.funds.slice(0, 5)}
                                            columns={FUNDS_COLUMNS}
                                            disablePagination={true}
                                        /> : ''
                                    }
                                </div>
                            </Widget>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

