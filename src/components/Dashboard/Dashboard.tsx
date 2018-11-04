import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { FormLabel } from '@material-ui/core';
import UserBalance from './UserBalance';
import Rates from './Rates';
import MyTrades from './MyTrades';
import Graph from './Graph';
import Card from 'components/common/containers/Card';
import IconButton from 'components/common/core/IconButton';
const styles = require('./styles.scss');


export default class Dashboard extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.dashboard}>
        <h1 className={styles.header}>Dashboard</h1>

        <div className={styles.dashboardContent}>
          <div className={styles.widgetColumn} >
            <Card className={styles.widget}>
              <UserBalance userBalance={{}}></UserBalance>
            </Card>

            <Card className={styles.widget}>
              <Rates btc='300$' bch='200$' eth='100$'></Rates>
            </Card>
          </div>


          <div className={styles.widgetColumn} >
            <Card className={styles.widget}>
              <Graph />
            </Card>

            <Card className={styles.widget}>
              <MyTrades myTrades={[{ price: '100', amount: '2', type: 'sell' }, { price: '300', amount: '4', type: 'buy' }]}> </MyTrades>
            </Card>
          </div>
        </div>

      </div>
    );
  }
}