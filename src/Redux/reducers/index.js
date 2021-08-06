import {combineReducers} from 'redux';
import {loginStatusReducer,singlePollReducer} from './reducers';

export default combineReducers(
    {loginStatusReducer,singlePollReducer}
);