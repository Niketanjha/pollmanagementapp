import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import axios from 'axios';

import {call,put} from 'redux-saga/effects';
import { useDispatch, useSelector } from 'react-redux';
import {setToken,setLoginStatus} from '../Redux/actions'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [getStatus,setStatus]=useState(false);
  const [getName,setName]=useState();
  const [getPassword,setPassword]=useState();
  const loginStatus=useSelector((state=>state.loginStatusReducer.isSucess));
  const dispatch=useDispatch(); 
  const history=useHistory();
  
  
  function *requestLogin(){
    const token = yield call(axios.get(`https://secure-refuge-14993.herokuapp.com/login?username=${getName}&password=${getPassword}`));
    yield put({type:'SET_TOKEN',token});
  }
  async function requestSignIn(values){
    values.preventDefault();
    setStatus(getStatus=>setStatus(!getStatus));
    await axios.get(`https://secure-refuge-14993.herokuapp.com/login?username=${getName}&password=${getPassword}`)
    .then((res)=>{
      console.log(res,getStatus);
      if(res.data.error===0){  
        dispatch(setLoginStatus(true));
        history.push('/dashboard/home');
        localStorage.setItem("token",res.data.token);
      }
      else if(res.data.error===1){
        console.log(getName,getPassword);
        toast("Invalid Credentials");
        setStatus(getStatus=>setStatus(!getStatus));
      }
      // dispatch(setToken(res.data.token));
      
    })
    // .then((res)=>{console.log(res,getStatus);localStorage.setItem("token",res.data.token)})
    
    // setStatus(getStatus=>setStatus(!getStatus))
    // console.log(values.target);
    // await axios.get("https://secure-refuge-14993.herokuapp.com/login?username=admin&password=admin")
    // .then((res)=>{console.log(res,getStatus);localStorage.setItem("token",res.data.token)})
    // .then((getStatus)=>{console.log(getStatus);setStatus(!getStatus);}); 
    // console.log(localStorage.getItem("token"));
  }
  if(loginStatus){
    history.push('/dashboard/home')
    console.log(loginStatus);
    return(
      <>
        You are already login. 
      </>
    );
  }
  else{
    return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <ToastContainer />
          <Typography component="h1" variant="h3">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e)=>{setName(e.target.value)}}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={getStatus?true:false}
              className={classes.submit}
              onClick={requestSignIn}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body1">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}