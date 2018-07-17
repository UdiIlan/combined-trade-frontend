import * as React from 'react';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import { getLocalizedText } from 'lang';
import { OrderAction, SupportedCurrencies } from 'businessLogic/model';
import Sidebar from 'components/common/containers/Sidebar';



export interface OrdersPenProps {
    className?: string;
}

export default class OrdersPen extends React.Component<OrdersPenProps, any> {

    render() {
        const { className, ...otherProps } = this.props;
        return (
            <Sidebar className={cx(styles.tradingPen, className)} header='Orders Pen' align='right' collapsible>
            </Sidebar>
        );
    }
}
