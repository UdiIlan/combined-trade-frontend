import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { OrderActionStatus } from 'businessLogic/model';
import Card from 'components/common/containers/Card';
import { Account } from 'businessLogic/model';
import Widget from 'components/common/containers/Widget';
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
                    <div> {this.props.account ? this.props.account.description : 'default account description'}</div>
                    <div className={styles.widgetColumn} >

                        <Widget title={'Balance'} className={styles.widget} loading={!this.props.accountBalance}>
                            <p> balance </p>
                        </Widget>

                        <Widget title={'Trades'} className={cx(styles.widget, styles.orders)} loading={!this.props.accountTrades}>
                            <p> trades </p>
                        </Widget>

                        <Widget title={'Funds'} className={styles.widget} loading={!this.props.accountFunds}>
                            <p> funds </p>
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