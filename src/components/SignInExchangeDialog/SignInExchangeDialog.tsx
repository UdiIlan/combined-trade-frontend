import * as React from 'react';
const styles = require('./styles.scss');
import { getLocalizedText } from 'lang';
import Spinner from 'components/common/core/Spinner';
import FormDialog from 'components/common/modals/FormDialog';
import { AccountCredentials } from 'businessLogic/model';
import InputText from 'components/common/core/InputText/InputText';

export interface SignInExchangeDialogProps {
    exchange: string;
    open?: boolean;
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
}

export default class SignInExchangeDialog extends React.Component<SignInExchangeDialogProps, SignInExchangeDialogState> {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps: SignInExchangeDialogProps) {
        if (this.props.loggingIn && !nextProps.loggingIn) this.setState({ invalidLogin: nextProps.invalidLogin });
    }

    private doSignIn() {
        this.setState({ invalidLogin: undefined });
        const { username, key, secret } = this.state;
        this.props.signInToExchange({ exchange: this.props.exchange, username, key, secret, maker_fee: 0, taker_fee: 0 });
    }

    render() {
        const { username, key, secret } = this.state;

        return (
            <FormDialog
                open={this.props.open}
                okBtnText='Login'
                okBtnDisabled={!username || !key || !secret}
                title={`Sign in to ${this.props.exchange}`}
                onOkClick={() => this.doSignIn()}
                onCancelClick={this.props.onCancel}
            >

                <div className={styles.signInDialogContent}>
                    <InputText onChange={(e) => this.setState({ username: e.target.value })} label='Account Number' name='account_number' type='number' />
                    <InputText onChange={(e) => this.setState({ key: e.target.value })} label='API Key' name='api' type='password' />
                    <InputText onChange={(e) => this.setState({ secret: e.target.value })} label='Secret Key' name='secret_key' type='password' />
                </div>

                <div className={styles.footer} >

                    {this.state.invalidLogin &&
                        <div className={styles.invalidLogin}>
                            {this.state.invalidLogin.message}
                        </div>
                    }

                    {this.props.loggingIn &&
                        <Spinner size={20} />}

                </div>

            </FormDialog>
        );
    }

}