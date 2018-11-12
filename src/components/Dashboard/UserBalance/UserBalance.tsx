import * as React from 'react';
const styles = require('./styles.scss');
import * as _ from 'lodash';


interface BalanceProps {
    userBalance: object;
}

export default class Balance extends React.Component<BalanceProps, any> {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps: BalanceProps, nextState) {
        return !_.isEqual(this.props, nextProps);
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