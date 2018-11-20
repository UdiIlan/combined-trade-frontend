import * as React from 'react';
import TextField from '@material-ui/core/TextField';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);

interface NumericInputState {
    currentValue;
}

export interface NumericInputProps {
    className?: string;
    theme?: 'default' | 'light' | 'dark';
    label?: string;
    name?: string;
    value?: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    inline?: boolean;
    onChange?(e);
    onBlur?(value: number);
}


export default class NumericInput extends React.Component<NumericInputProps, NumericInputState> {

    constructor(props) {
        super(props);
        this.state = { currentValue: props.value || '' };
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    componentWillReceiveProps(nextProps: NumericInputProps) {
        if ((!!this.props.value && this.state.currentValue !== nextProps.value) || (!this.props.value && !!nextProps.value)) {
            this.setState({ currentValue: nextProps.value || '' });
        }
    }

    onChange(e) {
        const ne = { ...e };
        const newVal = e.target.value;
        if (this.props.max !== undefined && Number(newVal) > this.props.max) return;
        if (this.props.min !== undefined && Number(newVal) < this.props.min) return;
        this.setState({ currentValue: newVal }, () => { if (this.props.onChange) this.props.onChange(ne); });
    }

    onBlur(e) {
        if (this.props.onBlur) this.props.onBlur(Number(this.state.currentValue || 0));
    }

    render() {

        const { className, onChange, value, onBlur, inline, ...otherProps } = this.props;
        const theme = this.props.theme || 'light';

        return <TextField type='number' className={cx({ inline: inline }, className)} value={this.state.currentValue} onBlur={this.onBlur} onChange={this.onChange} {...otherProps}
            classes={theme === 'light' ?
                {
                    root: styles.whiteText
                } :
                undefined}
            InputLabelProps={{ className: theme === 'light' ? styles.whiteInput : undefined, classes: theme === 'light' ? { root: styles.whiteInput, formControl: styles.whiteInput } : undefined }}
            InputProps={{ classes: theme === 'light' ? { root: styles.whiteInput, underline: styles.whiteInput } : undefined }} />;
    }
}