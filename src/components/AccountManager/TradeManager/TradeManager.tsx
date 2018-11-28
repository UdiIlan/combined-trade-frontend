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
import Dialog from 'components/common/modals/Dialog';
import Button from 'components/common/core/Button/Button';


const TRADES_COLUMNS = [
  { id: 'startTime', title: 'Start Time', render: item => DateUtils.defaultFormat(item.startTime) },
  { id: 'assetPair', title: 'Asset Pair' },
  { id: 'actionType', title: 'Action Type' },
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
  selectedTradeItem?: OrderStatus;
  selectedTradeItemPressed?: boolean;
}

export default class TradeManager extends React.Component<TradeManagerProps, TradeManagerState> {

  constructor(props) {
    super(props);
    this.state = { loading: false, selectedTradeItemPressed: false };
    this.openWalletPlanePressed = this.openWalletPlanePressed.bind(this);
    this.openWalletPlane = this.openWalletPlane.bind(this);
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

        {this.state.selectedTradeItemPressed ? this.openWalletPlane(this.state.selectedTradeItem) : ''}

      </div>

    );
  }


  openWalletPlane(item) {
    return (
      <Dialog title='Wallet Plane' open={true} cancelBtnHidden={true} onOkClick={() => this.setState({selectedTradeItemPressed: false})}>
        {_.map(item.walletPlan, (wallet: DepositRequest, index) => {
          return (
            <div className={styles.wallet} >
              <InputText className={styles.addressWalletItem} label='Address' type='text' name='Address' value={wallet.walletAddress} disabled={true} />
              <InputText className={styles.sizeWalletItem} label='Size' type='text' name='Size' value={wallet.size} disabled={true} />
            </div>
          );
        })}
      </Dialog>
    );
  }

  openWalletPlanePressed(item: OrderStatus) {
    this.setState({ selectedTradeItemPressed: true});
    this.setState({ selectedTradeItem: item });
  }

  renderOrderChildren(item: OrderStatus) {
    return (
      <div className={styles.orderNestedContainer}>
        <InputText className={styles.InputText} outlined disabled value={item.executionSize} label={'Executed so far'} />
        <InputText outlined disabled value={item.elapsedTimeMinutes} label={'Elapsed Time (in minutes)'} />
        <InputText outlined disabled value={item.executedTargetSize} label={'Target asset executed so far'} />
        <InputText outlined disabled value={item.tradeOrderId} label={'Order Id'} />
        {item.executionMessage && <InputText outlined disabled value={item.executionMessage} label={'Execution Message'} />}
        <Button className={styles.btn} intent='primary' type='contained' onClick={(e) => this.openWalletPlanePressed(item)}> wallet Plane</Button>
      </div>
    );
  }
}