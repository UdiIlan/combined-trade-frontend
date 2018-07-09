import * as React from 'react';
const styles = require('./styles.scss');
import Icon from '@material-ui/core/Icon';
import { default as MUIconButton } from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


export interface IconButtonProps {
    disabled?: boolean;
    className?: string;
    iconName?: string;
    children?: any;
    tooltip?: string;
    onClick?(e);
}

export default function IconButton(props: IconButtonProps) {
    const { iconName, tooltip, ...btnProps } = props;
    const button =
        <MUIconButton type='btn' {...btnProps}>
            {!!iconName && <Icon>
                {props.iconName}
            </Icon>}
            {props.children}
        </MUIconButton>;
    if (!tooltip || btnProps.disabled) return button;
    return (
        <Tooltip title={tooltip} placement='left' classes={{ popper: styles.tooltip }}>
            {button}
        </Tooltip>
    );
}
