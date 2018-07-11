import * as React from 'react';
import * as _ from 'lodash';

const styles = require('./styles.scss');

import { default as MIMenu } from '@material-ui/core/Menu';
import { default as MIMenuItem } from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export interface MenuItem {
    displayText: string;
    icoSrc?: any;
    icoStyle?: string;
    selected?: boolean;
}

export interface MenuProps {
    openTarget?: any;
    id?: string;
    className?: string;
    options: MenuItem[];
    onClick?(e);
    onClose();
}


export class Menu extends React.Component<MenuProps, any> {

    constructor(props) {
        super(props);
    }

    handleClose = () => {
       this.props.onClose();
    }

    onItemClick(cb) {
        this.handleClose();
        if (cb) cb();
    }


    render() {
        return (
            <MIMenu
                id={this.props.id}
                anchorEl={this.props.openTarget}
                onClose={this.handleClose}
                open={Boolean(this.props.openTarget)}>
                {this.renderOptions()}
            </MIMenu>
        );
    }

    renderOptions() {
        return (
            _.map(this.props.options, (opt, index) =>
                <MIMenuItem key={index} selected={opt.selected} onClick={() => this.onItemClick(opt.onClick)}>
                    {!!opt.icoSrc && <ListItemIcon>
                        <img className={opt.icoStyle} src={opt.icoSrc} />
                    </ListItemIcon >}
                    <ListItemText inset primary={opt.displayText} />
                </MIMenuItem>
            )
        );
    }
}
