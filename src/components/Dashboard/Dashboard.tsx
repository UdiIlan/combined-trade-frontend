import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { FormLabel } from '@material-ui/core';
import Balance from './Balance';
import Rates from './Rates';
import MyTrades from './MyTrades';
import Graph from './Graph';
import Card from '../common/containers/Card';
import Button from '../common/core/Button';
import IconButton from '../common/core/IconButton';
const styles = require('./styles.scss');


interface DashboardProps {
  userLogout();
}

export default class Dashboard extends React.Component<DashboardProps, any> {

  constructor(props) {
    super(props);
    this.doLogout = this.doLogout.bind(this);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.dashboard}>
        <h1 className={styles.header}>Dashboard</h1>

        <div className={styles.dashboardContent}>
          <div className={styles.widgetColumn} >
            <Card className={styles.widget}>
              <Balance usd='300' btc='2'></Balance>
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
        <IconButton className={styles.button} onClick={() => this.doLogout()}>Logout</IconButton>

      </div>
    );
  }

  doLogout() {
    this.props.userLogout();
}
}