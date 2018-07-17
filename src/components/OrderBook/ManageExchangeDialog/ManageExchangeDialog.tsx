import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
import { getLocalizedText } from 'lang';
import Dialog from 'components/common/modals/Dialog';
import Checkbox from 'components/common/core/Checkbox';
import { UNIFIED_EXCHANGE_KEY } from 'businessLogic/model';

export interface ManageExchangeDialogProps {
    exchangesStatus: {};
    selectExchanges(exchangesToAdd: string[], exchangesToRemove: string[]);
    onCancel();
}

export interface ManageExchangeDialogState {
    newExchangesStatus?: {};
}

export default class ManageExchangeDialog extends React.Component<ManageExchangeDialogProps, ManageExchangeDialogState> {

    constructor(props) {
        super(props);
        this.state = { newExchangesStatus: { ...props.exchangesStatus } };
        this.updateExchanges = this.updateExchanges.bind(this);
    }

    private handleExchangeSelection = name => event => {
        const newExchangesStatus = { ...this.state.newExchangesStatus };
        newExchangesStatus[name] = event.target.checked;
        this.setState({ newExchangesStatus: newExchangesStatus });
    }

    private updateExchanges() {
        const { newExchangesStatus } = this.state;
        const curExchangesStatus = this.props.exchangesStatus;
        const exchangesToAdd = _.filter(Object.keys(newExchangesStatus), key => newExchangesStatus[key] && !curExchangesStatus[key]);
        const exchangesToRemove = _.filter(Object.keys(newExchangesStatus), key => !newExchangesStatus[key] && curExchangesStatus[key]);
        this.props.selectExchanges(exchangesToAdd, exchangesToRemove);

    }

    render() {
        const { newExchangesStatus } = this.state;
        const exchanges = _.filter(Object.keys(newExchangesStatus), key => key !== UNIFIED_EXCHANGE_KEY);
        const hadChanges = !_.isEqual(newExchangesStatus, this.props.exchangesStatus);

        return (
            <Dialog
                open={true}
                okBtnText='Choose'
                onOkClick={this.updateExchanges}
                okBtnDisabled={!hadChanges}
                title={'Choose Exchanges'}
                subTitle={'Select one (or more) exchanges from the bellow list:'}
                onCancelClick={this.props.onCancel}
            >

                <div className={styles.addExchangeDialogContent}>

                    {exchanges.map(exchange => (
                        <Checkbox
                            key={`ckb_${exchange}`}
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