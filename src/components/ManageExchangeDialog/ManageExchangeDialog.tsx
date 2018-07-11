import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
import { getLocalizedText } from 'lang';
import Dialog from 'components/common/modals/Dialog';
import Checkbox from 'components/common/core/Checkbox';
import { UNIFIED_EXCHANGE_KEY } from 'businessLogic/model';

export interface ManageExchangeDialogProps {
    exchangesStatus: {};
    addExchanges(newExchanges: string[]);
    onCancel();
}

export interface ManageExchangeDialogState {
    newExchangesStatus?: {};
}

export default class ManageExchangeDialog extends React.Component<ManageExchangeDialogProps, ManageExchangeDialogState> {

    constructor(props) {
        super(props);
        this.state = { newExchangesStatus: { ...props.exchangesStatus } };
        this.addNewExchanges = this.addNewExchanges.bind(this);
    }

    private handleExchangeSelection = name => event => {
        const newExchangesStatus = { ...this.state.newExchangesStatus };
        newExchangesStatus[name] = event.target.checked;
        this.setState({ newExchangesStatus: newExchangesStatus });
    }

    private addNewExchanges() {
        const { newExchangesStatus } = this.state;
        const newExchanges = _.filter(Object.keys(newExchangesStatus), key => newExchangesStatus[key]);
        this.props.addExchanges(newExchanges);

    }

    render() {
        const { newExchangesStatus } = this.state;
        const exchanges = _.filter(Object.keys(newExchangesStatus), key => key !== UNIFIED_EXCHANGE_KEY);
        const hadChanges = !_.isEqual(newExchangesStatus, this.props.exchangesStatus);

        return (
            <Dialog
                open={true}
                okBtnText='Choose'
                onOkClick={this.addNewExchanges}
                okBtnDisabled={!hadChanges}
                title={'Choose Exchanges'}
                subTitle={'Select one (or more) exchanges from the bellow list:'}
                onCancelClick={this.props.onCancel}
            >

                <div className={styles.addExchangeDialogContent}>

                    {exchanges.map(exchange => (
                        <Checkbox
                            checked={newExchangesStatus[exchange]}
                            onChange={this.handleExchangeSelection(exchange)}
                            label={exchange}
                        />
                    ))}

                </div>

            </Dialog>
        );
    }

}