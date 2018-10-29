import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createFilter from 'redux-persist-transform-filter';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createHashHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import rootSaga from './sagas';
import rootReducer from './reducers';

export const history = createHashHistory();

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);

const appReducer = createFilter('app', ['language', 'currency', 'theme']);
const orderBookReducer = createFilter('orderBook', ['exchangesStatus']);
const persistConfig = {
    key: 'app',
    storage: storage,
    whitelist: ['app', 'orderBook'],
    transforms: [appReducer, orderBookReducer]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


export default function configureStore(cb) {
    let store;

    if (process.env.NODE_ENV === 'production') {
        console.debug('Running on production environments');
        store = createStore(connectRouter(history)(persistedReducer), {}, compose(middleware, f => f));
    }
    else {
        console.debug('Running on dev environments');
        const devtools: any = window['devToolsExtension'] ? window['devToolsExtension']() : (f: any) => f; // add support for Redux dev tools

        store = createStore(connectRouter(history)(persistedReducer), {}, compose(middleware, devtools));
    }

    sagaMiddleware.run(rootSaga);

    if (process.env.NODE_ENV !== 'production' && module['hot']) {
        // Enable Webpack hot module replacement for reducers
        module['hot'].accept('./reducers.ts', () => {
            const nextReducer = require('./reducers.ts').default;
            store.replaceReducer(nextReducer);
        });
    }


    persistStore(store, null, cb);
    return store;
}