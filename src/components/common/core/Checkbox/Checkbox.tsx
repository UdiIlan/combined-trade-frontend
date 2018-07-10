import * as React from 'react';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import { default as MICheckbox } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export interface CheckboxProps {
    disabled?: boolean;
    className?: string;
    label?: string;
    checked?: boolean;
    onChange?(e);
}


export default function Checkbox(props: CheckboxProps) {
    const { className, label, ...cbProps } = props;

    const cb = <MICheckbox className={cx(styles.btn, className)} {...cbProps} />;

    if (!label) return cb;

    return (
        <FormControlLabel control={cb} label={label}>
            {cb}
        </FormControlLabel>
    );
}
