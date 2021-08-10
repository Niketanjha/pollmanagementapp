import {combineReducers} from 'redux';
import {loginStatusReducer,singlePollReducer,fetchAllPollReducer,fetchAllUsersReducer} from './reducers';

export default combineReducers(
    {loginStatusReducer,singlePollReducer,fetchAllPollReducer,fetchAllUsersReducer}
);