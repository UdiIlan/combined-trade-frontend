import * as React from 'react';
const styles = require('./styles.scss');


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
            <div className={styles.balance}>
                {Object.keys(this.props.userBalance).map(key => (
                    <h4>
                        {key.toUpperCase()}
                        <span>{': ' + this.props.userBalance[key]}</span>
                    </h4>
                 ))}
            </div>
            );
    }
}