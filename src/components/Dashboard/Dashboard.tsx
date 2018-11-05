import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { OrderActionStatus } from 'businessLogic/model';
import { getUserOrdersStatus } from 'components/OrderBook/redux/actions';
import UserBalance from './UserBalance';
import Rates from './Rates';
import MyOrders from './MyOrders';
import Graph from './Graph';
import Widget from 'components/common/containers/Widget';
const styles = require('./styles.scss');

interface DashboardStateProps {
  userOrders: OrderActionStatus[];
}

interface DashboardDispatchProps {
  getUserOrdersStatus();
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
              <UserBalance userBalance={{}}></UserBalance>
            </Widget>

            <Widget title={'Exchange Rates'} className={styles.widget}>
              <Rates btc='300$' bch='200$' eth='100$'></Rates>
            </Widget>

            <Widget title={'Last Orders'} className={styles.widget}>
              <MyOrders userLastOrders={this.props.userOrders}> </MyOrders>
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
    userOrders: _.get(state, 'orderBook.userOrders')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserOrdersStatus: () => dispatch(getUserOrdersStatus(10))
  };
};

export default connect<DashboardStateProps, DashboardDispatchProps>(mapStateToProps, mapDispatchToProps)(Dashboard);