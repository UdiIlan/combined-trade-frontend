import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import { getLocalizedText } from 'lang';
import { OrderAction, SupportedCurrencies } from 'businessLogic/model';
import Sidebar from 'components/common/containers/Sidebar';

export interface OrdersPenProps {
    orders: OrderAction[];
    className?: string;
}

export default class OrdersPen extends React.Component<OrdersPenProps, any> {

    private sidebar: Sidebar;

    componentWillReceiveProps(nextProps) {
        if (this.props.orders.length < nextProps.orders.length) {
            this.sidebar.open();
        }
    }

    render() {
        const { className, ...otherProps } = this.props;
        return (
            <Sidebar ref={(sidebar) => this.sidebar = sidebar} className={cx(styles.tradingPen, className)} header='Orders Pen' align='right' collapsible>
                {this.renderOrders()}
            </Sidebar>
        );
    }

    renderOrders() {
        return (
            <ul className={styles.orderList}>
                {_.map(this.props.orders, (item: OrderAction, index) => <li key={index}>{item.size_coin}@{item.price_fiat} ({item.status})</li>)}
            </ul>
        );
    }
}
