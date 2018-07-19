import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import { getLocalizedText } from 'lang';
import { OrderActionStatus } from 'businessLogic/model';
import Sidebar from 'components/common/containers/Sidebar';
import IconButton from 'components/common/core/IconButton';
import OrderStatusItem from './OrderStatusItem';

import Badge from '@material-ui/core/Badge';

export interface OrdersPenProps {
    orders?: OrderActionStatus[];
    className?: string;
}

export default class OrdersPen extends React.Component<OrdersPenProps, any> {

    private sidebar: Sidebar;

    componentWillReceiveProps(nextProps) {
        if (!!this.props.orders && this.props.orders.length < nextProps.orders.length) {
            this.sidebar.open();
        }
    }

    render() {
        const { className, orders, ...otherProps } = this.props;
        return (
            <Sidebar
                ref={(sidebar) => this.sidebar = sidebar}
                className={cx(styles.ordersPen, className)}
                header='Order Status'
                collapsedItems={<Badge className={styles.badge} color='primary' badgeContent={orders ? orders.length : 0}><IconButton className={styles.badgeIco} iconName='receipt' onClick={() => this.sidebar.open()} /> </Badge>}
                align='right'
                collapsible>
                {this.renderOrders()}
            </Sidebar>
        );
    }

    renderOrders() {
        return (
            <ul className={styles.orderList}>
                {_.map(this.props.orders, (item: OrderActionStatus) => <OrderStatusItem order={item} key={`${item.exchange}_${item.exchange_id}`} />)}
            </ul>
        );
    }
}
