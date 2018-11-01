import * as React from 'react';


interface GraphProps {
    usd: string;
    btc: string;
}

export default class Graph extends React.Component<BalanceProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Your Balance</h1>
                <div>USD: {this.props.usd}</div>
                <div>BTC: {this.props.btc}</div>
            </div>
            );
    }
}