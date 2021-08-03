function getLocalStorage(){
    const token=localStorage.getItem("token");
    if(token==="" || token===null){
      return " ";
    }
    else{
      console.log(token);
      return (token); 
    }
}
function getLoginStatus(){
    const token=localStorage.getItem("token");
    if(token==="" || token===null){
        return false;
    }
    else{
        return true; 
    }
}

export function loginStatusReducer(state=getLoginStatus(),action){
    switch(action.type){
        case "SET_LOGIN_STATUS":
            state=action.payload;
            return state;
        default:
            return state; 
    }
}
export function tokenReducer(state=getLocalStorage(),action){
    switch(action.type){
        case "SET_TOKEN":
            state=action.payload;
            return state;
        default:
            return state; 
    }
}
 