import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

require('styles/global.scss');
import configureStore from 'redux/configureStore';
import Router from 'routes';


const store = configureStore( () => {

    render(
        <Provider store={store}>
            <Router />
        </Provider>, document.getElementById('app')
    );

});