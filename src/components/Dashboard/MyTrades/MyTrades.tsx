import * as React from 'react';
import Table from '@material-ui/core/Table';
import * as _ from 'lodash';
import TradeItem from './TradeItem';
import { default as Grid, GridColumn } from 'components/common/dataLayouts/Grid';


export interface Trade {
    price: string;
    amount: string;
    type: string;
}

interface TradesProps {
    myTrades: Trade[];
}

export default class MyTrades extends React.Component<TradesProps, any> {
    constructor(props) {
        super(props);
    }

    render() { if (!this.props.myTrades) return;
        // const orders = this.props.orderBook[type];
        return (
            <div >
                <h4>{`Price  Amount  Type`}</h4>
                {_.map(this.props.myTrades, (trade: Trade, index) =>
                    <TradeItem trade={trade} />
                )}
            </div>
        );
        // let amount = this.props.myTrades.map((trade) => {return(
        //     <div>
        //         <div>
        //         {trade.price}       {trade.amount}      {trade.type}
        //         </div>
        //     </div>
        //     ); }
        //     );
        return (
            <div>
                <h1> Price      Amount      Type</h1>

            </div>
            );
    }
}