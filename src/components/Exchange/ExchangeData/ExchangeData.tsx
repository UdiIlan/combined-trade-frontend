import * as React from 'react';
import * as _ from 'lodash';
const styles = require('./styles.scss');
import { ExchangeOrderBook, Order } from 'businessLogic/model';
import { getLocalizedText } from 'lang';

export interface ExchangeDataProps {
    orderBook: ExchangeOrderBook;
}

export default class ExchangeData extends React.Component<ExchangeDataProps, any> {

    constructor(props: ExchangeDataProps) {
        super(props);
    }

    render() {
        return (
            <div className={styles.exchangeData}>
                {this.renderOrders('asks')}
                <div className={styles.info}></div>
                {this.renderOrders('bids')}
            </div>
        );
    }


    // renderAsks() {
    //     if (!this.props.orderBook) return;
    //     const asks = this.props.orderBook.asks;
    //     return (
    //         <div className={styles.asks}>
    //             <h4>{`${this.props.orderBook.exchange} ${getLocalizedText('asks')}`}</h4>
    //             {_.map(asks, (ask: Order, index) => <span key={index} className={styles.ask}>{`${ask.size} ${getLocalizedText('buy_at')} ${ask.price}`}</span>)}
    //         </div>
    //     );
    // }

    // renderBids() {
    //     if (!this.props.orderBook) return;
    //     const bids = this.props.orderBook.bids;
    //     return (
    //         <div className={styles.bids}>
    //             <h4>{`${this.props.orderBook.exchange} ${getLocalizedText('bids')}`}</h4>
    //             {_.map(bids, (bid: Order, index) => <span key={index} className={styles.bid}>{`${bid.size} ${getLocalizedText('buy_at')} ${bid.price}`}</span>)}
    //         </div>
    //     );
    // }

    renderOrders(type: 'asks' | 'bids') {
        if (!this.props.orderBook) return;
        const orders = this.props.orderBook[type];
        return (
            <div className={styles[type]}>
                <h4 className={styles.header}>{`${this.props.orderBook.exchange} ${getLocalizedText(type)}`}</h4>
                {_.map(orders, (order: Order, index) => <span key={index} className={styles.order}>{`${order.size.toFixed(2)} ${getLocalizedText('buy_at')} ${order.price.toFixed(2)}`}</span>)}
            </div>
        );
    }

}