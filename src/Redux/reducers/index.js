import {combineReducers} from 'redux';
import {loginStatusReducer,tokenReducer} from './reducers';

export default combineReducers(
    {loginStatusReducer,tokenReducer}
);