import * as React from 'react';
import * as _ from 'lodash';
import Card from 'components/common/containers/Card';
import Grid from 'components/common/dataLayouts/Grid';
const styles = require('./styles.scss');
import * as classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import { Account, OrderStatus, DepositRequest } from 'businessLogic/model';
import { DateUtils, MathUtils } from 'businessLogic/utils';
import { getLocalizedText } from 'lang';
import { InputText } from 'components/common/core';


const TRADES_COLUMNS = [
  { id: 'startTime', title: 'Start Time', render: item => DateUtils.defaultFormat(item.startTime) },
  { id: 'assetPair', title: 'Asset Pair' },
  { id: 'actionType', title: 'Action Type', render: item => getLocalizedText(item.actionType) },
  { id: 'status', title: 'Status' },
  { id: 'requestedSize', title: 'Requested Size', render: item => parseFloat(item.requestedSize).toFixed(4) },
  { id: 'requestedPrice', title: 'Requested Price', render: item => MathUtils.toFixed(item.requestedPrice) },
];

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
    this.load(this.props);
  }

  componentWillReceiveProps(newProps: TradeManagerProps) {
    // if (newProps.account.name !== this.props.account.name) {
    //   this.updateTradeInfo(newProps);
    //   return;
    // }

    if (this.state.loading) {
      this.setState({ loading: false });
    }
  }

  createNewTrade() {

  }

  load(props = this.props) {
    this.setState({ loading: true }, () => props.getTrades(props.account));
  }

  render() {
    const { account } = this.props;

    return (
      <div className={styles.tradeManager}>

        {!account ? 'No Data' :
          <Card className={cx(styles.tradesData, { blurring: this.state.loading })}>

            {this.state.loading ? 'Loading'
              :
              <Grid
                sortBy='startTime'
                sortDirection='desc'
                className={styles.grid}
                data={this.props.account.trades}
                columns={TRADES_COLUMNS}
                forceNestedRendering
                renderNestedItems={(item) => this.renderOrderChildren(item)}
              />
            }

          </Card>
        }

      </div>

    );
  }


  renderOrderChildren(item: OrderStatus) {
    return (
      <div className={styles.orderNestedContainer}>
        <InputText outlined disabled value={item.executionSize} label={'Executed so far'} />
        <InputText outlined disabled value={item.elapsedTimeMinutes} label={'Elapsed Time (in minutes)'} />
        <InputText outlined disabled value={item.actionType} label={'Action Type'} />
        <InputText outlined disabled value={item.executedTargetSize} label={'Target asset executed so far'} />
        <InputText outlined disabled value={item.tradeOrderId} label={'Order Id'} />
        {item.executionMessage && <InputText outlined disabled value={item.executionMessage} label={'Execution Message'} />}

        <div className={styles.walletPlan}>
          <span className={styles.title}>Wallet Plane:</span>
          {_.map(item.walletPlan, (wallet: DepositRequest, index) => {
            return (
              <div className={styles.wallet} key={index}>
                <span className={styles.address}>Address: {wallet.walletAddress}</span>
                <span className={styles.size}>Size: {wallet.size}</span>
              </div>
            );
          })}
        </div>

      </div>
    );
  }
}