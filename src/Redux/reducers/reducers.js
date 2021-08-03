export function loginStatusReducer(state=false,action){
    switch(action.type){
        case "SET_LOGIN_STATUS":
            state=action.payload;
            return state;
        default:
            return state; 
    }
}
export function tokenReducer(state=null,action){
    switch(action.type){
        case "SET_TOKEN":
            state=action.payload;
            return state;
        default:
            return state; 
    }
}
 