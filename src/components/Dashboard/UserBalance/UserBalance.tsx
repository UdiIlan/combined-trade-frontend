import * as React from 'react';


interface BalanceProps {
    // usd: string;
    // btc: string;
    userBalance: object;
    getUserBalance();
}

export default class Balance extends React.Component<BalanceProps, any> {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getUserBalance();
    }

    render() {
        return (
            <div>
                <h1>My Balance</h1>
                <div>
                {Object.keys(this.props.userBalance).map(key => (
                    <p> {key} {this.props.userBalance[key]} </p>
                 ))}
                </div>
            </div>
            );
    }
}