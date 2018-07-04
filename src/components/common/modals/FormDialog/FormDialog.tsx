import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import { withTheme } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle';
import { getLocalizedText } from 'lang';
const styles = require('./styles.scss');

export interface FormDialogProps {
    title: string;
    subTitle?: string;
    open?: boolean;
    okBtnText?: string;
    okBtnDisabled?: boolean;
    cancelBtnText?: string;
    children: any;
    onOkClick?();
    onCancelClick?();
}


export default class FormDialog extends React.Component<FormDialogProps, any> {

    constructor(props: FormDialogProps) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }


    handleClose = (ok?) => {
        if (ok && this.props.onOkClick) this.props.onOkClick();
        else if (this.props.onCancelClick) this.props.onCancelClick();
    }

    render() {
        return (
            <div className={styles.formDialog}>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby='form-dialog-title'>

                    <DialogTitle id='form-dialog-title'>{this.props.title}</DialogTitle>

                    <DialogContent>
                        {this.props.subTitle && <DialogContentText>
                            {this.props.subTitle}
                        </DialogContentText>}

                        {this.props.children}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose(false)} color='primary'>
                            {this.props.cancelBtnText || getLocalizedText('cancel')}
                        </Button>
                        <Button disabled={this.props.okBtnDisabled} onClick={() => this.handleClose(true)} color='primary'>
                            {this.props.okBtnText || getLocalizedText('ok')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

// export default withTheme()(FormDialog);