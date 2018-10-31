import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { FormLabel } from '@material-ui/core';
const styles = require('./styles.scss');

export default class Dashboard extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.dashboard}>

        <h1 className={styles.header}></h1>

        <div className={styles.row} >
          <div className={styles.widget}>
          </div>

          <div className={styles.widget}>
          </div>
        </div>


        <div className={styles.row} >
          <div className={styles.widget}>
          </div>

          <div className={styles.widget}>
          </div>
        </div>

      </div>
    );
  }
}