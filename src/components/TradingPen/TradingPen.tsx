import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import { getLocalizedText } from 'lang';
import { OrderAction, SupportedCurrencies } from 'businessLogic/model';
import IconButton from 'components/common/core/IconButton';
import TradingBox from './TradingBox';


export interface TradingPenProps {
    className?: string;
    exchanges?: string[];
    selectedCurrency: SupportedCurrencies;
    sendNewOrderCommand(command: OrderAction);
}

export interface TradingPenState {
    collapsed?: boolean;
}

export default class TradingPen extends React.Component<TradingPenProps, TradingPenState> {

    constructor(props) {
        super(props);
        this.state = { collapsed: false };
        this.togglePen = this.togglePen.bind(this);
    }

    togglePen() {
        this.setState({ collapsed: !this.state.collapsed });
    }

    render() {
        const isCollapsed = this.state.collapsed;
        return (
            <div className={cx(styles.tradingPen, { collapsed: isCollapsed })} >

                <div className={cx(styles.toggle, { collapsed: isCollapsed })}>
                    <IconButton id='toggle_navbar_btn' onClick={this.togglePen} iconName={isCollapsed ? 'chevron_right' : 'chevron_left'} className={styles.icon} />
                </div>

                <div className={cx(styles.container, { collapsed: isCollapsed })}>

                    <span onClick={this.togglePen} className={cx(styles.header, { collapsed: isCollapsed })}>Trading Pen</span>

                    {!isCollapsed &&
                        <div className={styles.tradingBx}>
                            <TradingBox {...this.props} />
                        </div>
                    }

                </div>

            </div>
        );
    }
}
