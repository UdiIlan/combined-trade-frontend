import * as React from 'react';


interface RatesProps {
    exchangeRates: object;
    getExchangeRates();
}

export default class Rates extends React.Component<RatesProps, any> {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getExchangeRates();
    }

    render() {
        return (
            <div>
                {Object.keys(this.props.exchangeRates).map(key => (
                    <h4>
                        {key.toUpperCase()}
                        <span>{': ' + this.props.exchangeRates[key]}</span>
                    </h4>
                 ))}
            </div>
            );
    }
}