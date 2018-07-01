import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

require('styles/global.scss');
import initialState from './redux/initialState';
import configureStore from './redux/configureStore';
import Router from './routes';


const store = configureStore(initialState, () => {

    render(
        <Provider store={store}>
            <Router />
        </Provider>, document.getElementById('app')
    );

});