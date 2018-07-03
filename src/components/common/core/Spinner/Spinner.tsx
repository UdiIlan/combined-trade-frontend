import * as React from 'react';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import CircularProgress from '@material-ui/core/CircularProgress';

const DEFAULT_SPINNER_SIZE = 50;

export interface SpinnerProps {
    size?: number;
    text?: string;
    className?: string;
}

export default function Spinner(props: SpinnerProps) {
    return (
        <div className={cx(styles.spinner, props.className)}>
            <CircularProgress size={props.size || DEFAULT_SPINNER_SIZE} color={'inherit'} />
            {props.text && <span className={styles.text}>{props.text}</span>}
        </div>
    );
}
