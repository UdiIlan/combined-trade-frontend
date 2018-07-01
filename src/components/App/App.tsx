import * as React from 'react';
import { connect } from 'react-redux';
const styles = require('./styles.scss');
import Header from './Header';
import { SupportedLanguages, getLocalizedText } from 'lang';
import { sesLanguage } from './redux/actions';

export interface AppProps {
    currentLang: SupportedLanguages;
    sesLanguage(newLang: SupportedLanguages);
}

class App extends React.Component<AppProps, any> {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.sesLanguage(this.props.currentLang);
    }

    render() {
        return (
            <div className={styles.app}>

                <Header currentLang={this.props.currentLang} sesLanguage={this.props.sesLanguage} />

                <div className={styles.content}>
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
        currentLang: state.app.language
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sesLanguage: (newLang: SupportedLanguages) => dispatch(sesLanguage(newLang))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);