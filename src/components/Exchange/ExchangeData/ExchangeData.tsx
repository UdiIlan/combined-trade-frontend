import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);
import { ExchangeOrderBook, Order } from 'businessLogic/model';
import { getLocalizedText } from 'lang';
import OrderItem from './OrderItem';
import Spinner from 'components/common/core/Spinner';

export interface ExchangeDataProps {
    orderBook: ExchangeOrderBook;
}

export default class ExchangeData extends React.Component<ExchangeDataProps, any> {

    constructor(props: ExchangeDataProps) {
        super(props);
    }

    render() {

        const naText = getLocalizedText('not_available');

        if (!this.props.orderBook) return <div className={styles.loading}><Spinner size={20} /></div>;

        const { lastPrice, averageSpread, currentSpread } = this.props.orderBook;
        const isUnifiedEx = this.props.orderBook.exchange === 'Unified';

        return (
            <div className={styles.exchangeData}>
                {this.renderOrders('asks')}

                <div className={styles.info}>
                    <h4 className={styles.spreadHeader}>{getLocalizedText('spread')}</h4>
                    <div className={styles.infoItem}>
                        <span className={cx(
                            { valuePos: isUnifiedEx && currentSpread && currentSpread >= 0 },
                            { valueNeg: isUnifiedEx && currentSpread && currentSpread < 0 })} >
                            {getLocalizedText('current')}
                        </span>
                        <span>{currentSpread ? currentSpread.toFixed(2) : naText}</span>
                    </div>

                    {!isUnifiedEx &&
                        [
                            <div key='average' className={styles.infoItem}>
                                <span>{getLocalizedText('average')}</span>
                                <span>
                                    {averageSpread ? averageSpread : naText}
                                </span>
                            </div>,
                            <div key='last' className={styles.infoItem}>
                                <span>{getLocalizedText('last')}</span>
                                <span className={cx({ valuePos: lastPrice && lastPrice.price >= 0 }, { valueNeg: lastPrice && lastPrice.price < 0 })}>
                                    {lastPrice ?
                                        `${lastPrice.price.toFixed(2)} ${new Date(lastPrice.time).toLocaleTimeString()}`
                                        :
                                        naText
                                    }
                                </span>
                            </div>
                        ]
                    }
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