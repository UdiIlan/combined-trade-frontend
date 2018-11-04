import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import bmTheme from 'themes';
const styles = require('./styles.scss');
import Header from './Header';
import { SupportedLanguages } from 'lang';
import { SupportedCurrencies, AppTheme } from 'businessLogic/model';
import { sesLanguage, setCurrency, resetToast, setTheme, login, logout } from './redux/actions';
import Login from 'components/Login';
import OrderBook from 'components/OrderBook';
import Dashboard from 'components/Dashboard';
import ReportManager from 'components/ReportManager';
import { default as Toast, ToastProps } from 'components/common/core/Toast';
import { isNull } from 'util';
import EnsureLogin from './EnsureLogin';
import { th } from 'date-fns/esm/locale';

export interface AppProps {
    currentLang: SupportedLanguages;
    currentCurrency: SupportedCurrencies;
    toast?: ToastProps;
    theme: AppTheme;
    userName: String;
    wrongUserDetails?: boolean;
    sesLanguage(newLang: SupportedLanguages);
    setCurrency(newCurrency: SupportedCurrencies);
    resetToast();
    setTheme(theme: AppTheme);
    doLogin(userName: string, password: string);
    doLogout();

}

export interface AppState {
    toast?: ToastProps;
}

class App extends React.Component<AppProps, AppState> {

    constructor(props) {
        super(props);
        this.state = { toast: props.toast };
        this.setNewCurrency = this.setNewCurrency.bind(this);
    }

    private orderBook;

    componentWillMount() {
        this.props.setTheme(this.props.theme);
        this.props.sesLanguage(this.props.currentLang);
    }

    componentWillReceiveProps(nextProps: AppProps) {
        if (!!nextProps.toast && !_.isEqual(this.state.toast, nextProps.toast)) {
            this.setState({ toast: nextProps.toast }, nextProps.resetToast);
        }
        else if (!this.props.toast && !nextProps.toast) {
            this.setState({ toast: undefined });
        }
    }

    setNewCurrency(newCurrency: SupportedCurrencies) {
        this.props.setCurrency(newCurrency);
    }

    componentWillUpdate() {
        if (!!this.orderBook && isNull(this.orderBook.getWrappedInstance())) {
            this.orderBook = undefined;
        }
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
                        theme={this.props.theme}
                        setTheme={this.props.setTheme}
                        manageExchanges={this.orderBook ? this.orderBook.getWrappedInstance().manageExchanges : undefined}
                        userLogout={this.props.doLogout}
                    />

                    <div className={styles.content}>
                        <Switch>
                            <Route path='/login'  render={(props) => <Login userLogin={this.props.doLogin} wrongUserDetails={this.props.wrongUserDetails}/>} />

                            <EnsureLogin userName={this.props.userName}>
                                <Switch>
                                    <Route exact path='/' render={(props) => <Dashboard />} />
                                    <Route path='/trades' render={(props) => {
                                        return (
                                            <OrderBook ref={(orderBook: any) => {
                                                if (!orderBook || isNull(orderBook)) return;
                                                if (!this.orderBook) {
                                                    this.orderBook = orderBook;
                                                    this.forceUpdate();
                                                }
                                            }} />
                                        );
                                    }}
                                    />
                                    <Route path='/reports' component={ReportManager} />

                                    <Route path='*' render={(props) => <div>NOT FOUND!</div>} />
                                </Switch>
                            </EnsureLogin>

                        </Switch>

                    </div>

                    {!!this.state.toast && <Toast intent={this.state.toast.intent} message={this.state.toast.message} open={true} />}

                </div>

            </MuiThemeProvider >
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentLang: _.get(state, 'app.language', 'en_us'),
        currentCurrency: _.get(state, 'app.currency', 'BTC'),
        toast: _.get(state, 'app.toast', undefined),
        theme: _.get(state, 'app.theme', 'light'),
        userName: _.get(state, 'app.userName', undefined),
        wrongUserDetails: _.get(state, 'app.wrongUserDetails', false)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sesLanguage: (newLang: SupportedLanguages) => dispatch(sesLanguage(newLang)),
        setCurrency: (newCurrency: SupportedCurrencies) => dispatch(setCurrency(newCurrency)),
        resetToast: () => dispatch(resetToast()),
        setTheme: (theme: AppTheme) => {
            const prevTheme = `theme_${theme === 'dark' ? 'light' : 'dark'}`;
            const newTheme = `theme_${theme}`;
            document.body.classList.remove(prevTheme);
            document.body.classList.add(newTheme);
            dispatch(setTheme(theme));
        },
        doLogin: (userName: string, password: string) => dispatch(login(userName, password)),
        doLogout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);