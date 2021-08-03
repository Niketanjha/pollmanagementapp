import React, {useEffect, useState} from 'react';
import axios from 'axios';


import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TableAll(props) {
  const classes = useStyles();
  const [getData,setData]=useState([]); 
 
  async function getAllUser(){
    await axios.get("https://secure-refuge-14993.herokuapp.com/list_users")
    .then((res)=>{setData(res.data.data);console.log(res.data.data)});
  }

  useEffect(()=>{
      getAllUser();
  },[]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Id</TableCell>
            <TableCell align="right">Password</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Username</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {getData.map((row) => (
                <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                    {row._id}
                </TableCell>
                <TableCell align="right">{row.username}</TableCell>
                <TableCell align="right">{row.password}</TableCell>
                <TableCell align="right">{row.role}</TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
