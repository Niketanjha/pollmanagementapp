import jwt from 'jwt-decode';

const intialStateAllUsers={
    data:[],
    isLoading:false,
    isSuccess:false,
    isFail:false
}
export function fetchAllUsersReducer(state=intialStateAllPoll,action){
    switch(action.type){
        case "FETCH_ALL_USER_REQUEST":{
            return {...state}
        }
        case "SET_USER_LOADING_TRUE":{
            return {...state,
                isLoading:true
            }
        }
        case "ALL_USER_REQUEST_SUCCESS":{
            console.log(action.payload);
            return{
                ...state,
            isLoading:false,
            data:action.payload}
        }
        default:
            return {...state}
    }
}


const intialStateAllPoll={
    data:[],
    isLoading:false,
    isSuccess:false,
    isFail:false
}
export function fetchAllPollReducer(state=intialStateAllPoll,action){
    switch(action.type){
        case "FETCH_ALL_POLL_REQUEST":{
            return {...state}
        }
        case "SET_POLL_LOADING_TRUE":{
            return {...state,
                isLoading:true
            }
        }
        case "ALL_POLL_REQUEST_SUCCESS":{
            console.log(action.payload);
            return{
                ...state,
            isLoading:false,
            data:action.payload}
        }
        default:
            return {...state}
    }
}

const intialStateSinglePoll={
    id:"60d57b0e2ebaad0015c44f4c",
    viewRequestLoading:false,
    viewRequestSucess:false,
    data:{},
}
export function singlePollReducer(state=intialStateSinglePoll,action){
    switch(action.type){
        case "SET_ID":{
            return {...state,
                    id:action.payload}
        }
        case "VIEW_POLL_API_REQUEST":{
            return {...state}
        }
        case "VIEW_REQUEST_SUCCESS":{
            return {...state,
                    viewRequestLoading:false,
                    viewRequestSucess:true,
                    data:action.payload}
        }
        case "VIEW_REQUEST_LOADING":{
            return {...state,
                    viewRequestLoading:true,
                    id:action.payload
                }
        }
        case "VIEW_REQUEST_FAIL":{
            return {...state,
                    viewRequestSucess:action.payload}
        }
        case "VOTE_REQUEST_LOADING":{
            return {
                ...state,
                viewRequestLoading:true,
            }
        }
        case "VOTE_REQUEST_API_CALL":{
            return {...state}
        }
        case "VOTE_REQUEST_SUCCESS":{
            return {...state,
                    viewRequestLoading:false,
                    voteRequestSuccess:true,
                }
        }
        default:
            return state;
    }
}

const intialState={
    isToken:localStorage.getItem("token")?true:false,
    token:localStorage.getItem("token")?localStorage.getItem("token"):'',
    role:localStorage.getItem("token")?jwt(localStorage.getItem("token")).role:'',
    name:localStorage.getItem("token")?jwt(localStorage.getItem("token")).username:'',
    isLoading:false,
    isSuccess:localStorage.getItem("token")?true:false,
    isError:false,
    data:{}
}

export function loginStatusReducer(state=intialState,action){
    switch(action.type){
        case "LOGIN_LOADING":{
            return{
                ...state,
                isLoading:true,
            }
        }
        case "LOGIN_REQUEST":{
            return{
                ...state,
                isError:false,
            }
        }
        case "SET_TOKEN":
            return{
                ...state,
                token:localStorage.getItem("token")
            }
        case 'LOGIN_SUCCESS':{
            return{
                ...state,
                isSuccess:true,
                isLoading:false,
                data:action.payload,
                token:action.payload.token,
                role:jwt(action.payload.token).role,
                name:jwt(action.payload.token).username,
            }
        }
        case 'LOG_OUT':{
            return{...state,
                    isSuccess:false,
                    isError:false,
                }
        }
        case 'LOGIN_FAIL':{
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        }
        default:
            return state; 
    }
}
