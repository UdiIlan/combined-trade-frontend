import * as React from 'react';
const styles = require('./styles.scss');
import AccountsNavigator from './AccountsNavigator';

export default class AccountManager extends React.Component<any, any> {

  render() {
    return (
      <div className={styles.accountManager}>
        <AccountsNavigator accounts={[{ name: 'BTC.COM' }, { name: 'Miners' }]} />
      </div>

    );
  }
}