import * as React from 'react';
import * as _ from 'lodash';
import { default as MISelect } from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);

export interface SelectProps {
    selectedValue?: any;
    className?: string;
    theme?: 'default' | 'white' | 'dark';
    formControl?: boolean;
    formHelperText?: string;
    formLabelText?: string;
    disabled?: boolean;
    multiple?: boolean;
    renderAsMenu?: boolean;
    options?: string[];
    onChange?(e);
}

export default class Select extends React.Component<SelectProps, any> {

    render() {
        const selectClassName = this.props.theme === 'white' ? styles.whiteSelect : undefined;
        const inputClassName = this.props.theme === 'white' ? styles.whiteInput : undefined;

        const select = (
            <MISelect
                native={!this.props.renderAsMenu}
                className={cx(styles.select, this.props.className)}
                value={this.props.selectedValue || (this.props.multiple ? [] : '')}
                onChange={this.props.onChange}
                disabled={this.props.disabled}
                multiple={this.props.multiple}
                renderValue={this.props.multiple ? selected => (selected as any[]).join(', ') : selected => selected}
                classes={
                    {
                        root: selectClassName,
                        select: selectClassName,
                        icon: selectClassName,
                    }}
                input={<Input classes={{ root: inputClassName, underline: inputClassName }} />}
            >
                {!this.props.renderAsMenu ?
                    this.props.children :
                    _.map(this.props.options, (item) => this.renderItem(item))
                }
            </MISelect>
        );

        if (!this.props.formControl) return select;

        return (
            <FormControl>
                {!!this.props.formLabelText && <InputLabel className={inputClassName} classes={{ root: styles.className }} >{this.props.formLabelText}</InputLabel>}
                {select}
                {!!this.props.formHelperText && <FormHelperText>{this.props.formHelperText}</FormHelperText>}
            </FormControl>
        );
    }

    private renderItem(item) {
        if (this.props.multiple) {
            return (
                <MenuItem key={item} value={item}>
                    <Checkbox checked={this.props.selectedValue && this.props.selectedValue.indexOf(item) > -1} />
                    <ListItemText primary={item} />
                </MenuItem>
            );
        }
        else {
            return <MenuItem key={item} value={item}>{item}</MenuItem>;
        }
    }

}