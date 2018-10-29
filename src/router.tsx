
import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import App from 'components/App';
import { history } from './redux/configureStore';

export default () => {
    return (
        <ConnectedRouter history={history}>
            <Route component={App} />
        </ConnectedRouter>);
};