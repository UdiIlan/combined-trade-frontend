import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
const styles = require('./styles.scss');
import AccountsNavigator from './AccountsNavigator';
import { getAccounts, createAccount, fetchAccountTrades, editAccount } from './redux/actions';
import { Account } from 'businessLogic/model';
import { Route, Switch, Link } from 'react-router-dom';
import TradeManager from './TradeManager';
import Dialog from 'components/common/modals/Dialog';
import InputText from 'components/common/core/InputText';
import AccountDashboard from './AccountDashboard';
import Button from 'components/common/core/Button';

interface AccountManagerProps {
  accounts: Account[];
  location: any;
  getAccounts();
  getTrades(account: Account);
  createNewAccount(name: string, description: string);
  editAccount(name: string, description: string);

}

interface AccountManagerState {
  selectedAccountName?: string;
  createAccountPressed: boolean;
  editAccountPressed: boolean;
}

class AccountManager extends React.Component<AccountManagerProps, AccountManagerState> {

  constructor(props) {
    super(props);
    this.state = { createAccountPressed: false, editAccountPressed: false };
    this.createAccountPressed = this.createAccountPressed.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.editAccountPress = this.editAccountPress.bind(this);
    this.editAccount = this.editAccount.bind(this);
  }

  createAccountPressed() {
    this.setState({ createAccountPressed: true });
  }

  editAccountPress() {
    this.setState({ editAccountPressed: true });
    this.forceUpdate();
  }

  componentWillMount() {
    this.props.getAccounts();
  }

  createAccount() {
    this.props.createNewAccount(this.accountName.value, this.accountDescription.value);
    this.setState({ createAccountPressed: false });
    this.props.getAccounts();
  }

  editAccount() {
    this.props.editAccount(this.state.selectedAccountName, this.accountDescription.value);
    this.setState({ editAccountPressed: false });
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
            {this.renderHeader(pathName)}

            <Switch>
              <Route exact path='/' render={(props) => <AccountDashboard account={selectedAccount} />} />
              <Route path='/trades' render={(props) => <TradeManager account={selectedAccount} getTrades={this.props.getTrades} />} />
              <Route path='/funds' /*  component= TO-DO */ />
            </Switch>

          </div>
          :
          <div className={styles.selectAccount} />
        }

        {this.state.editAccountPressed ?
          <Dialog title={`Edit Account ${this.state.selectedAccountName}`} open={true} onOkClick={this.editAccount} onCancelClick={() => this.setState({ editAccountPressed: false })}>
            <div className={styles.accountDialogContent} >
              <InputText className={styles.userInput} ref={(input) => this.accountDescription = input} label='description' type='text' name='description' />
            </div>
          </Dialog>
          : ''
        }
      </div>

    );
  }

  renderHeader(pathName) {
    return (
      <h2>
        <Switch>
          <Route exact path='/' render={(props) =>
            <div>
              <span className={styles.title}>{this.state.selectedAccountName}</span>
              <Button className={styles.btn} intent='primary' type='contained' iconName='edit' onClick={this.editAccountPress} />
              <Button className={styles.btn} intent='primary' type='contained' iconName='delete' /*onClick={this.props.createAccountPressed}*/ />
            </div>
          } />
          <Route path='/trades' render={(props) =>
            <span className={styles.title}>{this.state.selectedAccountName} -> {pathName}</span> /*{this.state.selectedAccount.name} -> {pathName}*/
          } />
          <Route path='/funds' render={(props) => { }}/*  component= TO-DO */ />
        </Switch>

      </h2>

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
    editAccount: (name, description) => dispatch(editAccount({ name, description })),
    getTrades: (account: Account) => dispatch(fetchAccountTrades(account))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountManager);