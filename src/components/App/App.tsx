import * as React from 'react';
import { connect } from 'react-redux';
const styles = require('./styles.scss');
import Header from './Header';

class App extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.app}>

                <Header />

                <div className={styles.content}>
                </div>

                <footer>
                    For support please contact:<a className={styles.supportLink} href='mailto:support@bitmaintech.com?Subject=Live%20Order%20Book%20-%20Support' target='_top'>support@bitmaintech.com</a>
                </footer>
            </div>
        );
    }
}

export default connect()(App);