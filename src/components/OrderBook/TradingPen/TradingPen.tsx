import * as React from 'react';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import { getLocalizedText } from 'lang';
import { OrderAction, SupportedCurrencies } from 'businessLogic/model';
import Sidebar from 'components/common/containers/Sidebar';
import TradingBox from './TradingBox';


export interface TradingPenProps {
    className?: string;
    exchanges?: string[];
    selectedCurrency: SupportedCurrencies;
    sendNewOrderCommand(command: OrderAction);
}

export default class TradingPen extends React.Component<TradingPenProps, any> {

    render() {
        const { className, ...otherProps } = this.props;
        return (
            <Sidebar className={cx(styles.tradingPen, className)} header='Trading Pen' align='left' collapsible>
                <TradingBox {...otherProps} />
            </Sidebar>
        );
    }
}
