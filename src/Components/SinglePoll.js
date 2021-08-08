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
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';


export default function SinglePoll(props){
    // const dispatch=useDispatch();
    // const data=useSelector((state)=>state.singlePollReducer);
    const getId= useSelector((state)=>state.singlePollReducer.id);
    const [getData,setData]=useState();
    const history=useHistory();
    const loginStatus=useSelector((state)=>state.loginStatusReducer.isSuccess);


    async function deleteAction(){
        await axios.get(`https://secure-refuge-14993.herokuapp.com/delete_poll?id=${getId}`)
        .then(
            (res)=>{
                if(res.data.error===0){
                toast("Sucessfully Deleted");
                history.push('/dashboard/home');
                }
                else{
                    toast("unable to delete");
                }
                  }
            )
    }

    async function voteRequest(text){
        let token=localStorage.getItem("token");
        let headers={access_token:token}
        console.log(text);
        await axios.post(`https://secure-refuge-14993.herokuapp.com/do_vote?id=${getId}&option_text=${text}`,{},{headers:headers})
        .then((res)=>{
            if(res.data.error==0){
                toast("Voted Sucessfully")
            }
            else{
                toast("Something went wrong")
            }
        }).catch((e)=>{toast("Something went wrong");console.log(e)})
    }

    useEffect(()=>{
        callRequest(getId);
        console.log(getId);
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
    if(loginStatus){
    return(
        <div style={{margin:"8% 5% 5% 10%"}}>
            <Card>
                <CardHeader titleTypographyProps={{variant:'h4'}} title={getData?.title}>
                </CardHeader>
                <CardContent>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <Typography style={{marginLeft:"5%"}} variant="h4">options</Typography>
                        <Typography variant="h5">Number of Votes</Typography>
                    </div>
                        {getData?.options?.map((element,index)=>{
                            return(
                                <div style={{display:"flex",justifyContent:"space-between",margin:"4%"}}>
                                    <Typography style={{minWidth:"50%"}} variant="h5">{index+1}-{element.option}</Typography>
                                    <Button onClick={()=>voteRequest(element.option)} style={{marginLeft:"20%",maxWidth:"20%"}} color="primary">Vote</Button>
                                    <Typography variant="h5"> {element.vote}</Typography>
                                </div>
                                );
                        })}
                    </CardContent>
                    <CardActions style={{width:"100%"}}>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <Button onClick={deleteAction}> 
                                <DeleteIcon
                                style={{marginLeft:"3%"}}
                                fontSize="large"
                                color="secondary"/>
                            </Button>
                            <Button>
                                <AddIcon 
                                    fontSize="large"
                                />
                            </Button>
                        </div>
                    </CardActions>
            </Card>
        </div>
    )}
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

