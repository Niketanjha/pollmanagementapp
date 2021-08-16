import {createStore,applyMiddleware,compose} from 'redux';
import reducer from './reducers/index';

import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react';     

import {watcherSaga} from './sagas';

const sagaMiddleware=createSagaMiddleware();

let store=createStore(reducer,compose(applyMiddleware(sagaMiddleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

sagaMiddleware.run(watcherSaga); 

// store.subscribe(()=>console.log(store.getState())); 

export default store; 