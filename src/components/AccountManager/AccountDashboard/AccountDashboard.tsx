import * as React from 'react';
import * as _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { OrderActionStatus } from 'businessLogic/model';
import Card from 'components/common/containers/Card';
import { Account } from 'businessLogic/model';
import Widget from 'components/common/containers/Widget';
import { InputText } from 'components/common/core';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);

interface AccountDashboardProps {
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

                <div className={styles.dashboardContent}>
                    <InputText className={styles.description} disabled= {true} outlined label='description' value={this.props.account ? this.props.account.description : 'default account description'}> </InputText>
                    <div className={styles.widgetColumn} >

                        <Widget title={'Balance'} className={styles.widget} loading={!this.props.accountBalance}>
                        </Widget>

                        <Widget title={<div className={styles.title}>Trades<Link className={styles.link} to={'/trades'} /></div>} className={styles.middleWidget} loading={!this.props.accountTrades}>
                        </Widget>

                        <Widget title={<div className={styles.title}>Funds<Link className={styles.link} to={'/funds'} /></div>} className={styles.widget} loading={!this.props.accountFunds}>
                        </Widget>

                    </div>
                </div>

            </div>
        );
    }
}