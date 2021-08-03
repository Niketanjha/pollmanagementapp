import React, {useState} from 'react';
import axios from 'axios'; 

import NavBar from './NavBar';
import TableAll from './Table';

import {useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import {setLoginStatus} from '../Redux/actions'
import { useHistory } from 'react-router-dom';

function Dashboard(){
    const dispatch=useDispatch()
    const loginStatus=useSelector((state)=>state.loginStatusReducer);
    const history=useHistory();

    // async function listUser(){
    //     await axios.get('https://secure-refuge-14993.herokuapp.com/list_users')
    //     .then((res)=>{
    //         return res.data.data;
    //     })
    // }
 
    function logOut(){
        dispatch(setLoginStatus(false));
        history.push('/login')
        localStorage.removeItem("token");
    }
    if(loginStatus){
        return(
            <>
                <Button>User List</Button>
                
            </>
        );
    }
    else{
        return(
            <>
                <p>You are not logged in. 
                    <a href="/login">Kindly log in</a>
                </p>
            </>
        )
    }
    
}
export default Dashboard;