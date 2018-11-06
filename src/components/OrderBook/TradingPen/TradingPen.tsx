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
    openDialog?: DialogProps;
    timedOrderCancelled?: boolean;
}

export default class TradingPen extends React.Component<TradingPenProps, TradingPenState> {

    constructor(props) {
        super(props);
        this.state = {};
        this.sendNewOrder = this.sendNewOrder.bind(this);
    }

    private tb: TradingBox;

    private cancelRunningOrder() {

        const confirmDialog = {
            title: getLocalizedText('cancel_timed_order'),
            subTitle: [
                <span key='row1'>{getLocalizedText('cancel_order_confirm')}</span>,
                <br key='separator' />,
                <span key='row2'>{getLocalizedText('are_you_sure')}</span>
            ],
            onOkClick: () => this.setState({ openDialog: undefined, timedOrderCancelled: true },
                () => {
                    this.props.cancelTimedOrder();
                    if (this.tb) this.tb.reset();
                }),
            onCancelClick: () => this.setState({ openDialog: undefined }),
            okBtnText: 'Yes, Cancel',
            cancelBtnText: 'No, Ignore'
        } as DialogProps;

        this.setState({ openDialog: confirmDialog });

    }

    componentWillReceiveProps(nextProps: TradingPenProps) {
        if (!!this.props.runningTimedOrder && !nextProps.runningTimedOrder && !this.state.timedOrderCancelled) {
            const dialog = {
                title: getLocalizedText('timed_order_success'),
                subTitle: [
                    <span key='row1'>{`Action Type: ${getLocalizedText(this.props.runningTimedOrder.action_type)}`}</span>,
                    <br key='separator1' />,
                    <span key='row2'>{`Done: ${this.props.runningTimedOrder.timed_order_done_size ? this.props.runningTimedOrder.timed_order_done_size.toFixed(4) : 0}`}</span>
                ],
                onCancelClick: () => this.setState({ openDialog: undefined }),
                okBtnHidden: true,
                intent: 'success',
                cancelBtnText: 'OK'
            } as DialogProps;

            this.setState({ openDialog: dialog });
        }
    }

    sendNewOrder(command: OrderAction) {
        this.setState({ timedOrderCancelled: false }, () => this.props.sendNewOrderCommand(command));
    }

    render() {
        const { className, runningTimedOrder, sendNewOrderCommand, ...otherProps } = this.props;
        const completed = runningTimedOrder && runningTimedOrder.timed_order_done_size ? runningTimedOrder.timed_order_done_size : 0;
        return (
            <Sidebar className={cx(styles.tradingPen, className)} header={getLocalizedText('trading_area')} align='left' collapsible open>
                <TradingBox ref={tb => this.tb = tb} disableTrade={!!runningTimedOrder} sendNewOrderCommand={this.sendNewOrder} {...otherProps} />

                {!!runningTimedOrder && !this.state.timedOrderCancelled &&
                    <div className={styles.timedOrder}>
                        <span className={styles.text}>{`${runningTimedOrder.action_type.indexOf('buy') < 0 ? getLocalizedText('sold') : getLocalizedText('bought')} ${completed > 0 ? completed.toFixed(4) : 0} ${getLocalizedText('out_of')} ${runningTimedOrder.timed_order_required_size} ${this.props.selectedCurrency}`}</span>
                        <ProgressBar className={styles.progress} value={(completed / runningTimedOrder.timed_order_required_size) * 100} />
                        <Button onClick={() => this.cancelRunningOrder()} className={styles.cancelBtn}>{getLocalizedText('cancel')}</Button>
                    </div>
                }

                {!!this.state.openDialog &&
                    <Dialog
                        open={true}
                        {...this.state.openDialog}
                    />
                }

            </Sidebar>
        );
    }
}
