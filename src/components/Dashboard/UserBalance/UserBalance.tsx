import * as React from 'react';


interface BalanceProps {
    // usd: string;
    // btc: string;
    userBalance: object;
}

export default class Balance extends React.Component<BalanceProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
               {/*  <div>USD: {this.props.usd}</div>
                <div>BTC: {this.props.btc}</div> */}
            </div>
            );
    }
}