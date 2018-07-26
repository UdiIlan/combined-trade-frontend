import * as React from 'react';
const styles = require('./styles.scss');
import { getLocalizedText } from 'lang';
import Spinner from 'components/common/core/Spinner';
import Dialog from 'components/common/modals/Dialog';
import { AccountCredentials } from 'businessLogic/model';
import InputText from 'components/common/core/InputText';
import NumericInput from 'components/common/core/NumericInput';
import Checkbox from 'components/common/core/Checkbox';

export interface SignInExchangeDialogProps {
    exchange: string;
    loggingIn?: boolean;
    invalidLogin?: Error;
    signInToExchange(creds: AccountCredentials);
    onCancel();
}

export interface SignInExchangeDialogState {
    username?: string;
    key?: string;
    secret?: string;
    invalidLogin?: Error;
    makerFee?: number;
    takerFee?: number;
    disableFees: boolean;
}

export default class SignInExchangeDialog extends React.Component<SignInExchangeDialogProps, SignInExchangeDialogState> {

    constructor(props) {
        super(props);
        this.state = { disableFees: true };
    }

    componentWillReceiveProps(nextProps: SignInExchangeDialogProps) {
        if (this.props.loggingIn && !nextProps.loggingIn) this.setState({ invalidLogin: nextProps.invalidLogin });
    }

    private doSignIn() {
        this.setState({ invalidLogin: undefined });
        const { username, key, secret, makerFee, takerFee } = this.state;
        let signInObj: any = { exchange: this.props.exchange, username, key, secret, maker_fee: '', taker_fee: '' };
        if (!this.state.disableFees)
            signInObj = { ...signInObj, maker_fee: makerFee, taker_fee: takerFee };
        this.props.signInToExchange(signInObj);
    }

    render() {
        const { username, key, secret } = this.state;

        return (
            <Dialog
                open={true}
                okBtnText='Login'
                okBtnDisabled={!username || !key || !secret}
                title={`Sign in to ${this.props.exchange}`}
                onOkClick={() => this.doSignIn()}
                onCancelClick={this.props.onCancel}
            >

                <div className={styles.signInDialogContent}>
                    <div className={styles.required}>
                        <InputText onChange={(e) => this.setState({ username: e.target.value })} label='Account Number' name='account_number' type='number' />
                        <InputText onChange={(e) => this.setState({ key: e.target.value })} label='API Key' name='api' type='password' />
                        <InputText onChange={(e) => this.setState({ secret: e.target.value })} label='Secret Key' name='secret_key' type='password' />
                    </div>

                    <div className={styles.feesContainer}>
                        <Checkbox className={styles.cb} checked={this.state.disableFees} label='Use default fees' onChange={e => this.setState({ disableFees: !this.state.disableFees })} />
                        <div className={styles.fees} >
                            <NumericInput min={0} disabled={this.state.disableFees} onChange={(e) => this.setState({ makerFee: e.target.value })} label='Maker Fee' name='maker_fee' />
                            <NumericInput min={0} disabled={this.state.disableFees} onChange={(e) => this.setState({ takerFee: e.target.value })} label='Taker Fee' name='taker_fee' />
                        </div>
                    </div>

                </div>

                <div className={styles.footer} >

                    {this.state.invalidLogin &&
                        <div className={styles.invalidLogin}>
                            {this.state.invalidLogin.message}
                        </div>
                    }

                    {this.props.loggingIn && <Spinner size={20} />}
                </div>

            </Dialog>
        );
    }

}