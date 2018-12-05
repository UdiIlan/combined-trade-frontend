import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';
import Card from 'components/common/containers/Card';
import Grid from 'components/common/dataLayouts/Grid';
const styles = require('./styles.scss');
import * as classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import { Account, OrderStatus, DepositRequest, TradeRequest } from 'businessLogic/model';
import { DateUtils, MathUtils } from 'businessLogic/utils';
import { InputText } from 'components/common/core';
import { default as Dialog, DialogProps } from 'components/common/modals/Dialog';
import Button from 'components/common/core/Button/Button';
import Select from 'components/common/core/Select/Select';


export const TRADES_COLUMNS = [
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
  assetPairOption?: AssetPairType;
  tradingOption?: TradingType;
  openDialog?: DialogProps;
}

export default class TradeManager extends React.Component<TradeManagerProps, TradeManagerState> {

  constructor(props) {
    super(props);
    this.state = { loading: false, assetPairOption: 'BTC-USD' };
    this.openWalletPlan = this.openWalletPlan.bind(this);
    this.createTradeObject = this.createTradeObject.bind(this);
    this.createTradeConfirmed = this.createTradeConfirmed.bind(this);
    this.renderNewTradeDialogBody = this.renderNewTradeDialogBody.bind(this);
    this.createNewTradePressed = this.createNewTradePressed.bind(this);
    this.createTradeOk = this.createTradeOk.bind(this);
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(newProps: TradeManagerProps) {
    if (this.state.loading) {
      this.setState({ loading: false });
    }
    if (newProps.newTradeWallet) {
      this.openWalletPlan(newProps.newTradeWallet, 'New trade request was successfully submitted!');
    }
  }


  renderNewTradeDialogBody() {
    return (
      <div className={styles.newTrade} >

        <InputText className={styles.newTradeProp} onChange={(e) => this.tradeSize = e.target.value} label='Size' type='number' name='Size' />
        <InputText className={styles.newTradeProp} onChange={(e) => this.tradePrice = e.target.value} label='Price' type='number' name='Price' />
        <InputText className={styles.newTradeProp} onChange={(e) => this.durationMinutes = e.target.value} label='Duration (minutes)' type='number' name='Duration' />
        <Select theme='dark' formControl formLabelText='Asset Pair' className={styles.tradingOption} onChange={selection => this.tradeAssetPair = selection}>
          <option value=''></option>
          <option value='BTC'>BTC-USD</option>
          <option value='BCH'>BCH-USD</option>
          <option value='ETH'>ETH-USD</option>
        </Select>
        <Select theme='dark' formControl formLabelText='Action' className={styles.tradingOption} onChange={selection => this.tradeAction = selection}>
          <option value=''></option>
          <option value='sell'>sell</option>
          <option value='buy'>buy</option>
        </Select>
      </div>
    );
  }

  renderWalletPlanBody(walletPlan) {
    return (
      <div>
        <span className={styles.walletPlanTitle}> Wallet Plan: </span>
        {
          _.map(walletPlan, (wallet: DepositRequest, index) => {
            return (
              <div className={styles.wallet} >
                <InputText className={styles.addressWalletItem} label='Address' type='text' name='Address' value={wallet.walletAddress} disabled={true} />
                <InputText className={styles.sizeWalletItem} label='Size' type='text' name='Size' value={wallet.size} disabled={true} />
              </div>
            );
          })
        }
      </div>
    );
  }


  createNewTradePressed() {
    const dialog = {
      title: 'New Trade',
      onCancelClick: () => this.setState({ openDialog: undefined }),
      onOkClick: () => this.createTradeOk(),
      children: this.renderNewTradeDialogBody(),
    } as DialogProps;

    this.setState({ openDialog: dialog });
  }

  openWalletPlan(walletPlan: object[], title) {
    const dialog = {
      title: title,
      fullWidth: true,
      cancelBtnHidden: true,
      onOkClick: () => this.walletPlanDialogOk(),
      children: this.renderWalletPlanBody(walletPlan),
    } as DialogProps;

    this.setState({ openDialog: dialog });
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

        {!!this.state.openDialog && <Dialog open={true} {...this.state.openDialog} />}

      </div>

    );
  }

  walletPlanDialogOk() {
    this.setState({ openDialog: undefined }, () => this.props.resetNewTrade(this.props.account.name));
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

  createTradeOk() {
    let cb = () => {
      this.setState({ openDialog: undefined });
      this.createTradeConfirmed();
    };
    cb = cb.bind(this);

    const confirmDialog = {
      title: 'Are you sure you want to submit trade request?',
      onOkClick: cb,
      onCancelClick: () => this.setState({ openDialog: undefined }),
      okBtnText: 'Yes, Confirm',
      cancelBtnText: 'No, Ignore'
    } as DialogProps;

    this.setState({ openDialog: confirmDialog });
  }

  createTradeConfirmed() {
    this.props.createNewTrade(this.props.account, this.createTradeObject());
  }



  renderOrderChildren(item: OrderStatus) {
    return (
      <div className={styles.orderNestedContainer}>
        <InputText className={styles.InputText} outlined disabled value={item.executionSize} label={'Executed so far'} />
        <InputText outlined disabled value={item.elapsedTimeMinutes} label={'Elapsed Time (in minutes)'} />
        <InputText outlined disabled value={item.executedTargetSize} label={'Target asset executed so far'} />
        <InputText outlined disabled value={item.tradeOrderId} label={'Order Id'} />
        {item.executionMessage && <InputText outlined disabled value={item.executionMessage} label={'Execution Message'} />}
        <Button className={styles.btn} intent='primary' type='contained' tooltip='Wallet Plan' onClick={(e) => this.openWalletPlan(item.walletPlan, 'Wallet Plan')} iconName='account_balance_wallet'> </Button>
      </div>
    );
  }
}