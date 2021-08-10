export const setAllPollsLoading=(action)=>{
    return {type:"SET_POLL_LOADING_TRUE",payload:action}
}
export const fetchAllPolls=(action)=>{
    return {type:"FETCH_ALL_POLL_REQUEST",payload:action}
}


export const setAllUserLoading=(action)=>{
    return {type:"SET_USER_LOADING_TRUE",payload:action}
}
export const fetchAllUserRequest=(action)=>{
    return {type:"FETCH_ALL_USER_REQUEST",payload:action}
}




export const setUniqueId=(action)=>{
    console.log("set id",action);
    return {type:"SET_ID",payload:action}
}

export const viewSinglePoll=(action)=>{
    console.log("viewpoll",action);
    return {type:"VIEW_POLL_API_REQUEST",payload:action}
}
export const setViewPollLoading=(action)=>{
    return {type:"VIEW_REQUEST_LOADING",payload:action}
}


export const loginRequest=(action)=>{
    return {type:"LOGIN_REQUEST",payload:action}
}
export const setLoginLoading=(action)=>{
    return {type:"LOGIN_LOADING",payload:action}
}

export const setLogout=(action)=>{
    return {type:"LOG_OUT",payload:action}
}
export const setToken=(action)=>{
    return {type:"SET_TOKEN",payload:action}
}