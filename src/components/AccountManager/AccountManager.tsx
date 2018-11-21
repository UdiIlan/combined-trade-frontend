import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
const styles = require('./styles.scss');
import AccountsNavigator from './AccountsNavigator';
import { getAccounts } from './redux/actions';
import { Account } from 'businessLogic/model';
import { Route, Switch, Link } from 'react-router-dom';
import TradeManager from './TradeManager';

interface AccountManagerProps {
  accounts: Account[];
  getAccounts();
}

interface AccountManagerState {
  selectedAccount?: Account;
}


class AccountManager extends React.Component<AccountManagerProps, AccountManagerState> {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.getAccounts();
  }

  render() {
    return (
      <div className={styles.accountManager}>
        <AccountsNavigator selectAccount={(account) => this.setState({ selectedAccount: account })} accounts={this.props.accounts} />

        <div className={styles.accountContent}>
          <Switch>
            <Route exact path='/' /* component= TO-DO (Shirley) */ />
            <Route path='/trades' render={(props) => <TradeManager account={this.state.selectedAccount} />} />
            <Route path='/funds' /*  component= TO-DO */ />
          </Switch>
        </div>

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