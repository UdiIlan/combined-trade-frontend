import * as React from 'react';
import { default as MISelect } from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);

export interface SelectProps {
    selectedValue?: any;
    className?: string;
    theme?: 'default' | 'white' | 'dark';
    onChange?();
}

export default class Select extends React.Component<any, any> {

    render() {
        return (
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
    }

}