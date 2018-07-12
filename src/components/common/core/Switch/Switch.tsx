import * as React from 'react';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import { default as MISwitch } from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export interface SwitchProps {
    disabled?: boolean;
    className?: string;
    label?: string;
    labelClass?: string;
    checked?: boolean;
    value?: any;
    onChange?(e);
}


export default function Switch(props: SwitchProps) {
    const { className, label, labelClass, ...cbProps } = props;

    const cb = <MISwitch color='primary' className={cx(styles.btn, className)} {...cbProps} />;

    if (!label) return cb;

    return (
        <FormControlLabel classes={{ label: labelClass }} control={cb} label={label}>
            {cb}
        </FormControlLabel>
    );
}
