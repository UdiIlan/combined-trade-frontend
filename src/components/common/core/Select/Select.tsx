import * as React from 'react';
import { default as MISelect } from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
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
    onChange?(e);
}

export default class Select extends React.Component<SelectProps, any> {

    render() {
        const selectClassName = this.props.theme === 'white' ? styles.whiteSelect : undefined;
        const inputClassName = this.props.theme === 'white' ? styles.whiteInput : undefined;

        const select = (
            <MISelect
                native
                className={cx(styles.select, this.props.className)}
                value={this.props.selectedValue}
                onChange={this.props.onChange}
                classes={
                    {
                        root: selectClassName,
                        select: selectClassName,
                        icon: selectClassName,
                    }}
                input={<Input classes={{ root: inputClassName, underline: inputClassName }} />}
            >
                {this.props.children}
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

}