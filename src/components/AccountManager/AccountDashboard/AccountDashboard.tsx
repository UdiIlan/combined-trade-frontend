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
        // this.props.getUserOrdersStatus();
        // this.props.getExchangeRates();
        // this.props.getUserBalance();
        // this.props.getCurrencyTrend(btc);
    }

    render() {
        const { account } = this.props;
        return (
            <div className={styles.dashboard}>

                <div className={styles.dashboardContent}>
                    <InputText className={styles.description} outlined label='description' value={this.props.account ? this.props.account.description : 'default account description'}> </InputText>
                    <div className={styles.widgetColumn} >

                        <Widget title={'Balance'} className={styles.widget} loading={!this.props.accountBalance}>
                        </Widget>

                        <Widget title={<div>Trades<Link className={styles.link} to={'/trades'} /></div>} className={styles.middleWidget} loading={!this.props.accountTrades}>
                        </Widget>

                        <Widget title={<div>Funds<Link className={styles.link} to={'/funds'} /></div>} className={styles.widget} loading={!this.props.accountFunds}>
                        </Widget>

                    </div>
                </div>

            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         // account: _.get(state, 'account.trendData')
//         // userOrders: _.get(state, 'orderBook.userOrders'),
//         // userBalance: _.get(state, 'dashboard.userBalance'),
//         // exchangeRates: _.get(state, 'dashboard.exchangeRates'),
//         // trendData: _.get(state, 'dashboard.trendData')
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         // getUserOrdersStatus: () => dispatch(getUserOrdersStatus()),
//         // getUserBalance: () => dispatch(getUserBalance()),
//         // getExchangeRates: () => dispatch(getExchangeRates()),
//         // getCurrencyTrend: (currency: string) => dispatch(getCurrencyTrend(currency))
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(AccountDashboard);