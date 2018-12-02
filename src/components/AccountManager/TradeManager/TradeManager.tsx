import * as React from 'react';
import * as _ from 'lodash';
import Card from 'components/common/containers/Card';
import Grid from 'components/common/dataLayouts/Grid';
const styles = require('./styles.scss');
import * as classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import { Account, OrderStatus, DepositRequest, TradeRequest } from 'businessLogic/model';
import { DateUtils, MathUtils } from 'businessLogic/utils';
import { getLocalizedText } from 'lang';
import { InputText } from 'components/common/core';
import Dialog from 'components/common/modals/Dialog';
import Button from 'components/common/core/Button/Button';
import Select from 'components/common/core/Select/Select';


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
  newTradeWallet?: object[];
  getTrades(account: Account);
  submitTrades?(order: any);
  createNewTrade(account: Account, trade: TradeRequest);
  resetNewTrade(accountName: string);
}

export type AssetPairType = 'BTC-USD' | 'BCH-USD' | 'ETH-USD';
export type TradingType = 'buy' | 'sell';

interface TradeManagerState {
  loading: boolean;
  selectedTradeItem?: OrderStatus;
  newTradePressed?: boolean;
  assetPairOption?: AssetPairType;
  tradingOption?: TradingType;
}

export default class TradeManager extends React.Component<TradeManagerProps, TradeManagerState> {

  constructor(props) {
    super(props);
    this.state = { loading: false, assetPairOption: 'BTC-USD' };
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

  createNewTradePressed() {
    this.setState({ newTradePressed: true });
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

        {this.state.selectedTradeItem ? this.openWalletPlane(this.state.selectedTradeItem.walletPlan) : ''}

        {this.state.newTradePressed ? this.openNewTradeDialog() : ''}

        {this.props.newTradeWallet ? this.openWalletPlane(this.props.newTradeWallet) : ''}

      </div>

    );
  }

  walletPlaneDialogOk() {
    this.setState({ selectedTradeItem: undefined }, () => this.props.resetNewTrade(this.props.account.name));
  }

  openWalletPlane(walletPlane) {
    return (
      <Dialog title='New trade was successfully added!' open={true} cancelBtnHidden={true} onOkClick={() => { this.walletPlaneDialogOk(); }}>
      <span className={styles.walletPlanTitle}> Wallet Plan: </span>
        {_.map(walletPlane, (wallet: DepositRequest, index) => {
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

  private tradeSize;
  private tradePrice;
  private tradeAssetPair;
  private tradeAction;
  private durationMinutes;

  createTradeObject() {
    return ({
      assetPair: this.tradeAssetPair,
      actionType: this.tradeAction,
      size: this.tradeSize,
      price: this.tradePrice,
      durationMinutes: this.durationMinutes
    });
  }

  createTrade() {
    this.setState({ newTradePressed: false });
    this.props.createNewTrade(this.props.account, this.createTradeObject());
  }


  openNewTradeDialog() {
    return (
      <Dialog title='Wallet Plan' open={true} onCancelClick={() => { }} onOkClick={() => { this.createTrade(); }}>
        <div className={styles.newTrade} >
          <InputText className={styles.newTradeProp} ref={(input) => this.tradeSize = input} label='Size' type='text' name='Size' />
          <InputText className={styles.newTradeProp} ref={(input) => this.tradePrice = input} label='Price' type='text' name='Price' />
          <InputText className={styles.newTradeProp} ref={(input) => this.durationMinutes = input} label='Duration (minutes)' type='text' name='Duration' />
          <Select theme='dark' selectedValue={this.state.assetPairOption} formLabelText='Asset Pair' className={styles.tradingOption} onChange={selection => this.tradeAssetPair = selection}>
            <option value=''></option>
            <option value='BTC'>BTC-USD</option>
            <option value='BCH'>BCH-USD</option>
            <option value='ETH'>ETH-USD</option>
          </Select>
          <Select theme='dark' selectedValue={this.state.tradingOption} formLabelText='Action' className={styles.tradingOption} onChange={selection => this.tradeAction = selection}>
            <option value=''></option>
            <option value='BTC'>sell</option>
            <option value='BCH'>buy</option>
          </Select>
        </div>
      </Dialog>
    );
  }

  openWalletPlanePressed(item: OrderStatus) {
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
        <Button className={styles.btn} intent='primary' type='contained' tooltip='Wallet Plane' onClick={(e) => this.openWalletPlanePressed(item)} iconName='account_balance_wallet'> </Button>
      </div>
    );
  }
}