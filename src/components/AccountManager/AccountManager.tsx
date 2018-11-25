import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
const styles = require('./styles.scss');
import AccountsNavigator from './AccountsNavigator';
import { getAccounts, createAccount, fetchAccountTrades } from './redux/actions';
import { Account } from 'businessLogic/model';
import { Route, Switch, Link } from 'react-router-dom';
import TradeManager from './TradeManager';
import Dialog from 'components/common/modals/Dialog';
import InputText from 'components/common/core/InputText';
import AccountDashboard from './AccountDashboard';

interface AccountManagerProps {
  accounts: Account[];
  location: any;
  getAccounts();
  getTrades(account: Account);
  createNewAccount(name: string, description: string);
}

interface AccountManagerState {
  selectedAccountName?: string;
  createAccountPressed: boolean;
}

class AccountManager extends React.Component<AccountManagerProps, AccountManagerState> {

  constructor(props) {
    super(props);
    this.state = { createAccountPressed: false };
    this.createAccountPressed = this.createAccountPressed.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  createAccountPressed() {
    this.setState({ createAccountPressed: true });
  }

  componentWillMount() {
    this.props.getAccounts();
  }

  createAccount() {
    this.props.createNewAccount(this.accountName.value, this.accountDescription.value);
    this.setState({ createAccountPressed: false });
    this.props.getAccounts();
  }

  private accountName;
  private accountDescription;


  render() {
    const pathName = this.props.location.pathname.substr(1);
    const selectedAccount = _.find(this.props.accounts, { name: this.state.selectedAccountName });
    return (
      <div className={styles.accountManager}>
        <AccountsNavigator
          selectAccount={(account) => this.setState({ selectedAccountName: account.name })}
          accounts={this.props.accounts}
          selectedAccount={selectedAccount}
          createAccountPressed={this.createAccountPressed} />

        {this.state.createAccountPressed ?

          <Dialog title='Create New Account' open={true} onOkClick={this.createAccount} onCancelClick={() => this.setState({ createAccountPressed: false })}>
            <div className={styles.accountDialogContent} >
              <InputText className={styles.userInput} ref={(input) => this.accountName = input} label='account name' type='text' name='name' />
              <InputText className={styles.userInput} ref={(input) => this.accountDescription = input} label='description' type='text' name='description' />
            </div>
          </Dialog>
          : ''
        }
        {this.state.selectedAccountName ?

          <div className={styles.accountContent}>
            <h2 className={styles.title}>{pathName ? `${this.state.selectedAccountName} -> ${pathName}` : this.state.selectedAccountName}</h2>

            <Switch>
              <Route exact path='/' render={(props) => <AccountDashboard account={selectedAccount} />} />
              <Route path='/trades' render={(props) => <TradeManager account={selectedAccount} getTrades={this.props.getTrades} />} />
              <Route path='/funds' /*  component= TO-DO */ />
            </Switch>
          </div>
          :
          <div className={styles.selectAccount} />
        }

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
    getAccounts: () => dispatch(getAccounts()),
    createNewAccount: (name, description) => dispatch(createAccount({ name, description })),
    getTrades: (account: Account) => dispatch(fetchAccountTrades(account))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountManager);