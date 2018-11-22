import * as React from 'react';
import Card from 'components/common/containers/Card';
import Grid from 'components/common/dataLayouts/Grid';
const styles = require('./styles.scss');
import * as classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import { Account } from 'businessLogic/model';


interface TradeManagerProps {
  account: Account;
  getTrades(account: Account);
  submitTrades?(order: any);
}

interface TradeManagerState {
  loading: boolean;
}

export default class TradeManager extends React.Component<TradeManagerProps, TradeManagerState> {

  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentWillMount() {
    this.updateTradeInfo(this.props);
  }

  componentWillReceiveProps(newProps: TradeManagerProps) {
    if (newProps.account.name !== this.props.account.name) {
      this.updateTradeInfo(newProps);
      return;
    }

    if (this.state.loading) {
      this.setState({ loading: false });
    }
  }

  private updateTradeInfo(props: TradeManagerProps) {
    this.setState({ loading: true }, () => props.getTrades(props.account));
  }

  render() {
    const { account } = this.props;

    const columns = [];
    return (
      <div className={styles.tradeManager}>

        {!account ? 'No Data' :
          <Card className={cx(styles.tradesData, { blurring: this.state.loading })}>

            {this.state.loading ? 'Loading'
              :
              <Grid
                sortBy='orderTime'
                sortDirection='desc'
                className={styles.grid}
                data={this.props.account.trades}
                columns={columns}
              />
            }

          </Card>
        }

      </div>

    );
  }
}