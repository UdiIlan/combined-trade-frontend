import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { FormLabel } from '@material-ui/core';
import Balance from './Balance';
import Rates from './Rates';
import MyTrades from './MyTrades';
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
          <div className={styles.row} >
            <div className={styles.widget}>
            <Balance usd='300' btc='2'></Balance>
            </div>

            <div className={styles.widget}>
            <Rates btc='300$' bch='200$' eth='100$'></Rates>
            </div>
          </div>


          <div className={styles.row} >
            <div className={styles.widget}>
            Graph
            </div>

            <div className={styles.widget}>
            <MyTrades myTrades={[{price : '100', amount : '2', type : 'sell'}, {price : '300', amount : '4', type : 'buy'}]}> </MyTrades>
            </div>
          </div>
        </div>

      </div>
    );
  }
}