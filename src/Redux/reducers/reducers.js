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
