import * as React from 'react';
import TextField from '@material-ui/core/TextField';
const styles = require('./styles.scss');

interface InputTextState {
    currentValue;
}

export interface InputTextProps {
    className?: string;
    theme?: 'default' | 'light' | 'dark';
    label?: string;
    name?: string;
    value?: any;
    type?: any;
    disabled?: boolean;
    onChange?(e);
}


export default class InputText extends React.Component<InputTextProps, InputTextState> {

    constructor(props) {
        super(props);
        this.state = { currentValue: props.value || '' };
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!!this.props.value && this.state.currentValue !== nextProps.value) this.setState({ currentValue: nextProps.value || '' });
    }

    onChange(e) {
        const ne = { ...e };
        this.setState({ currentValue: e.target.value }, () => this.props.onChange(ne));
    }

    render() {

        const { className, onChange, value, ...otherProps } = this.props;

        return <TextField className={className} value={this.state.currentValue} onChange={this.onChange} {...otherProps}
            classes={this.props.theme === 'light' ?
                {
                    root: styles.whiteText
                } :
                undefined}
            InputLabelProps={{ className: this.props.theme === 'light' ? styles.whiteInput : undefined, classes: this.props.theme === 'light' ? { root: styles.whiteInput, formControl: styles.whiteInput } : undefined }}
            InputProps={{ classes: this.props.theme === 'light' ? { root: styles.whiteInput, underline: styles.whiteInput } : undefined }} />;
    }
}