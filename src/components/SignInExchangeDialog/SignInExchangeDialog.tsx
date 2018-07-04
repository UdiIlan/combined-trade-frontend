import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
import { getLocalizedText } from 'lang';
import FormDialog from 'components/common/modals/FormDialog';
import IconButton from 'components/common/core/IconButton';
import { ExchangeStatus, AccountCredentials } from 'businessLogic/model';
import InputText from 'components/common/core/InputText/InputText';

export interface SignInExchangeDialogProps {
    exchange: string;
    open?: boolean;
    signInToExchange(creds: AccountCredentials);
    onCancel();
}

export default class SignInExchangeDialog extends React.Component<SignInExchangeDialogProps, any> {

    constructor(props) {
        super(props);
        this.state = {};
    }

    private doSignIn() {
        // this.props.signInToExchange();
    }

    render() {
        return (
            <FormDialog
                open={this.props.open}
                okBtnText='Login'
                title={`Sign in to ${this.props.exchange}`}
                onOkClick={() => this.doSignIn()}
                onCancelClick={this.props.onCancel}
            >

                <div className={styles.signInDialogContent}>
                    <InputText label='Account Number' name='account_number' type='number' />
                    <InputText label='API Key' name='api' type='password' />
                    <InputText label='Secret Key' name='secret_key' type='password' />
                </div>

                <div className={styles.invalidLogin}>
                </div>

            </FormDialog>
        );
    }

}