import * as React from 'react';
const styles = require('./styles.scss');


interface BalanceProps {
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
                    <div className={styles.balanceItem} key={key}>
                        <span className={styles.asset}>{`${key.toUpperCase()}:`}</span>
                        <span className={styles.value}>{this.props.userBalance[key]}</span>
                    </div>
                 ))}
            </div>
            );
    }
}