import * as React from 'react';
import * as _ from 'lodash';
import { DateUtils } from 'businessLogic/utils';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import { getLocalizedText } from 'lang';
import { OrderActionStatus } from 'businessLogic/model';

export interface OrderStatusItemProps {
    order: OrderActionStatus;
}

export default class OrderStatusItem extends React.Component<OrderStatusItemProps, any> {

    shouldComponentUpdate(nextProps: OrderStatusItemProps, nextState) {
        return !_.isEqual(this.props.order, nextProps.order);
    }

    render() {
        const { order } = this.props;
        return (
            <li className={cx(styles.orderStatusItem,
                { failed: order.status === 'failed' || order.status === 'cancelled' },
                { success: order.status === 'success' },
                { progress: order.status === 'pending' ||  order.status === 'in-progress' })
            }>
                <span className={styles.text}>
                    {`${DateUtils.format(order.order_time)} | `}
                </span>
                <span className={cx(styles.text, styles.type)}>
                    {` ${order.action_type} | `}
                </span>
                <span className={styles.text}>
                    {` ${order.crypto_size} ${order.crypto_type} @ ${order.price_fiat} USD`}
                </span>
            </li>
        );
    }

}
