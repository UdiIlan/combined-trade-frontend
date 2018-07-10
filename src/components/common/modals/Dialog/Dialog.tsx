import * as React from 'react';
import Button from '@material-ui/core/Button';
import { default as MUDialog } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getLocalizedText } from 'lang';
const styles = require('./styles.scss');

export interface DialogProps {
    title: string;
    subTitle?: string | JSX.Element | JSX.Element[];
    open?: boolean;
    okBtnText?: string;
    okBtnDisabled?: boolean;
    cancelBtnText?: string;
    onOkClick?();
    onCancelClick?();
}


export default class Dialog extends React.Component<DialogProps, any> {

    constructor(props: DialogProps) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }


    handleClose = (ok?) => {
        if (ok === true && this.props.onOkClick) this.props.onOkClick();
        else if (this.props.onCancelClick) this.props.onCancelClick();
    }

    render() {
        return (
                <MUDialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    classes={{ paper: styles.dialog }}
                    aria-labelledby='form-dialog-title'>

                    <DialogTitle id='form-dialog-title'>{this.props.title}</DialogTitle>

                    <DialogContent className={styles.content}>
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
                </MUDialog>
        );
    }
}