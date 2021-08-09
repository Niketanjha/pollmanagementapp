export const setLoginRequest=(action)=>{
    return {type:"LOGIN_REQUEST",payload:action}
}



export const setUniqueId=(action)=>{
    console.log("set id",action);
    return {type:"SET_ID",payload:action}
}

export const viewSinglePoll=(action)=>{
    console.log("viewpoll",action);
    return {type:"VIEW_REQUEST_SUCCESS",payload:action}
}


export const loginRequest=(action)=>{
    return {type:"API_CALL_REQUEST",payload:action}
}
export const setLoginError=(action)=>{
    return {type:"LOGIN_SUCCESS",payload:action}
}
export const setLoginFail=(action)=>{
    return {type:"LOGIN_FAIL",payload:action}
}


export const setLoginStatus=(action)=>{
    return {type:"SET_LOGIN_STATUS", payload:action}
}
export const setToken=(action)=>{
    return {type:"SET_TOKEN",payload:action}
}