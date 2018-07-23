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


const SELECT_ALL_OPTION = 'All';

export interface SelectProps {
    selectedValue?: any;
    className?: string;
    theme?: 'default' | 'white' | 'dark';
    formControl?: boolean;
    formHelperText?: string;
    formLabelText?: string;
    disabled?: boolean;
    multiple?: boolean;
    selectAll?: boolean;
    options?: string[];
    onChange?(selection);
}

export interface SelectState {
    selectedValue?: any;
    options?: string[];
}

export default class Select extends React.Component<SelectProps, SelectState> {

    constructor(props) {
        super(props);
        this.state = {
            selectedValue: props.selectedValue || (props.multiple ? [] : ''),
            options: props.multiple ? this.getMultipleOptions(props) : undefined
        };
    }

    componentWillMount() {
        if (this.props.multiple && this.props.selectedValue) this.updateSelection(this.props.selectedValue);
    }

    private getMultipleOptions(props?) {
        props = props || this.props;
        let options = [...props.options];
        options.splice(0, 0, SELECT_ALL_OPTION);
        return options;
    }

    private updateSelection(selection) {

        let newSelection = selection;

        if (!this.props.multiple) {
            this.setState({ selectedValue: newSelection }, () => {
                if (this.props.onChange)
                    this.props.onChange(newSelection);
            });
            return;
        }

        const prevSelection = this.state.selectedValue || [];
        const options = this.getMultipleOptions();
        const realSelection = _.filter(selection, item => item !== SELECT_ALL_OPTION);

        if (selection.indexOf(SELECT_ALL_OPTION) < 0 && prevSelection.indexOf(SELECT_ALL_OPTION) >= 0) {
            newSelection = [];
        }
        else if (selection.indexOf(SELECT_ALL_OPTION) >= 0 && prevSelection.indexOf(SELECT_ALL_OPTION) < 0) {
            newSelection = options;
        }
        else {
            const realOptions = _.filter(options, item => item !== SELECT_ALL_OPTION);
            if (selection.length < prevSelection.length)
                newSelection = realSelection;
            else if (_.intersection(selection, realOptions).length === realOptions.length)
                newSelection = options;
        }

        this.setState({ selectedValue: newSelection }, () => {
            if (this.props.onChange)
                this.props.onChange(_.filter(newSelection, item => item !== SELECT_ALL_OPTION));
        });
    }

    private renderSelectedValue(selected) {
        if (!this.props.multiple) return selected;

        if (_.isEmpty(selected)) return 'None';

        if (selected.indexOf(SELECT_ALL_OPTION) >= 0) return SELECT_ALL_OPTION;

        return (selected as any[]).join(', ');
    }

    render() {
        const selectClassName = this.props.theme === 'white' ? styles.whiteSelect : undefined;
        const inputClassName = this.props.theme === 'white' ? styles.whiteInput : undefined;

        const select = (
            <MISelect
                native={!this.props.multiple}
                className={cx(styles.select, this.props.className)}
                value={this.state.selectedValue}
                onChange={(e) => this.updateSelection(e.target.value)}
                disabled={this.props.disabled}
                displayEmpty={this.props.multiple}
                multiple={this.props.multiple}
                renderValue={selected => this.renderSelectedValue(selected)}
                classes={
                    {
                        root: selectClassName,
                        select: selectClassName,
                        icon: selectClassName,
                    }}
                input={<Input classes={{ root: inputClassName, underline: inputClassName }} />}
            >
                {!this.props.multiple ?
                    this.props.children :
                    _.map(this.state.options, (item) => this.renderItem(item))
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
                    <Checkbox checked={this.state.selectedValue && this.state.selectedValue.indexOf(item) > -1} />
                    <ListItemText primary={item} />
                </MenuItem>
            );
        }
        else {
            return <MenuItem key={item} value={item}>{item}</MenuItem>;
        }
    }

}