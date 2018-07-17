
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { history } from 'redux/configureStore';
import App from 'components/App';

export default () => {
    return (
        <ConnectedRouter history={history}>
            <Route component={App} />
        </ConnectedRouter>);
};