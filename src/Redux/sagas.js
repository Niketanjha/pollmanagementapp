import {takeLatest,call,put} from 'redux-saga/effects';
import axios from 'axios';

export function *watcherSaga(){
    yield takeLatest("API_CALL_REQUEST",workerSaga);
}

function loginFunction(){
    return axios.get({
        method:'get',
        url:'https://secure-refuge-14993.herokuapp.com/login?username=admin&password=admin'
    });
}

function *workerSaga(){
    try{
        const response=yield call(loginFunction);
        const loginStatus=response
        yield put({type:"API_CALL_SUCESS",loginStatus});
    }
    catch(error){
        yield put({type:"API_CALL_FAILURE",error});
    }
}
