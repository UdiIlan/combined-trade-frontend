import * as React from 'react';
import TextField from '@material-ui/core/TextField';
const styles = require('./styles.scss');

interface NumericInputState {
    currentValue;
}

export interface NumericInputProps {
    className?: string;
    theme?: 'default' | 'white' | 'dark';
    label?: string;
    name?: string;
    value?: any;
    min?: number;
    max?: number;
    onChange?(e);
}


export default class NumericInput extends React.Component<NumericInputProps, NumericInputState> {

    constructor(props) {
        super(props);
        this.state = { currentValue: props.value || '' };
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps: NumericInputProps) {
        if (!!this.props.value && this.state.currentValue !== nextProps.value) this.setState({ currentValue: nextProps.value || '' });
    }

    onChange(e) {
        const ne = { ...e };
        const newVal = e.target.value;
        if (this.props.max !== undefined && Number(newVal) > this.props.max) return;
        if (this.props.min !== undefined && Number(newVal) < this.props.min) return;
        this.setState({ currentValue: newVal }, () => this.props.onChange(ne));
    }

    render() {

        const { className, onChange, value, ...otherProps } = this.props;

        return <TextField type='number' className={className} value={this.state.currentValue} onChange={this.onChange} {...otherProps}
            classes={this.props.theme === 'white' ?
                {
                    root: styles.whiteText
                } :
                undefined}
            InputLabelProps={{ className: this.props.theme === 'white' ? styles.whiteInput : undefined, classes: this.props.theme === 'white' ? { root: styles.whiteInput, formControl: styles.whiteInput } : undefined }}
            InputProps={{ classes: this.props.theme === 'white' ? { root: styles.whiteInput, underline: styles.whiteInput } : undefined }} />;
    }
}