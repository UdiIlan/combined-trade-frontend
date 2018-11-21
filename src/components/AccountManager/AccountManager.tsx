import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
const styles = require('./styles.scss');
import AccountsNavigator from './AccountsNavigator';
import { getAccounts } from './redux/actions';
import { Account } from '../../businessLogic/model';

export interface AccountManagerProps {
  accounts: Account[];
  getAccounts();
}

class AccountManager extends React.Component<AccountManagerProps, any> {

  render() {
    return (
      <div className={styles.accountManager}>
        <AccountsNavigator accounts={[{ name: 'BTC.COM' }, { name: 'Miners' }]} />
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: _.get(state, 'account.accounts'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAccounts: () => dispatch(getAccounts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountManager);