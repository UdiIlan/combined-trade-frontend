import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import { getLocalizedText } from 'lang';
import Sidebar from 'components/common/containers/Sidebar';
import { Account } from 'businessLogic/model';
import Button from 'components/common/core/Button';


interface AccountsNavigatorProps {
  className?: string;
  accounts?: Account[];
  selectAccount(account);
  createAccountPressed();
}

interface AccountsNavigatorState {
  selectedAccount?: Account;
}

export default class AccountsNavigator extends React.Component<AccountsNavigatorProps, AccountsNavigatorState> {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const { className, accounts } = this.props;

    return (
      <Sidebar
        className={cx(styles.accountsNavigator, className)}
        header={getLocalizedText('accounts', 'Accounts')}
        align='left' open collapsible>

        <div className={styles.accounts}>
          {this.renderAccounts(accounts)}

          <div className={styles.footer}>
            <Button intent='primary' className={styles.addBtn} type='floating' iconName='add' onClick={this.props.createAccountPressed} />
          </div>

        </div>
      </Sidebar>
    );
  }

  selectAccount(account) {
    this.setState({ selectedAccount: account }, () => this.props.selectAccount(account));
  }

  renderAccounts(accounts: Account[]) {
    return _.map(accounts, (account: Account) => {
      return (
        <div key={account.name} className={cx(styles.accountNavItem, { selected: account.name === _.get(this.state, 'selectedAccount.name', '') })} onClick={(e) => this.selectAccount(account)}>
          <span className={styles.name}>{account.name}</span>
        </div>
      );
    });
  }

}