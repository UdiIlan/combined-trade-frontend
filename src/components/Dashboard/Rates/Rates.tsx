import * as React from 'react';
const styles = require('./styles.scss');


interface RatesProps {
    exchangeRates: object;
}

export default class Rates extends React.Component<RatesProps, any> {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                {Object.keys(this.props.exchangeRates).map(key => (
                    <div className={styles.rate} key={key}>
                        <span className={styles.asset}>{`${key.toUpperCase()}: `}</span>
                        <span className={styles.asset}>{`${this.props.exchangeRates[key]}$`}</span>
                    </div>
                 ))}
            </div>
            );
    }
}