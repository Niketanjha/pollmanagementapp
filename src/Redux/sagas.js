import {takeLatest,call,put,select} from 'redux-saga/effects';
import axios from 'axios';
import jwt from 'jwt-decode';

export function* watcherSaga(){
    yield takeLatest("LOGIN_REQUEST",loginWorkerSaga);
    yield takeLatest("VIEW_POLL_API_REQUEST",viewPollSaga);
    yield takeLatest("FETCH_ALL_POLL_REQUEST",allPollSaga);
    yield takeLatest("FETCH_ALL_USER_REQUEST",allUsersSaga);
    yield takeLatest("VOTE_REQUEST_API_CALL",voteRequestSaga);
}
async function voteRequestApiCall(text,id){
    let token=localStorage.getItem("token");
    let headers={access_token:token};
    const response=await axios.post(`https://secure-refuge-14993.herokuapp.com/do_vote?id=${id}&option_text=${text}`,{},{headers:headers})
    console.log(response);
    return response; 
}

function *voteRequestSaga(action){
    let text=action.payload.text;
    let id=action.payload.id;
    console.log(text,id,action);
    try{
        const response=yield call(voteRequestApiCall(text,id));
        console.log(response);
        if(response.data.error===0){
            console.log(response.data.data);
            yield put({type:"VOTE_REQUEST_SUCCESS",payload:true});
        }
    }
    catch(error){
        console.log(error);
    }
}


async function requestAllUsers(){
    const response=await axios.get("https://secure-refuge-14993.herokuapp.com/list_users");
    console.log(response);
    return response;
}
function* allUsersSaga(){
    try{
        const response=yield call(requestAllUsers);
        if(response.data.error===0){
            console.log(response.data.data)
            yield put({type:"ALL_USER_REQUEST_SUCCESS",payload:response.data.data});
        }
    }
    catch(error){
        console.log(error);
    }
}


async function requestAllPoll(){
    const response=await axios.get("https://secure-refuge-14993.herokuapp.com/list_polls");
    console.log(response);
    return response;
}

function* allPollSaga(){
    try{
        const response=yield call(requestAllPoll);
        if(response.data.error===0){
            console.log(response.data.data)
            yield put({type:"ALL_POLL_REQUEST_SUCCESS",payload:response.data.data});
        }
    }
    catch(error){
        console.log(error);
    }
}

async function requestSinglePoll(id){
 console.log(id);
 const response= await axios.get(`https://secure-refuge-14993.herokuapp.com/list_poll?id=${id}`)
 return response.data;
}

function* viewPollSaga(action){
    try{
        console.log(action.payload);
        const response=yield call(requestSinglePoll,action.payload);
        if (response) {
            yield put({type:"VIEW_REQUEST_SUCCESS",payload:response.data});
          }
    }
    catch(error){
        console.log(error,"error");
        yield put({type:"VIEW_REQUEST_FAIL",payload:false});
    }
}


async function loginFunction(cred){
    console.log(cred);
    const response=await axios.get(`https://secure-refuge-14993.herokuapp.com/login?username=${cred.userName}&password=${cred.password}`);
    console.log(response);
    return response; 
}

function *loginWorkerSaga(action){
    try{
        const response=yield call(loginFunction,action.payload);
        if(response.data.error===0){
            console.log(response);
            console.log("token decoded",jwt(response.data.token));
            localStorage.setItem("token",response.data.token);
            yield put({type:"LOGIN_SUCCESS",payload:response.data});
        }
        else if(response.data.error===1){
            yield put({type:"LOGIN_FAIL",payload:true});
        }
        
    }
    catch(error){
        console.log(error)
        yield put({type:"LOGIN_FAIL",payload:true});
    }
}
