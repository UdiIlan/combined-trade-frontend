import * as React from 'react';
import * as _ from 'lodash';
import { DateUtils } from 'businessLogic/utils';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import { getLocalizedText } from 'lang';
import { OrderActionStatus } from 'businessLogic/model';

import Popover from '@material-ui/core/Popover';

export interface OrderStatusItemProps {
    order: OrderActionStatus;
}

export interface OrderStatusItemState {
    popover?: any;
}

export default class OrderStatusItem extends React.Component<OrderStatusItemProps, OrderStatusItemState> {

    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate(nextProps: OrderStatusItemProps, nextState) {
        return !_.isEqual(this.props.order, nextProps.order) || !_.isEqual(this.state, nextState);
    }

    render() {
        const { order } = this.props;
        return [
            < li key='item'
                onClick={(e) => { this.setState({ popover: e.target }); console.debug(e.target); }}
                className={
                    cx(styles.orderStatusItem,
                        { highlighted: Boolean(this.state.popover) },
                        { failed: order.status === 'error' || ((order.action_type === 'buy' || order.action_type === 'sell') && order.status === 'cancelled') },
                        { success: order.status === 'finished' },
                        { progress: order.status === 'pending' || order.status === 'in-progress' })}>
                <span className={styles.opt}>
                    {`${order.action_type.split('_')[0]}`}
                </span>
                <span className={styles.splitter}>|</span>
                <span className={styles.info}>
                    {`${order.crypto_size} ${order.crypto_type} @ ${order.price_fiat} USD`}
                </span>
            </li >,
            this.renderPopover(order)
        ];
    }

    renderPopover(order: OrderActionStatus) {
        return (
            <Popover
                key='popover'
                open={Boolean(this.state.popover)}
                anchorEl={this.state.popover}
                onClose={() => this.setState({ popover: undefined })}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className={styles.popover}>
                    <div className={styles.orderDetail}>
                        <span className={styles.key}>{getLocalizedText('order_time')}</span>
                        <span className={styles.value}>{DateUtils.defaultFormat(order.order_time)}</span>
                    </div>
                    <div className={styles.orderDetail}>
                        <span className={styles.key}>{getLocalizedText('size')}</span>
                        <span className={styles.value}>{`${order.crypto_size} ${order.crypto_type}`}</span>
                    </div>
                    <div className={styles.orderDetail}>
                        <span className={styles.key}>{getLocalizedText('price')}</span>
                        <span className={styles.value}>{`${order.price_fiat} USD`}</span>
                    </div>
                    <div className={styles.orderDetail}>
                        <span className={styles.key}>{getLocalizedText('execution_status')}</span>
                        <span className={cx(styles.value, styles.capital)}>{order.status}</span>
                    </div>
                    <div className={styles.orderDetail}>
                        <span className={styles.key}>{getLocalizedText('exchange')}</span>
                        <span className={styles.value}>{order.exchange}</span>
                    </div>
                    {order.exchange_id !== '0' && <div className={styles.orderDetail}>
                        <span className={styles.key}>{getLocalizedText('order_id')}</span>
                        <span className={styles.value}>{order.exchange_id}</span>
                    </div>}
                </div>
            </Popover>
        );
    }

}
