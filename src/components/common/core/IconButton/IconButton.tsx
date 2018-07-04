import * as React from 'react';
const styles = require('./styles.scss');
import Icon from '@material-ui/core/Icon';
import { default as MUIconButton } from '@material-ui/core/IconButton';

export interface IconButtonProps {
    disabled?: boolean;
    className?: string;
    iconName?: string;
    children?: any;
    onClick?(e);
}

export default function IconButton(props: IconButtonProps) {
    const { iconName, ...btnProps } = props;
    return (
        <MUIconButton {...btnProps}>
            {!!iconName && <Icon>
                {props.iconName}
            </Icon>}
            {props.children}
        </MUIconButton>
    );
}
