
import * as React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import App from 'components/App';

export default () => {
    return (
        <Router>
            <Route component={App} />
        </Router>);
};