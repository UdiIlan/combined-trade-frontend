import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import bmTheme from 'themes';
const styles = require('./styles.scss');
import Header from './Header';
import { SupportedLanguages, getLocalizedText } from 'lang';
import { SupportedCurrencies } from 'businessLogic/model';
import { sesLanguage, setCurrency } from './redux/actions';
import OrderBook from 'components/OrderBook';
import { default as Toast, ToastProps } from 'components/common/core/Toast';

export interface AppProps {
    currentLang: SupportedLanguages;
    currentCurrency: SupportedCurrencies;
    toast?: ToastProps;
    sesLanguage(newLang: SupportedLanguages);
    setCurrency(newCurrency: SupportedCurrencies);
}

class App extends React.Component<AppProps, any> {

    constructor(props) {
        super(props);
        this.setNewCurrency = this.setNewCurrency.bind(this);
    }

    private orderBook;

    componentWillMount() {
        this.props.sesLanguage(this.props.currentLang);
    }

    setNewCurrency(newCurrency: SupportedCurrencies) {
        this.props.setCurrency(newCurrency);
    }

    render() {
        return (
            <MuiThemeProvider theme={bmTheme}>
                <div className={styles.app}>

                    <Header
                        currentCurrency={this.props.currentCurrency}
                        currentLang={this.props.currentLang}
                        sesLanguage={this.props.sesLanguage}
                        setCurrency={this.setNewCurrency}
                        trade={this.orderBook ? this.orderBook.trade : undefined}
                    />

                    <div className={styles.content}>
                        {this.props.children}
                        <OrderBook ref={(orderBook: any) => {
                            if (!this.orderBook) {
                                this.orderBook = orderBook.getWrappedInstance();
                                this.forceUpdate();
                            }
                        }} />
                    </div>

                    {!!this.props.toast && <Toast intent={this.props.toast.intent} message={this.props.toast.message} open={true} />}

                    <footer>
                        {getLocalizedText('supportLink')}<a className={styles.supportLink} href='mailto:support@bitmaintech.com?Subject=Live%20Order%20Book%20-%20Support' target='_top'>support@bitmaintech.com</a>
                    </footer>
                </div>
            </MuiThemeProvider >
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentLang: _.get(state, 'app.language', 'en_us'),
        currentCurrency: _.get(state, 'app.currency', 'BTC'),
        toast: _.get(state, 'app.toast', undefined)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sesLanguage: (newLang: SupportedLanguages) => dispatch(sesLanguage(newLang)),
        setCurrency: (newCurrency: SupportedCurrencies) => dispatch(setCurrency(newCurrency))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);