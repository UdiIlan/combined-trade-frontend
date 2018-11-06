import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { OrderActionStatus } from 'businessLogic/model';
import UserBalance from './UserBalance';
import Rates from './Rates';
import MyOrders from './MyOrders';
import Graph from './Graph';
import Card from 'components/common/containers/Card';
import { getUserBalance, getExchangeRates } from './redux/actions';
import { getUserOrdersStatus } from '../OrderBook/redux/actions';
import Widget from 'components/common/containers/Widget';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);

interface DashboardStateProps {
  userOrders: OrderActionStatus[];
  userBalance: object;
  exchangeRates: object;
}

interface DashboardDispatchProps {
  getUserOrdersStatus();
  getUserBalance();
  getExchangeRates();
}


type DashboardProps = DashboardStateProps & DashboardDispatchProps;

class Dashboard extends React.Component<DashboardProps, any> {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getUserOrdersStatus();
    this.props.getExchangeRates();
    this.props.getUserBalance();
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
            <Widget title={'BTC Trend'} className={styles.widget}>
              <Graph />
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
    exchangeRates: _.get(state, 'dashboard.exchangeRates')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserOrdersStatus: () => dispatch(getUserOrdersStatus()),
    getUserBalance: () => dispatch(getUserBalance()),
    getExchangeRates: () => dispatch(getExchangeRates())
  };
};

export default connect<DashboardStateProps, DashboardDispatchProps>(mapStateToProps, mapDispatchToProps)(Dashboard);