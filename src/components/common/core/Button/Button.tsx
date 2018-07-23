import * as React from 'react';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import { default as MIButton } from '@material-ui/core/Button';

export type ButtonType = 'regular' | 'floating' | 'inline-floating' | 'contained';

export interface ButtonProps {
    disabled?: boolean;
    className?: string;
    iconName?: string;
    children?: any;
    tooltip?: string;
    type?: ButtonType;
    intent?: 'primary' | 'secondary' | 'default';
    linkTo?: string;
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
        case 'contained':
            return 'contained';
        default:
            return 'flat';
    }
};

export default function Button(props: ButtonProps) {
    const { className, linkTo, iconName, type, intent, tooltip, ...btnProps } = props;
    let link = !!linkTo ? prop => {
        const rLink = <Link to={linkTo} {...prop} />;
        if (!tooltip || btnProps.disabled) return rLink;
        return <Tooltip title={tooltip} placement='bottom'>{rLink}</Tooltip>;
    } : undefined;

    const button =
        <MIButton className={cx(styles.btn, className)} color={intent} component={link} variant={getMIButtonVariant(type)} {...btnProps}>
            {!!iconName && <Icon className={styles.btnIco}>
                {props.iconName}
            </Icon>}
            {props.children}
        </MIButton>;
    if (!tooltip || btnProps.disabled) return button;
    return (
        <Tooltip title={tooltip} placement='bottom'>
            {button}
        </Tooltip>
    );
}
