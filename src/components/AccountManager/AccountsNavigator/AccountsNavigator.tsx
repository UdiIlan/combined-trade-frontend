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
}

export default class AccountsNavigator extends React.Component<AccountsNavigatorProps, any> {


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
            <Button intent='primary' className={styles.addBtn} type='floating' iconName='add' />
          </div>

        </div>
      </Sidebar>

    );
  }

  renderAccounts(accounts: Account[]) {
    return _.map(accounts, (account: Account) => {
      return (
        <div key={account.name} className={styles.accountNavItem}>
          <span className={styles.name}>{account.name}</span>
        </div>
      );
    });
  }

}