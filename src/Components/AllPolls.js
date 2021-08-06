import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setUniqueId,viewSinglePoll} from '../Redux/actions';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function AllPolls() {
  const classes = useStyles();  
  const [getAllPolls,setAllPolls]=useState([]);
  const history=useHistory();
  const dispatch=useDispatch();

  function showOnePoll(uniqueId){
    
    dispatch(setUniqueId(uniqueId));
    dispatch(viewSinglePoll(uniqueId));
    history.push('/dashboard/uniquePoll')
  }

  useEffect(()=>{
    fetchAllPolls();
  },[]);

  async function fetchAllPolls(){
      await axios.get("https://secure-refuge-14993.herokuapp.com/list_polls")
      .then((res)=>{setAllPolls(res.data.data);console.log(res.data.data)})
  }

  return (
    <div style={{margin:"8% 2% 1% 10%"}}>
    {getAllPolls.map((element)=>{
      return(
        <Card key={element._id} style={{margin:"2%",width:"40%"}} className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
            {element.title}
            </Typography>
            <Typography variant="h6">User Vote</Typography>
              {element.options.map((e)=>{
                return(
                  <>
                  <Typography>{e.option} {e.vote}</Typography>
                  </>
                );
              })}
          </CardContent>
          <CardActions> 
            <Button onClick={()=>showOnePoll(element._id)}  size="small">Show Poll</Button>
          </CardActions>
        </Card>    
      );
    })
    }
    </div>
  );
}
