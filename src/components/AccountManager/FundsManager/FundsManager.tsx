import * as React from 'react';
import * as _ from 'lodash';
import Card from 'components/common/containers/Card';
import Grid from 'components/common/dataLayouts/Grid';
const styles = require('./styles.scss');
import * as classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import { Account, WithdrawalStatus, WithdrawalRequest } from 'businessLogic/model';
import { DateUtils } from 'businessLogic/utils';
import { InputText } from 'components/common/core';
import Dialog from 'components/common/modals/Dialog';
import Button from 'components/common/core/Button/Button';
import Select from 'components/common/core/Select/Select';


export const FUNDS_COLUMNS = [
    { id: 'requestTime', title: 'Request Time', render: item => DateUtils.defaultFormat(item.requestTime) },
    { id: 'transactionId', title: 'Transaction ID', },
    { id: 'amount', title: 'Amount' },
    { id: 'status', title: 'Status' },
    { id: 'assetType', title: 'Asset Type' },
];


interface FundsManagerProps {
    account: Account;
    // newTradeWallet?: object[];
    getFunds(account: Account);
    // submitTrades?(order: any);
    createNewWithdrawal(account: Account, Withdrawal: WithdrawalRequest);
    resetNewWithdrawal(accountName: string);
}


interface FundsManagerState {
    loading: boolean;
    // selectedWithdrawalItem?: WithdrawalStatus;
    newWithdrawalPressed?: boolean;
    // assetPairOption?: AssetPairType;
    // tradingOption?: TradingType;
}

export default class FundsManager extends React.Component<FundsManagerProps, FundsManagerState> {

    constructor(props) {
        super(props);
        this.state = { loading: false };
        // this.openWalletPlanePressed = this.openWalletPlanePressed.bind(this);
        // this.openWalletPlane = this.openWalletPlane.bind(this);
    }

    componentWillMount() {
        this.load(this.props);
    }

    componentWillReceiveProps(newProps: FundsManagerProps) {
        if (this.state.loading) {
            this.setState({ loading: false });
        }
    }

    createNewWithdrawalPressed() {
        this.setState({ newWithdrawalPressed: true });
    }

    load(props = this.props) {
        this.setState({ loading: true }, () => props.getFunds(props.account));
    }

    render() {
        const { account } = this.props;

        return (
            <div className={styles.fundsManager}>

                {!account ? 'No Data' :
                    <Card className={cx(styles.fundsData, { blurring: this.state.loading })}>

                        {this.state.loading ? 'Loading'
                            :
                            <Grid
                                sortBy='requestTime'
                                sortDirection='desc'
                                className={styles.grid}
                                data={this.props.account.funds}
                                columns={FUNDS_COLUMNS}
                            />
                        }

                    </Card>
                }
                {this.state.newWithdrawalPressed ? this.openNewWithdrawaleDialog() : ''}

                {/* {this.state.selectedTradeItem ? this.openWalletPlane(this.state.selectedTradeItem.walletPlan) : ''} */}



                {/* {this.props.newTradeWallet ? this.openWalletPlane(this.props.newTradeWallet, 'New trade was successfully added!') : ''} */}

            </div>

        );
    }

    // walletPlaneDialogOk() {
    //     this.setState({ selectedTradeItem: undefined }, () => this.props.resetNewTrade(this.props.account.name));
    // }

    // openWalletPlane(walletPlane, title?) {
    //     return (
    //         <Dialog fullWidth title={title} open={true} cancelBtnHidden={true} onOkClick={() => { this.walletPlaneDialogOk(); }}>
    //             <span className={styles.walletPlanTitle}> Wallet Plan: </span>
    //             {_.map(walletPlane, (wallet: DepositRequest, index) => {
    //                 return (
    //                     <div className={styles.wallet} >
    //                         <InputText className={styles.addressWalletItem} label='Address' type='text' name='Address' value={wallet.walletAddress} disabled={true} />
    //                         <InputText className={styles.sizeWalletItem} label='Size' type='text' name='Size' value={wallet.size} disabled={true} />
    //                     </div>
    //                 );
    //             })}
    //         </Dialog>
    //     );
    // }

    private assetType;
    private amount;

    createWithdrawalObject() {
        return ({
            assetType: this.assetType,
            amount: this.amount
        });
    }

    createWithdrawal() {
        this.setState({ newWithdrawalPressed: false });
        this.props.createNewWithdrawal(this.props.account, this.createWithdrawalObject());
    }


    openNewWithdrawaleDialog() {
        return (
            <Dialog title='New Withdrawal' open={true} onCancelClick={() => { this.setState({ newWithdrawalPressed: false }); }} onOkClick={() => { this.createWithdrawal(); }}>
                <div className={styles.newWithdrawal} >
                    <InputText className={styles.newWithdrawalProp} ref={(input) => this.amount = input} label='Amount' type='text' name='Amount' />
                    <Select theme='dark' formControl formLabelText='Asset Type' className={styles.WithdrawalOption} onChange={selection => this.assetType = selection}>
                        <option value=''></option>
                        <option value='USD'>USD</option>
                        <option value='EUR'>EUR</option>
                    </Select>
                </div>
            </Dialog>
        );
    }

    // openWalletPlanePressed(item: WithdrawalStatus) {
    //     this.setState({ selectedWithdrawalItem: item });
    // }

    // renderOrderChildren(item: OrderStatus) {
    //     return (
    //         <div className={styles.orderNestedContainer}>
    //             <InputText className={styles.InputText} outlined disabled value={item.executionSize} label={'Executed so far'} />
    //             <InputText outlined disabled value={item.elapsedTimeMinutes} label={'Elapsed Time (in minutes)'} />
    //             <InputText outlined disabled value={item.executedTargetSize} label={'Target asset executed so far'} />
    //             <InputText outlined disabled value={item.tradeOrderId} label={'Order Id'} />
    //             {item.executionMessage && <InputText outlined disabled value={item.executionMessage} label={'Execution Message'} />}
    //             <Button className={styles.btn} intent='primary' type='contained' tooltip='Wallet Plane' onClick={(e) => this.openWalletPlanePressed(item)} iconName='account_balance_wallet'> </Button>
    //         </div>
    //     );
    // }
}