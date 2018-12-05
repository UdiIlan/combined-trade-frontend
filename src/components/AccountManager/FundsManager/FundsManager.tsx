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
import Dialog, { DialogProps } from 'components/common/modals/Dialog';
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
    newWithdrawalId: string;
    getFunds(account: Account);
    createNewWithdrawal(account: Account, Withdrawal: WithdrawalRequest);
    resetNewWithdrawal(accountName: string);
}


interface FundsManagerState {
    loading: boolean;
    openDialog?: DialogProps;
}

export default class FundsManager extends React.Component<FundsManagerProps, FundsManagerState> {

    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    componentWillMount() {
        this.load(this.props);
    }

    componentWillReceiveProps(newProps: FundsManagerProps) {
        if (this.state.loading) {
            this.setState({ loading: false });
        }
        if (newProps.newWithdrawalId) {
            this.openWithdrawalRes(newProps.newWithdrawalId, 'New withdrawal request was successfully submitted!');
        }
    }

    openWithdrawalRes(transactionId: string, title: string) {

        const dialog = {
            title: title,
            cancelBtnHidden: true,
            intent: 'success',
            onOkClick: () => this.setState({ openDialog: undefined }),
            children: this.renderNewWithdrawalResBody(transactionId),
        } as DialogProps;

        this.setState({ openDialog: dialog });
    }

    renderNewWithdrawalResBody(transactionId: string) {
        return (
            <div>
              <span className={styles.transactionIdTitle}> Whithdrawal transaction ID: {transactionId} </span>
            </div>
          );
    }

    createNewWithdrawalPressed() {
        const dialog = {
            title: 'New Withdrawal',
            onCancelClick: () => this.setState({ openDialog: undefined }),
            onOkClick: () => this.createWithdrawalOk(),
            children: this.renderNewWithdrawalDialogBody(),
        } as DialogProps;

        this.setState({ openDialog: dialog });
    }

    createWithdrawalOk() {
        const confirmDialog = {
            title: 'Are you sure you want to submit withdrawal request?',
            onOkClick: () => {
                this.setState({ openDialog: undefined });
                this.createWithdrawalConfirmed();
            },
            onCancelClick: () => this.setState({ openDialog: undefined }),
            okBtnText: 'Yes, Confirm',
            cancelBtnText: 'No, Ignore'
        } as DialogProps;

        this.setState({ openDialog: confirmDialog });
    }

    createWithdrawalConfirmed() {
        this.props.createNewWithdrawal(this.props.account, this.createWithdrawalObject());
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

                {!!this.state.openDialog &&
                    <Dialog open={true}
                        {...this.state.openDialog}>
                    </Dialog>
                }

            </div>

        );
    }

    private assetType;
    private amount;

    createWithdrawalObject() {
        return ({
            assetType: this.assetType,
            amount: this.amount
        });
    }

    renderNewWithdrawalDialogBody() {
        return (<div className={styles.newWithdrawal} >
            <InputText className={styles.newWithdrawalProp} onChange={(e) => this.amount = e.target.value} label='Amount' type='number' name='Amount' />
            <Select theme='dark' formControl formLabelText='Asset Type' className={styles.WithdrawalOption} onChange={selection => this.assetType = selection}>
                <option value=''></option>
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
            </Select>
        </div>);
    }
}