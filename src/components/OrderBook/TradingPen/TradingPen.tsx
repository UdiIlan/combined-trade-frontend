import * as React from 'react';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import { getLocalizedText } from 'lang';
import { OrderAction, SupportedCurrencies, Exchange, TimedOrderActionStatus } from 'businessLogic/model';
import { default as Dialog, DialogProps } from 'components/common/modals/Dialog';
import Sidebar from 'components/common/containers/Sidebar';
import ProgressBar from 'components/common/core/ProgressBar';
import Button from 'components/common/core/Button';
import TradingBox from './TradingBox';


export interface TradingPenProps {
    className?: string;
    exchanges?: Exchange[];
    selectedCurrency: SupportedCurrencies;
    runningTimedOrder?: TimedOrderActionStatus;
    sendNewOrderCommand(command: OrderAction);
    cancelTimedOrder();
}
export interface TradingPenState {
    openDialog?: boolean;
}

export default class TradingPen extends React.Component<TradingPenProps, TradingPenState> {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { className, runningTimedOrder, ...otherProps } = this.props;
        return (
            <Sidebar className={cx(styles.tradingPen, className)} header='Trading Area' align='left' collapsible open>
                <TradingBox disabledTimedTrade={!!runningTimedOrder} {...otherProps} />

                {!!runningTimedOrder &&
                    <div className={styles.timedOrder}>
                        <span className={styles.text}>{`${runningTimedOrder.action_type.indexOf('buy') < 0 ? 'Sold' : 'Bought'} ${runningTimedOrder.timed_order_done_size} out of ${runningTimedOrder.timed_order_required_size} ${this.props.selectedCurrency}`}</span>
                        <ProgressBar className={styles.progress} value={runningTimedOrder.timed_order_done_size / runningTimedOrder.timed_order_required_size} />
                        <Button onClick={() => this.setState({ openDialog: true })} className={styles.cancelBtn}>Cancel</Button>
                    </div>
                }

                <Dialog
                    open={this.state.openDialog || false}
                    title='Cancel Timed Order'
                    subTitle={[<span key='row1'>{'You are about to cancel running timed order.'}</span>, <br key='separator' />, <span key='row2'>Are you sure?</span>]}
                    onOkClick={() => { this.props.cancelTimedOrder(); this.setState({ openDialog: false }); }}
                    onCancelClick={() => this.setState({ openDialog: false })}
                />

            </Sidebar>
        );
    }
}
