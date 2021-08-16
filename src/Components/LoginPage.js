import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import { useDispatch, useSelector } from 'react-redux';
import {setLoginLoading} from '../Redux/actions'

import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

import {loginRequest} from '../Redux/actions'

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
  const dispatch=useDispatch(); 
  const history=useHistory();

  const [getStatus,setStatus]=useState(false);


  const [getName,setName]=useState();
  const [getPassword,setPassword]=useState();
  
  const loginStatus=useSelector((state=>state.loginStatusReducer.isSuccess));
  const loadingStatus=useSelector((state=>state.loginStatusReducer.isLoading));
  const loginError=useSelector((state=>state.loginStatusReducer.isError));
  console.log(loginStatus,"loginStatus");
  
  useEffect(() =>{
    if(loginStatus){
      toast("Login sucessfull");
      history.push('/dashboard/home');
    }
    
  },[loginStatus]);

  useEffect(() =>{
    if (loginError){
      toast("Invalid Credentials");
    }
  },[loginError])

  useEffect(()=>{
    
  },[loginStatus,loginError])


  function requestSignIn(values){
    values.preventDefault();
    dispatch(setLoginLoading(true));
    dispatch(loginRequest({userName:getName,password:getPassword}));
    console.log(loginStatus);
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
        {loadingStatus?<LinearProgress color="secondary" />:""}

        <CssBaseline />
        <div className={classes.paper}>
          
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
              disabled={loadingStatus?true:false}
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