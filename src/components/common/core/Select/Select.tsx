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
        const select = (
            <MISelect
                native
                className={cx(styles.select, this.props.className)}
                value={this.props.selectedValue}
                onChange={this.props.onChange}
                classes={this.props.theme === 'white' ?
                    {
                        root: styles.whiteSelect,
                        select: styles.whiteSelect,
                        icon: styles.whiteSelect,
                    } :
                    undefined}
                input={<Input classes={this.props.theme === 'white' ? { root: styles.whiteInput, underline: styles.whiteInput } : undefined} />}
            >
                {this.props.children}
            </MISelect>
        );

        if (!this.props.formControl) return select;

        return (
            <FormControl>
                {!!this.props.formLabelText && <InputLabel>{this.props.formLabelText}</InputLabel>}
                {select}
                {!!this.props.formHelperText && <FormHelperText>{this.props.formHelperText}</FormHelperText>}
            </FormControl>
        );
    }

}