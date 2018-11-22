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

interface AccountManagerProps {
  accounts: Account[];
  location: any;
  getAccounts();
  getTrades(account: Account);
  createNewAccount(name: string, description: string);
}

interface AccountManagerState {
  selectedAccount?: Account;
  createAccountPressed: boolean;
}


class AccountManager extends React.Component<AccountManagerProps, AccountManagerState> {

  constructor(props) {
    super(props);
    this.state = { createAccountPressed: false };
    this.createAccountPressed = this.createAccountPressed.bind(this);
  }

  createAccountPressed() {
    this.setState({ createAccountPressed: true });
  }

  componentWillMount() {
    this.props.getAccounts();
  }

  private accountName;
  private accountDescription;

  render() {
    const pathName = this.props.location.pathname.substr(1);
    return (
      <div className={styles.accountManager}>
        <AccountsNavigator selectAccount={(account) => this.setState({ selectedAccount: account })} accounts={this.props.accounts} createAccountPressed={this.createAccountPressed} />
        {this.state.createAccountPressed ?
          <div className={styles.dialogContainer}>
            <Dialog title='Create New Account' open={true} onOkClick={() => this.props.createNewAccount(this.accountName.value, this.accountDescription.value)}>
              <div className={styles.accountDialogContent} >
                <InputText className={styles.userInput} ref={(input) => this.accountName = input} label='account name' type='text' name='name' />
                <InputText className={styles.userInput} ref={(input) => this.accountDescription = input} label='description' type='text' name='description' />
              </div>
            </Dialog>
          </div> : ''
        }
        {this.state.selectedAccount ?
          <div className={styles.accountContent}>
            <h2 className={styles.title}>{pathName ? `${this.state.selectedAccount.name} -> ${pathName}` : this.state.selectedAccount.name}</h2>

            <Switch>
              <Route exact path='/' /* component= TO-DO (Shirley) */ />
              <Route path='/trades' render={(props) => <TradeManager account={this.state.selectedAccount} getTrades={this.props.getTrades} />} />
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