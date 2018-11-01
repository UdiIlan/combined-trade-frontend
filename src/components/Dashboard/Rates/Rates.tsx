import * as React from 'react';


interface RatesProps {
    bch: string;
    btc: string;
    eth: string;
}

export default class Rates extends React.Component<RatesProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Rates</h1>
                <div>BTC: {this.props.btc}</div>
                <div>BCH: {this.props.bch}</div>
                <div>ETH: {this.props.eth}</div>
            </div>
            );
    }
}