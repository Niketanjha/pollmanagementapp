// function* handleLogin(action){
//     try{
//         const response=yield call(axiosCall,"get",
//         `/login?username=${action.payload.name}&password=${action.payload.password}`
//         );
//         if(response.data.error === 0) {
//             localStorage.setItem("token",response.data.token);
//             localStorage.setItem("userName",action.payload.name );
//             yield put(loginSuccess(response.data,action.payload));
//         } 
//         else{
//             yield put(loginError(response.data,action.payload));
//         }
//     } 
//     catch (e) {
//         console.log(e);
//     }
// }