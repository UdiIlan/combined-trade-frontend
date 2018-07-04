import * as React from 'react';
import TextField from '@material-ui/core/TextField';

export default class InputText extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return <TextField {...this.props} />;
    }
}