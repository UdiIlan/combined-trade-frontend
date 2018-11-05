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
const styles = require('./styles.scss');

interface DashboardStateProps {
  userOrders: OrderActionStatus[];
  userBalance: object;
}

interface DashboardDispatchProps {
  getUserOrdersStatus();
  getUserBalance();
  setUserBalance();
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
              <UserBalance userBalance={this.props.userBalance} getUserBalance= {this.props.getUserBalance}></UserBalance>
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
    userOrders: _.get(state, 'orderBook.userOrders'),
    userBalance: _.get(state, 'dashboard.userBalance')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserOrdersStatus: () => dispatch(getUserOrdersStatus()),
    getUserBalance: () => dispatch(getUserBalance()),
    setUserBalance: () => dispatch(setUserBalance(this.userBalance))
  };
};

export default connect<DashboardStateProps, DashboardDispatchProps>(mapStateToProps, mapDispatchToProps)(Dashboard);