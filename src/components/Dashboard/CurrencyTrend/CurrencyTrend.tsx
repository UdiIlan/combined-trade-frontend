
import * as React from 'react';
import * as _ from 'lodash';
import LineGraph from 'components/common/Graphs/LineGraph';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);


interface CurrencyTrendProps {
    trendData: object[];
    getCurrencyTrend(currency: string);
}

export interface CurrencyTrendState {
    selectedTrend: string;
}

const btc = 'BTC/USD';
const bch = 'BCH/USD';
const eth = 'ETH/USD';


export default class CurrencyTrend extends React.Component<CurrencyTrendProps, CurrencyTrendState> {

    constructor(props) {
        super(props);
        this.state = { selectedTrend: btc };
    }

    shouldComponentUpdate(nextProps: CurrencyTrendProps, nextState) {
        return !_.isEqual(this.props, nextProps);
    }

    callOnClick(x: number, y: number) {
        alert(`${x} and ${y} pressed on graph`);
    }

    render() {
        return (
            <div className={styles.graph}>
                <div className={styles.currenciesContainer}>
                    <span onClick={(e) => this.selectTrend(btc)} className= {cx({selectedCurrency: this.state.selectedTrend === btc}, {currency: this.state.selectedTrend !== btc})}>{btc}</span>
                    <span onClick={(e) => this.selectTrend(bch)} className= {cx({selectedCurrency: this.state.selectedTrend === bch}, {currency: this.state.selectedTrend !== bch})}>{bch}</span>
                    <span onClick={(e) => this.selectTrend(eth)} className= {cx({selectedCurrency: this.state.selectedTrend === eth}, {currency: this.state.selectedTrend !== eth})}>{eth}</span>
                </div>
                <LineGraph className={styles.innerGraph} data={this.props.trendData} xTitle='time' yTitle='rate' onClick={this.callOnClick} dataType='time' graphStyle={{ opacityLevel: 0.5, color: 'cadetblue' }} />
            </div>
        );
    }


    selectTrend(trend) {
        this.props.getCurrencyTrend(trend);
        this.setState({ selectedTrend: trend });
    }


}