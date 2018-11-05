import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { OrderActionStatus } from 'businessLogic/model';
import UserBalance from './UserBalance';
import Rates from './Rates';
import MyOrders from './MyOrders';
import Graph from './Graph';
import Card from 'components/common/containers/Card';
import { getUserBalance, setUserBalance } from './redux/actions';
import { getUserOrdersStatus } from '../OrderBook/redux/actions';
import Widget from 'components/common/containers/Widget';
const styles = require('./styles.scss');

interface DashboardStateProps {
  userOrders: OrderActionStatus[];
  userBalance: object;
}

interface DashboardDispatchProps {
  getUserOrdersStatus();
  getUserBalance();
}


type DashboardProps = DashboardStateProps & DashboardDispatchProps;

class Dashboard extends React.Component<DashboardProps, any> {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getUserOrdersStatus();
  }

  render() {
    return (
      <div className={styles.dashboard}>

        <div className={styles.dashboardContent}>
          <div className={styles.widgetColumn} >
            <Widget title={'My Balance'} className={styles.widget}>
              <UserBalance userBalance={this.props.userBalance} getUserBalance= {this.props.getUserBalance}></UserBalance>
            </Widget>
            <Widget title={'BTC Trend'} className={styles.widget}>
              <Graph />
            </Widget>
          </div>
          <div className={styles.widgetColumn} >

            <Widget title={'Exchange Rates'} className={styles.widget}>
              <Rates btc='300$' bch='200$' eth='100$'></Rates>
            </Widget>

            <Widget title={'Last Orders'} className={styles.widget}>
              <MyOrders userLastOrders={this.props.userOrders}> </MyOrders>
            </Widget>

            <Widget title={'test'} className={styles.widget} loading>

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
    userBalance: _.get(state, 'dashboard.userBalance')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserOrdersStatus: () => dispatch(getUserOrdersStatus()),
    getUserBalance: () => dispatch(getUserBalance())
  };
};

export default connect<DashboardStateProps, DashboardDispatchProps>(mapStateToProps, mapDispatchToProps)(Dashboard);