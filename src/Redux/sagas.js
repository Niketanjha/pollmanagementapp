import {takeLatest,call,put,select} from 'redux-saga/effects';
import axios from 'axios';
import { setUniqueId } from './actions';
import { useSelector } from 'react-redux';
import { viewSinglePoll } from './actions';

// const latestId=useSelector((state)=>state.singlePollReducer.id);
// const latestId=select();


export function* watcherSaga(){
    yield takeLatest("API_CALL_REQUEST",workerSaga);
    yield takeLatest("VIEW_REQUEST_SUCCESS",viewPollSaga);
}
async function requestSinglePoll(id){
 console.log(id);
 const response= await axios.get(`https://secure-refuge-14993.herokuapp.com/list_poll?id=${id}`)
 console.log(response.data);
 return response.data;
//  then((response)=>{console.log(response.data);return response.data});
}

function* viewPollSaga(action){
    try{
        console.log(action.payload);
        const response=yield call(requestSinglePoll,action.payload);
        console.log(response,"response");
        // yield put({type:"VIEW_REQUEST_SUCCESS",payload:response})
        if (response) {
            console.log("before");
            yield put({type:"VIEW_REQUEST_SUCCESS",payload:response.data});
            console.log("after");
            // yield put(requestSinglePoll(response.data, action.payload));
          }
    }
    catch(error){
        console.log(error,"error");
        // yield put({type:"VIEW_REQUEST_FAIL",payload:false});
    }
}







function loginFunction(){
    return axios.get(`https://secure-refuge-14993.herokuapp.com/login?username=admin&password=admin`);
}

function *workerSaga(action){
    try{
        console.log("The login workersaga")
        const response=yield call(loginFunction(action.payload));
        const loginStatus=response
        yield put({type:"LOGIN_SUCCESS",loginStatus});
    }
    catch(error){
        yield put({type:"LOGIN_FAIL",error});
    }
}
