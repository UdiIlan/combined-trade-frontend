import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
import { Order } from 'businessLogic/model';
import { getLocalizedText } from 'lang';

export interface OrderItemProps {
    order: Order;
    showSource?: boolean;
}

export default class OrderItem extends React.Component<OrderItemProps, any> {

    constructor(props: OrderItemProps) {
        super(props);
    }

    shouldComponentUpdate(nextProps: OrderItemProps, nextState) {
        return !_.isEqual(this.props, nextProps);
    }

    render() {
        const { order, showSource } = this.props;
        return (
            <div className={styles.order}>
                <span className={styles.orderSize}>{order.size.toFixed(2)}</span>
                <span className={styles.orderAt} > {getLocalizedText('buy_at')} </span>
                <span className={styles.orderPrice}>{order.price.toFixed(2)}</span>
                {showSource && <span className={styles.orderSource}>{`(${order.source})`}</span>}
            </div>
        );
    }

}