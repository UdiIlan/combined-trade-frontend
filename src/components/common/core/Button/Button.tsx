import * as React from 'react';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import { default as MIButton } from '@material-ui/core/Button';

export type ButtonType = 'regular' | 'floating' | 'inline-floating';

export interface ButtonProps {
    disabled?: boolean;
    className?: string;
    iconName?: string;
    children?: any;
    tooltip?: string;
    type?: ButtonType;
    intent?: 'primary' | 'secondary' | 'default';
    onClick?(e);
}

const getMIButtonVariant = (type: ButtonType) => {
    switch (type) {
        case 'regular':
            return 'outlined';
        case 'floating':
            return 'fab';
        case 'inline-floating':
            return 'extendedFab';
        default:
            return 'flat';
    }
};

export default function Button(props: ButtonProps) {
    const { className, iconName, type, intent, tooltip, ...btnProps } = props;

    const button =
        <MIButton className={cx(styles.btn, className)} color={intent} variant={getMIButtonVariant(type)} {...btnProps}>
            {!!iconName && <Icon className={styles.btnIco}>
                {props.iconName}
            </Icon>}
            {props.children}
        </MIButton>;
    if (!tooltip) return button;
    return (
        <Tooltip title={tooltip} placement='left' classes={{ popper: styles.tooltip }}>
            {button}
        </Tooltip>
    );
}
