import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { OrderActionStatus } from 'businessLogic/model';
import UserBalance from './UserBalance';
import Rates from './Rates';
import MyOrders from './MyOrders';
import CurrencyTrend from './CurrencyTrend';
import Card from 'components/common/containers/Card';
import { getUserBalance, getExchangeRates, getCurrencyTrend } from './redux/actions';
import { getUserOrdersStatus } from '../OrderBook/redux/actions';
import Widget from 'components/common/containers/Widget';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);

interface DashboardStateProps {
  userOrders: OrderActionStatus[];
  userBalance: object;
  exchangeRates: object;
  trendData: object[];
}

interface DashboardDispatchProps {
  getUserOrdersStatus();
  getUserBalance();
  getExchangeRates();
  getCurrencyTrend(currency);
}

const btc = 'BTC/USD';

type DashboardProps = DashboardStateProps & DashboardDispatchProps;

class Dashboard extends React.Component<DashboardProps, any> {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getUserOrdersStatus();
    this.props.getExchangeRates();
    this.props.getUserBalance();
    this.props.getCurrencyTrend(btc);
  }

  componentDidMount () {
    const timer = setInterval(
      () => this.props.getExchangeRates(),
      1000
    );
  }

  render() {
    return (
      <div className={styles.dashboard}>

        <div className={styles.dashboardContent}>

          <div className={styles.widgetColumn} >

            <Widget title={'My Balance'} className={styles.widget} loading={!this.props.userBalance}>
              <UserBalance userBalance={this.props.userBalance} ></UserBalance>
            </Widget>

            <Widget title={'Last Orders'} className={cx(styles.widget, styles.orders)} loading={!this.props.userOrders}>
              <MyOrders userLastOrders={this.props.userOrders}> </MyOrders>
            </Widget>

            <Widget title={'Exchange Rates'} className={styles.widget} loading={!this.props.exchangeRates}>
              <Rates exchangeRates={this.props.exchangeRates} ></Rates>
            </Widget>

          </div>


          <div className={styles.widgetColumn} >

            <Widget title={'test'} className={styles.widget} loading>

            </Widget>
            <Widget title={'Currency Trend'} className={styles.widget}>
              <CurrencyTrend trendData={this.props.trendData} getCurrencyTrend={this.props.getCurrencyTrend} />
            </Widget>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userOrders: _.get(state, 'orderBook.userOrders'),
    userBalance: _.get(state, 'dashboard.userBalance'),
    exchangeRates: _.get(state, 'dashboard.exchangeRates'),
    trendData: _.get(state, 'dashboard.trendData')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserOrdersStatus: () => dispatch(getUserOrdersStatus()),
    getUserBalance: () => dispatch(getUserBalance()),
    getExchangeRates: () => dispatch(getExchangeRates()),
    getCurrencyTrend: (currency: string) => dispatch(getCurrencyTrend(currency))
  };
};

export default connect<DashboardStateProps, DashboardDispatchProps>(mapStateToProps, mapDispatchToProps)(Dashboard);