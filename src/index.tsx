import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux/configureStore';
import Router from 'router';
import { history } from './redux/configureStore';



const store = configureStore(() => {

    render(
        <Provider store={store}>
            <Router history={history} />
        </Provider>, document.getElementById('app')
    );

});