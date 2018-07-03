import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
const styles = require('./styles.scss');
import Header from './Header';
import { SupportedLanguages, getLocalizedText } from 'lang';
import { SupportedCurrencies } from 'businessLogic/model';
import { sesLanguage, setCurrency } from './redux/actions';
import OrderBook from 'components/OrderBook';

export interface AppProps {
    currentLang: SupportedLanguages;
    currentCurrency: SupportedCurrencies;
    sesLanguage(newLang: SupportedLanguages);
    setCurrency(newCurrency: SupportedCurrencies);
}

class App extends React.Component<AppProps, any> {

    constructor(props) {
        super(props);
        this.setNewCurrency = this.setNewCurrency.bind(this);
    }

    componentWillMount() {
        this.props.sesLanguage(this.props.currentLang);
    }

    setNewCurrency(newCurrency: SupportedCurrencies) {
        this.props.setCurrency(newCurrency);
    }

    render() {
        return (
            <div className={styles.app}>

                <Header
                    currentCurrency={this.props.currentCurrency}
                    currentLang={this.props.currentLang}
                    sesLanguage={this.props.sesLanguage}
                    setCurrency={this.setNewCurrency}
                />

                <div className={styles.content}>
                    {this.props.children}
                    <OrderBook />
                </div>

                <footer>
                    {getLocalizedText('supportLink')}<a className={styles.supportLink} href='mailto:support@bitmaintech.com?Subject=Live%20Order%20Book%20-%20Support' target='_top'>support@bitmaintech.com</a>
                </footer>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentLang: _.get(state, 'app.language', 'en_us'),
        currentCurrency: _.get(state, 'app.currency', 'BTC')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sesLanguage: (newLang: SupportedLanguages) => dispatch(sesLanguage(newLang)),
        setCurrency: (newCurrency: SupportedCurrencies) => dispatch(setCurrency(newCurrency))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);