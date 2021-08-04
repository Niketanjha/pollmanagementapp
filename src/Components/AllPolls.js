import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

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
  const bull = <span className={classes.bullet}>•</span>;
  
  const [getAllPolls,setAllPolls]=useState([]);

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
            {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
            {element.title}
            </Typography> */}
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
            {/* <Typography className={classes.pos} color="textSecondary">
              adjective
            </Typography>
            <Typography variant="body2" component="p">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography> */}
          </CardContent>
          <CardActions>
            <Button size="small">Show Poll</Button>
          </CardActions>
        </Card>    
      );
    })
    }
    </div>
  );
}
