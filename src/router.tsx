import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import App from 'components/App';

export default ({ history }) => {
    return (
        <ConnectedRouter history={history}>
            <Route component={App} />
        </ConnectedRouter>);
};