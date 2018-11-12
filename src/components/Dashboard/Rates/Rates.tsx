import * as React from 'react';
const styles = require('./styles.scss');
import * as _ from 'lodash';

interface RatesProps {
    exchangeRates: object;
}

export default class Rates extends React.Component<RatesProps, any> {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps: RatesProps, nextState) {
        return !_.isEqual(this.props, nextProps);
    }

    render() {
        return (
            <div className={styles.container}>
                {Object.keys(this.props.exchangeRates).map(key => (
                    <div className={styles.ratesContainer} key={key}>
                        <span className={styles.icon}><img src={require(`../../../assets/icons/${key.toLowerCase()}.svg`)}></img></span>
                        <span> {`${key.toUpperCase()} `}</span>
                        <span className={styles.rate}>{`${this.props.exchangeRates[key]}$`}</span>
                    </div>
                ))}
            </div>
        );
    }
}