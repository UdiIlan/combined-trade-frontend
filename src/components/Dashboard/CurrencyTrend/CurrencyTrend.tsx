
import * as React from 'react';
import IconButton from 'components/common/core/IconButton';
const styles = require('./styles.scss');
import * as _ from 'lodash';
import LineGraph from 'components/common/Graphs/LineGraph';


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
                    <span onClick={(e) => this.selectTrend(btc)} className={(this.state.selectedTrend === btc) ? `${styles.selectedCurrency}` : `${styles.currency}`}>{btc}</span>
                    <span onClick={(e) => this.selectTrend(bch)} className={(this.state.selectedTrend === bch) ? `${styles.selectedCurrency}` : `${styles.currency}`}>{bch}</span>
                    <span onClick={(e) => this.selectTrend(eth)} className={(this.state.selectedTrend === eth) ? `${styles.selectedCurrency}` : `${styles.currency}`}>{eth}</span>
                </div>
                <LineGraph data={this.props.trendData} xTitle='time' yTitle='rate' onClick = {this.callOnClick}/>
            </div>
        );
    }

    selectTrend(trend) {
         this.props.getCurrencyTrend(trend);
         this.setState({ selectedTrend: trend });
    }


}