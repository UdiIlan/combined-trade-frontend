import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
const styles = require('./styles.scss');
import AccountsNavigator from './AccountsNavigator';
import { getAccounts, createAccount, fetchAccountTrades, fetchAccountWithdrawals, editAccount, deleteAccount, fetchAccountBalance, createTrade, resetNewTrade, createWithdrawal, resetNewWithdrawal } from './redux/actions';
import { Account, TradeRequest, WithdrawalRequest } from 'businessLogic/model';
import { Route, Switch, Link } from 'react-router-dom';
import TradeManager from './TradeManager';
import FundsManager from './FundsManager';
import Dialog from 'components/common/modals/Dialog';
import InputText from 'components/common/core/InputText';
import AccountDashboard from './AccountDashboard';
import Button from 'components/common/core/Button';

interface AccountManagerProps {
  accounts: Account[];
  newTradeWallet: object[];
  newWithdrawalId: string;
  location: any;
  getAccounts();
  getTrades(account: Account);
  getFunds(account: Account);
  getBalance(account: Account);
  createNewAccount(name: string, description: string);
  editAccount(name: string, description: string);
  deleteAccount(name: string);
  createTrade(account: Account, trade: TradeRequest);
  resetNewTrade(accountName: string);
  createWithdrawal(account: Account, withdrawal: WithdrawalRequest);
  resetNewWithdrawal(accountName: string);
}

interface AccountManagerState {
  selectedAccountName?: string;
  createAccountPressed: boolean;
  editAccountPressed: boolean;
  deleteAccountPressed: boolean;
}

class AccountManager extends React.Component<AccountManagerProps, AccountManagerState> {

  constructor(props) {
    super(props);
    this.state = { createAccountPressed: false, editAccountPressed: false, deleteAccountPressed: false };
    this.createAccountPressed = this.createAccountPressed.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.editAccountPressed = this.editAccountPressed.bind(this);
    this.editAccount = this.editAccount.bind(this);
    this.deleteAccountPressed = this.deleteAccountPressed.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.createTrade = this.createTrade.bind(this);
    this.createWithdrawal = this.createWithdrawal.bind(this);
  }

  createAccountPressed() {
    this.setState({ createAccountPressed: true });
  }

  editAccountPressed() {
    this.setState({ editAccountPressed: true });
  }

  deleteAccountPressed() {
    this.setState({ deleteAccountPressed: true });
  }

  componentWillMount() {
    this.props.getAccounts();
  }

  componentDidMount() {
    this.props.accounts.length > 0 ? this.changeAccount(this.props.accounts[0]) : '';
  }

  createAccount() {
    const name = this.accountName.value;
    const description = this.accountDescription.value;

    this.setState({ createAccountPressed: false }, () => {
      this.props.createNewAccount(name, description);
    });

    this.setState({ selectedAccountName: name });
  }

  editAccount() {
    const name = this.state.selectedAccountName;
    const description = this.accountDescription.value;

    this.setState({ editAccountPressed: false }, () => {
      this.props.editAccount(name, description);
    });
  }

  deleteAccount() {
    const name = this.state.selectedAccountName;
    this.setState({ deleteAccountPressed: false, selectedAccountName: null }, () => {
      this.props.deleteAccount(name);
    });
  }

  createTrade(account: Account, trade: TradeRequest) {
    this.props.createTrade(account, trade);
  }

  createWithdrawal(account: Account, withdrawal: WithdrawalRequest) {
    this.props.createWithdrawal(account, withdrawal);
  }

  changeAccount(account: Account) {
    this.setState({ selectedAccountName: account.name }, () => {
      this.props.getTrades(account);
      this.props.getBalance(account);
      this.props.getFunds(account);
    });
  }

  private accountName;
  private accountDescription;
  private tradeManager: TradeManager;
  private fundsManager: FundsManager;


  render() {
    const pathName = this.props.location.pathname.substr(1);
    const selectedAccount = _.find(this.props.accounts, { name: this.state.selectedAccountName }) ? _.find(this.props.accounts, { name: this.state.selectedAccountName }) : this.props.accounts[0];
    return (
      <div className={styles.accountManager}>
        <AccountsNavigator
          selectAccount={(account) => this.changeAccount(account)}
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
        {selectedAccount ?

          <div className={styles.accountContent}>
            {this.renderHeader(pathName, selectedAccount.name)}
            <div className={styles.curRoute}>
              <Switch >
                <Route exact path='/' render={(props) => <AccountDashboard account={selectedAccount} selectAccount={(account) => this.changeAccount(account)} />} />
                <Route path='/trades' render={(props) => <TradeManager ref={(tradeManager) => this.tradeManager = tradeManager}
                  account={selectedAccount} getTrades={this.props.getTrades}
                  createNewTrade={this.props.createTrade}
                  resetNewTrade={this.props.resetNewTrade}
                  newTradeWallet={this.props.newTradeWallet} />} />
                <Route path='/funds' render={(props) => <FundsManager ref={(fundsManager) => this.fundsManager = fundsManager}
                  account={selectedAccount} getFunds={this.props.getFunds}
                  createNewWithdrawal={this.props.createWithdrawal}
                  resetNewWithdrawal={this.props.resetNewWithdrawal}
                  newWithdrawalId={this.props.newWithdrawalId} />} />
              </Switch>
            </div>

          </div>
          :
          <div className={styles.selectAccount} />
        }

        {this.state.editAccountPressed ?
          <Dialog title={`Edit Account ${this.state.selectedAccountName}`} open={true} onOkClick={this.editAccount} onCancelClick={() => this.setState({ editAccountPressed: false })}>
            <div className={styles.accountDialogContent} >
              <InputText className={styles.userInput} ref={(input) => this.accountDescription = input} label='description' type='text' name='description' value={selectedAccount ? selectedAccount.description : ''} />
            </div>
          </Dialog>
          : ''
        }

        {this.state.deleteAccountPressed ?
          <Dialog title={`Delete Account ${this.state.selectedAccountName}?`} open={true} onOkClick={this.deleteAccount} onCancelClick={() => this.setState({ deleteAccountPressed: false })}>
          </Dialog>
          : ''
        }
      </div>

    );
  }

  renderHeader(pathName, selectedAccountName) {
    return (
      <div>
        <h2 className={styles.headerContainer}>
          <Switch>
            <Route exact path='/' render={(props) =>
              [
                <span key='title' className={styles.title}>{selectedAccountName}</span>,
                <div key='actions'>
                  <Button className={styles.btn} intent='primary' type='contained' iconName='edit' onClick={this.editAccountPressed} />
                  <Button className={styles.btn} intent='primary' type='contained' iconName='delete' onClick={this.deleteAccountPressed} />
                </div>
              ]

            } />
            <Route path='/trades' render={(props) =>
              [
                <span key='title' className={styles.title}>{selectedAccountName} -> {pathName}</span>,
                <div key='actions'>
                  <Button className={styles.btn} intent='primary' type='contained' iconName='add' onClick={e => this.tradeManager.createNewTradePressed()} />
                  <Button className={styles.btn} intent='primary' type='contained' iconName='refresh' onClick={e => this.tradeManager.load()} />
                  <Button className={styles.btn} intent='primary' type='contained' iconName='arrow_back' linkTo='/' />
                </div>
              ]

            } />
            <Route path='/funds' render={(props) =>
              [<span key='title' className={styles.title}>{selectedAccountName} -> {pathName}</span>,
              <div key='actions'>
                <Button className={styles.btn} intent='primary' type='contained' iconName='add' onClick={e => this.fundsManager.createNewWithdrawalPressed()} />
                <Button className={styles.btn} intent='primary' type='contained' iconName='refresh' onClick={e => this.fundsManager.load()} />
                <Button className={styles.btn} intent='primary' type='contained' iconName='arrow_back' linkTo='/' />
              </div>
              ]
            } />
          </Switch>

        </h2>
      </div>
    );
  }


}

const mapStateToProps = (state) => {
  return {
    accounts: _.get(state, 'account.accounts'),
    newTradeWallet: _.get(state, 'account.newTradeWallet'),
    newWithdrawalId: _.get(state, 'account.newWithdrawalId'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAccounts: () => dispatch(getAccounts()),
    createNewAccount: (name, description) => dispatch(createAccount({ name, description })),
    editAccount: (name, description) => dispatch(editAccount({ name, description })),
    deleteAccount: (name) => dispatch(deleteAccount(name)),
    getTrades: (account: Account) => dispatch(fetchAccountTrades(account)),
    getFunds: (account: Account) => dispatch(fetchAccountWithdrawals(account)),
    createTrade: (account: Account, trade: TradeRequest) => dispatch(createTrade(account, trade)),
    resetNewTrade: (accountName: string) => dispatch(resetNewTrade()),
    createWithdrawal: (account: Account, withdrawal: WithdrawalRequest) => dispatch(createWithdrawal(account, withdrawal)),
    resetNewWithdrawal: (accountName: string) => dispatch(resetNewWithdrawal()),
    getBalance: (account: Account) => dispatch(fetchAccountBalance(account))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountManager);