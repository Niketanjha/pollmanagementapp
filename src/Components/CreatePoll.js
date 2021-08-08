import axios from 'axios';
import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux';
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function CreatePoll(){
    const classes = useStyles();
    const [getOpt1,setOpt1]=useState();
    const [getOpt2,setOpt2]=useState();
    const [getOpt3,setOpt3]=useState();
    const [getOpt4,setOpt4]=useState();
    const [getHeading,setHeading]=useState();
    const history=useHistory();
    const loginStatus=useSelector((state)=>state.loginStatusReducer.isSuccess);

    async function addNewPoll(){
        await axios.get(`https://secure-refuge-14993.herokuapp.com/add_poll?title=${getHeading}%20polll&options=${getOpt1}____${getOpt2}____${getOpt3}____${getOpt4}`)
        .then((res)=>{
          if(res.data.error===0){
            toast("Poll Created");
            history.push('/dashboard/home');
          }
          else{
            toast("Error in Creating Poll");
          }
          console.log(res)});
    }
    if(loginStatus){
    return(
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add a new Pole 
        </Typography>
        <form className={classes.form} onSubmit={(e)=>e.preventDefault()} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Poll 1"
                autoFocus
                onChange={(e)=>{setOpt1(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="option2"
                label="Poll 2"
                autoFocus
                onChange={(e)=>{setOpt2(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Poll 3"
                autoFocus
                onChange={(e)=>{setOpt3(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Poll 4"
                name="lastName"
                autoComplete="lname"
                onChange={(e)=>{setOpt4(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Heading"
                name="email"
                onChange={(e)=>setHeading(e.target.value)}
              />
            </Grid>
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={addNewPoll}
          >
            Add Poll
          </Button>
          
        </form>
      </div>
    </Container>
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