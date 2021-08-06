import {takeLatest,call,put} from 'redux-saga/effects';
import axios from 'axios';
import { setUniqueId } from './actions';
import { useSelector } from 'react-redux';

// const latestId=useSelector((state)=>state.singlePollReducer.id);

export function* watcherSaga(){
    yield takeLatest("API_CALL_REQUEST",workerSaga);
    yield takeLatest("VIEW_REQUEST_SUCCESS",viewPollSaga);
}
async function requestSinglePoll(id){
    console.log(id);
    await axios.get(`https://secure-refuge-14993.herokuapp.com/list_poll?id=${id}`).
    then((response)=>{console.log(response.data);return response.data});
}

function* viewPollSaga(action){
   const response =  requestSinglePoll(action.payload);
   console.log(response);
    try{
        const response=yield call(requestSinglePoll(action.payload));
        console.log(response,"response");
        yield put({type:"VIEW_REQUEST_SUCCESS",payload:response})
    }
    catch(error){
        console.log(error,"error");
        yield put({type:"VIEW_REQUEST_FAIL",payload:false});
    }
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
        yield put({type:"LOGIN_SUCCESS",loginStatus});
    }
    catch(error){
        yield put({type:"LOGIN_FAIL",error});
    }
}
