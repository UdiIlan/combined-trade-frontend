import * as React from 'react';
import TextField from '@material-ui/core/TextField';

interface InputTextState {
    currentValue;
}

export default class InputText extends React.Component<any, InputTextState> {

    constructor(props) {
        super(props);
        this.state = { currentValue: props.value || '' };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const ne = {...e};
        this.setState({ currentValue: e.target.value }, () =>  this.props.onChange(ne));
    }

    render() {

        const { onChange, value, ...otherProps } = this.props;

        return <TextField value={this.state.currentValue} onChange={this.onChange} {...otherProps} />;
    }
}