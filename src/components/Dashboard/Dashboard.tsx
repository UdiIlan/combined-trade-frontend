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

        <div>
            <FormLabel>Dashboard  </FormLabel>


        </div>


        <div>

        </div>


        <div>

        </div>

      </div>
    );
  }
}