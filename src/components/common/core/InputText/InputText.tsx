import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);

interface InputTextState {
    currentValue;
}

export interface InputTextProps {
    selectedValue?: any;
    className?: string;
    theme?: 'default' | 'white' | 'dark';
    // formControl?: boolean;
    // formHelperText?: string;
    label?: string;
    name?: string;
    value?: any;
    type?: any;
    onChange?(e);
}


export default class InputText extends React.Component<InputTextProps, InputTextState> {

    constructor(props) {
        super(props);
        this.state = { currentValue: props.value || '' };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const ne = { ...e };
        this.setState({ currentValue: e.target.value }, () => this.props.onChange(ne));
    }

    render() {

        const { className, onChange, value, ...otherProps } = this.props;

        return <TextField value={this.state.currentValue} onChange={this.onChange} {...otherProps}
            classes={this.props.theme === 'white' ?
                {
                    root: styles.whiteText
                } :
                undefined}
            InputLabelProps={{ className: this.props.theme === 'white' ? styles.whiteInput : undefined, classes: this.props.theme === 'white' ? { root: styles.whiteInput, formControl: styles.whiteInput } : undefined }}
            InputProps={{ classes: this.props.theme === 'white' ? { root: styles.whiteInput, underline: styles.whiteInput } : undefined }} />;
    }
}