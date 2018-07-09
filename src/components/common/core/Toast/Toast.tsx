import * as React from 'react';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import Icon from '@material-ui/core/Icon';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from 'components/common/core/IconButton';

const DEFAULT_AUTO_HIDE_TIME = 5000;

export type ToastIntent = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
    intent: ToastIntent;
    message: string;
    autoCloseTime?: number;
    open?: boolean;
}


export interface ToastState {
    open: boolean;
}


export default class Toast extends React.Component<ToastProps, ToastState> {

    constructor(props) {
        super(props);
        this.state = { open: props.open };
    }

    componentWillReceiveProps(nextProps: ToastProps) {
        if (this.state.open !== nextProps.open) this.setState({ open: nextProps.open });
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    }

    getIconName(intent: ToastIntent) {
        switch (intent) {
            case 'success':
                return 'check_circle';
            case 'error':
                return 'error';
            case 'warning':
                return 'warning';
            case 'info':
                return 'info';
        }
    }

    render() {
        return (
            <Snackbar
                className={styles.toast}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={this.state.open}
                autoHideDuration={this.props.autoCloseTime || DEFAULT_AUTO_HIDE_TIME}
                onClose={this.handleClose}>
                {this.renderContent()}
            </Snackbar>
        );
    }

    renderContent() {
        const { message, intent } = this.props;
        return (
            <SnackbarContent
                className={cx({ [`${intent}`]: true })}
                aria-describedby='client-snackbar'
                message={
                    <span id='client-snackbar' className={styles.message}>
                        <Icon className={cx(styles.icon, styles.iconVariant)}>
                            {this.getIconName(intent)}
                        </Icon>
                        {message}
                    </span>
                }
                action={
                    <IconButton
                        key='close'
                        aria-label='Close'
                        className={styles.closeIco}
                        iconName='close'
                        onClick={(e, reason?) => this.handleClose(e, reason)} />}
            />
        );
    }

}