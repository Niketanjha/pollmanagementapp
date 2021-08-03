import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Select,FormControl,InputLabel,} from "@material-ui/core";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";



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

export default function Signup() {
  const classes = useStyles();
  const [getName,setName]=useState();
  const [getPassword,setPassword]=useState();
  const [getRole,setRole]=useState("Guest"); 
  const [getButtonStatus,setButtonStatus]=useState(true);
  const history = useHistory();

  async function signUp(e){
    e.preventDefault();
    setButtonStatus(false);
    await axios.get(`https://secure-refuge-14993.herokuapp.com/add_user?username=${getName}&password=${getPassword}&role=${getRole}`)
    .then((res)=>{
      if(res.data.error===1){
        toast("User Already Exist");
        setButtonStatus(true);
      }
      else if(res.data.error===0){
        toast("User Created, Kindly login"); 
        console.log(res); 
        setTimeout(()=>history.push('/login'),3000);
      }
    })
  }
  
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <ToastContainer />
        <Typography component="h1" variant="h3">
          Sign Up
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
            onChange={(e)=>setName(e.target.value)}
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
            onChange={(e)=>setPassword(e.target.value)}
          />
          <FormControl variant="outlined" fullWidth className="my-1">
              <InputLabel htmlFor="outlined-role-native-simple" fullWidth>
                Signup As
                </InputLabel>
              <Select
                native
                label="Signup As"
                inputProps={{name: "role",id: "outlined-age-native-simple",}}
                value={getRole}
                onChange={(e)=>setRole(e.target.value)}
              >
                <option value="Guest">Guest</option>
                <option value="Admin">Admin</option>
                
              </Select>
            </FormControl>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={getButtonStatus?false:true}
                onClick={signUp}
            >
                Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body1">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}