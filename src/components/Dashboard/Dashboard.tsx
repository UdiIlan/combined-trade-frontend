import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { OrderActionStatus } from 'businessLogic/model';
import { getUserOrdersStatus } from 'components/OrderBook/redux/actions';
import UserBalance from './UserBalance';
import Rates from './Rates';
import MyOrders from './MyOrders';
import Graph from './Graph';
import Card from 'components/common/containers/Card';
import { type } from 'os';
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
        {/* <h1 className={styles.header}>Dashboard</h1> */}

        <div className={styles.dashboardContent}>
          <div className={styles.widgetColumn} >
            <Card className={styles.widget}>
              <UserBalance userBalance={{}}></UserBalance>
            </Card>

            <Card className={styles.widget}>
              <Rates btc='300$' bch='200$' eth='100$'></Rates>
            </Card>

            <Card className={styles.widget}>
              <MyOrders userLastOrders={this.props.userOrders}> </MyOrders>
            </Card>
          </div>


          <div className={styles.widgetColumn} >
            <Card className={styles.widget}>

            </Card>

            <Card className={styles.widget}>
              <Graph />
            </Card>
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