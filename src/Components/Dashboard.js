import React, {useState} from 'react';
import axios from 'axios'; 

import NavBar from './NavBar';
import TableAll from './Table';

import {useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

function Dashboard(){
    const dispatch=useDispatch()
    const loginStatus=useSelector((state)=>state.loginStatusReducer);
    const history=useHistory();
 
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