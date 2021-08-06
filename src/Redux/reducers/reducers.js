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
        case "VIEW_REQUEST_SUCCESS":{
            return {...state,
                    viewRequestLoading:false,
                    data:action.payload}
        }
        case "VIEW_REQUEST_LOADING":{
            return {...state,
                    viewRequestLoading:action.payload}
        }
        case "VIEW_REQUEST_FAIL":{
            return {...state,
                    viewRequestSucess:action.payload}
        }
        default:
            return state;
    }
}

const intialState={
    isToken:localStorage.getItem("token")?true:false,
    token:localStorage.getItem("token")?localStorage.getItem("token"):'',
    isLoading:false,
    isSuccess:false,
    isError:false,
    data:{}
}

export function loginStatusReducer(state=intialState,action){
    switch(action.type){
        case "LOGIN_REQUEST":{
            return{
                ...state,
                isLoading:true,
            }
        }
        case 'LOGIN_SUCCESS':{
            return{
                ...state,
                isSuccess:true,
                isLoading:false,
                data:{
                    action
                }
            }
        }
        case 'LOGIN_FAIL':{
            return{
                ...state,
                isError:true
            }
        }
        default:
            return state; 
    }
}
