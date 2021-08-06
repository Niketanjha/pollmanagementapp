import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { viewSinglePoll } from '../Redux/actions';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

export default function SinglePoll(props){
    // const dispatch=useDispatch();
    // const data=useSelector((state)=>state.singlePollReducer);
    const getId= useSelector((state)=>state.singlePollReducer.id);
    const [getData,setData]=useState();

    useEffect(()=>{
        callRequest(getId)
    },[])
    async function callRequest(id){
        await axios.get(`https://secure-refuge-14993.herokuapp.com/list_poll?id=${id}`)
        .then((res)=>{
                setData(()=>res.data.data);
                console.log(res.data.data)
        }
            );
    }
    console.log("dartaaa",getData);
    return(
        <div style={{margin:"8% 5% 5% 10%"}}>
            <Card>
                <CardHeader title={"Title:  "+getData?.title}>
                </CardHeader>
                <CardContent>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <Typography variant="h5">Options</Typography>
                        <Typography variant="h5">Number of Votes</Typography>
                    </div>
                        {getData?.options?.map((element,index)=>{
                            return(
                                <div style={{display:"flex",justifyContent:"space-between",margin:"4%"}}>
                                    <Typography variant="h5">{index+1}-{element.option}</Typography>
                                    <Typography variant="h5"> {element.vote}</Typography>
                                </div>
                                );
                        })}
                    </CardContent>
                    <CardActions>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <DeleteIcon
                                style={{marginLeft:"3%"}}
                                fontSize="large"
                                color="secondary"/>
                            <AddIcon 
                                fontSize="large"
                            />
                        </div>
                    </CardActions>
            </Card>
        </div>
    )
}

