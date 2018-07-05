import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import { ExchangeOrderBook, Order } from 'businessLogic/model';
import { getLocalizedText } from 'lang';
import OrderItem from './OrderItem';

export interface ExchangeDataProps {
    orderBook: ExchangeOrderBook;
}

export default class ExchangeData extends React.Component<ExchangeDataProps, any> {

    constructor(props: ExchangeDataProps) {
        super(props);
    }

    render() {

        const naText = getLocalizedText('not_available');

        if (!this.props.orderBook) return naText;

        const { lastPrice, averageSpread, currentSpread } = this.props.orderBook;

        return (
            <div className={styles.exchangeData}>
                {this.renderOrders('asks')}

                <div className={styles.info}>
                    <h4 className={styles.spreadHeader}>{getLocalizedText('spread')}</h4>
                    <div className={styles.infoItem}>
                        <span >{getLocalizedText('current')}</span>
                        <span>{currentSpread.toFixed(2)}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span>{getLocalizedText('average')}</span>
                        <span>
                            {averageSpread ? averageSpread : naText}
                        </span>
                    </div>
                    <div className={styles.infoItem}>
                        <span>{getLocalizedText('last')}</span>
                        <span className={cx({ lastPricePos: lastPrice && lastPrice.price >= 0 }, { lastPriceNeg: lastPrice && lastPrice.price < 0 })}>
                            {lastPrice ?
                                `${lastPrice.price.toFixed(2)} ${new Date(lastPrice.time).toLocaleTimeString()}`
                                :
                                naText
                            }
                        </span>
                    </div>
                </div>

                {this.renderOrders('bids')}
            </div>
        );
    }

    renderOrders(type: 'asks' | 'bids') {
        if (!this.props.orderBook) return;
        const orders = this.props.orderBook[type];
        return (
            <div className={styles[type]}>
                <h4 className={styles.header}>{`${this.props.orderBook.exchange} ${getLocalizedText(type)}`}</h4>
                {_.map(orders, (order: Order, index) =>
                    <OrderItem key={`${index}-${order.source}-${order.size}-${order.price}`} order={order} showSource={this.props.orderBook.exchange === 'Unified'} />
                )}
            </div>
        );
    }

}