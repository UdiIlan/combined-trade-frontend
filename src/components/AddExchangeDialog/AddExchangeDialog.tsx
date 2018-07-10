import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
import { getLocalizedText } from 'lang';
import Dialog from 'components/common/modals/Dialog';
import Checkbox from 'components/common/core/Checkbox';

export interface AddExchangeDialogProps {
    removedExchanges?: string[];
    addExchanges(newExchanges: string[]);
    onCancel();
}

export interface AddExchangeDialogState {
    addExchanges?: {};
}

export default class AddExchangeDialog extends React.Component<AddExchangeDialogProps, AddExchangeDialogState> {

    constructor(props) {
        super(props);
        this.state = { addExchanges: {} };
        this.addNewExchanges = this.addNewExchanges.bind(this);
    }

    private handleExchangeSelection = name => event => {
        const { addExchanges } = this.state;
        addExchanges[name] = event.target.checked;
        this.setState({ addExchanges: addExchanges });
    }

    private addNewExchanges() {
        const { addExchanges } = this.state;
        const newExchanges = _.filter(Object.keys(addExchanges), key => addExchanges[key]);
        this.props.addExchanges(newExchanges);

    }

    render() {
        const { addExchanges } = this.state;
        const newExchanges = _.filter(Object.keys(addExchanges), key => addExchanges[key]);

        return (
            <Dialog
                open={true}
                okBtnText='Add'
                onOkClick={this.addNewExchanges}
                okBtnDisabled={_.isEmpty(newExchanges)}
                title={'Add Exchanges'}
                subTitle={'Select one (or more) exchanges from the bellow list:'}
                onCancelClick={this.props.onCancel}
            >

                <div className={styles.addExchangeDialogContent}>

                    {this.props.removedExchanges.map(exchange => (
                        <Checkbox
                            checked={addExchanges[exchange]}
                            onChange={this.handleExchangeSelection(exchange)}
                            label={exchange}
                        />
                    ))}

                </div>

            </Dialog>
        );
    }

}