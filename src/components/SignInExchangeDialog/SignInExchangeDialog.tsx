import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
import { getLocalizedText } from 'lang';
import FormDialog from 'components/common/modals/FormDialog';
import { AccountCredentials } from 'businessLogic/model';
import InputText from 'components/common/core/InputText/InputText';

export interface SignInExchangeDialogProps {
    exchange: string;
    open?: boolean;
    signInToExchange(creds: AccountCredentials);
    onCancel();
}

export interface SignInExchangeDialogState {
    username?: string;
    key?: string;
    secret?: string;
}

export default class SignInExchangeDialog extends React.Component<SignInExchangeDialogProps, SignInExchangeDialogState> {

    constructor(props) {
        super(props);
        this.state = {};
    }

    private doSignIn() {
        const { username, key, secret } = this.state;
        this.props.signInToExchange({ exchange: this.props.exchange, username, key, secret });
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

                <div className={styles.invalidLogin}>
                </div>

            </FormDialog>
        );
    }

}