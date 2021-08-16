import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {setUniqueId,setAllPollsLoading,fetchAllPolls,setViewPollLoading,viewSinglePoll} from '../Redux/actions';
import LinearProgress from '@material-ui/core/LinearProgress';


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
const user={
  name:"Rajat",
  address:{
    name:'UK',
    office:{
      landmark:"nodia",
      place:"delhi"
    }
  }
}

export default function AllPolls() {
  const classes = useStyles();  
  const history=useHistory();
  const dispatch=useDispatch();
  const loginStatus=useSelector((state)=>state.loginStatusReducer.isSuccess);
  const loadingStatus=useSelector((state=>state.fetchAllPollReducer.isLoading));
  const data=useSelector((state=>state.fetchAllPollReducer.data));

// const string1=[
//   ["swiggy",123], //177
//   ["swiggy",227],
//   ["zomato",103], //132
//   ["zomato",171],
//   ["dunzo",131],  //131
//   ["zomato",122],
//   ["swiggy",181]
// ];

// function maxAvg(input){
//   const dict={};
//   for(const i in input){
//     console.log(dict[input[i][0]]);
//     if(dict[input[i][0]]){
//       dict[input[i][0]]={...dict[input[i][0]],
//         times:dict[input[i][0]].times+1,value:dict[input[i][0]].value+input[i][1]}
//     }
//     else{
//       dict[input[i][0]]={times:1,value:input[i][1]}
//     }
//     // dict[i[0]]=dict[i[0]];
//   }
//   let max=0;
//   let answer="";
//   for(const key in dict){
//     const temp=(dict[key].value)/(dict[key].times);
//     if(temp>max){
//       max=temp;
//       answer=key;
//     }
//   }
//   return answer;
// }
// console.log(maxAvg(string1));
//   function convertData(input){
//     let final={};
//     for(const key in input){
//         if((typeof(input[key]))==="object") {
//             const temp=convertData(input[key]);
//             console.log(temp);
//             for(const obj in temp){
//               final[key+'_'+obj]=temp[obj];
//             }
//         }
//         else {
//           final[key]=input[key];
//         }
//     }
//     return final;
// };
// function convertUser(final){
//   const ob={}
//   for (const i in final){
//     ob['user_'+i]=final[i]
//   }
//   return ob;
// }  
// console.log(convertUser(convertData(user)));
  

  function showOnePoll(uniqueId){
    dispatch(setViewPollLoading(uniqueId));
    dispatch(viewSinglePoll(uniqueId));
    history.push('/dashboard/uniquePoll')
  }

  useEffect(()=>{
      dispatch(setAllPollsLoading(true));
      dispatch(fetchAllPolls());
  },[]);
  
  if(loginStatus){
    console.log(loadingStatus)
  return (
    <div style={{margin:"8% 2% 1% 15%",display:"flex",flexWrap:"wrap"}}>
              {loadingStatus?<LinearProgress style={{marginTop:"15%"}} color="secondary" />:""}


    {data.map((element)=>{
      return(
        <Card key={element._id} style={{margin:"2%",width:"40%"}} className={classes.root} variant="outlined">
          <CardHeader titleTypographyProps={{variant:'h4'}} title={element.title} />
          <CardContent style={{padding:"0% 4% 4% 4%"}}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <Typography style={{marginLeft:"2%"}} variant="h5">Users</Typography>
            <Typography variant="h6">Votes</Typography>
          </div>
              {element.options.map((e)=>{
                return(
                  <div style={{margin:"3% 3% 0% 3%",display:"flex",justifyContent:"space-between"}}>
                  <Typography>{e.option}</Typography>
                  <Typography>{e.vote}</Typography>
                  </ div>
                );
              })}
          </CardContent>
          <CardActions style={{margin:"auto"}}> 
            <Button onClick={()=>showOnePoll(element._id)}  size="small">Show Poll</Button>
          </CardActions>
        </Card>    
      );
    })
    }
    </div>
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
