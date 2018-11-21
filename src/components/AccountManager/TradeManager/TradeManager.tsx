import * as React from 'react';
import Card from 'components/common/containers/Card';
import Grid from 'components/common/dataLayouts/Grid';
const styles = require('./styles.scss');
import * as classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import { Account } from 'businessLogic/model';


interface TradeManagerProps {
  account: Account;
}

interface TradeManagerState {
  loading: boolean;
}

export default class TradeManager extends React.Component<TradeManagerProps, TradeManagerState> {

  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  render() {
    const { account } = this.props;

    const columns = [];
    return (
      <div className={styles.tradeManager}>

        {!account ? 'No Data' :
          <Card className={cx(styles.tradesData, { blurring: this.state.loading })}>

            <h2>{account.name}</h2>

            <Grid
              sortBy='orderTime'
              sortDirection='desc'
              className={styles.grid}
              data={this.props.account.trades}
              columns={columns}
            />

          </Card>
        }

      </div>

    );
  }
}