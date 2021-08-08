import React, {useEffect, useState} from 'react';

import axios from 'axios';
import {useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';


const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function TableAll(props) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  
  const [getData,setData]=useState([]); 

  const dispatch=useDispatch()
  const loginStatus=useSelector((state)=>state.loginStatusReducer.isSuccess);
 
  async function getAllUser(){
    await axios.get("https://secure-refuge-14993.herokuapp.com/list_users")
    .then((res)=>{setData(res.data.data);console.log(res.data.data)});
  }

  useEffect(()=>{
      getAllUser();
  },[]);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  if(loginStatus){
    return (
      <TableContainer style={{width:"80%",margin:"auto",marginTop:"6%"}} component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align="center">User Id</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Password</TableCell>
              <TableCell align="center">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? getData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : getData
            ).map((row) => (
              <TableRow key={row._id}>
                <TableCell style={{ width: 200 }} align="center" >
                  {row._id}
                </TableCell>
                <TableCell style={{ width: 200 }} align="center">
                  {row.username}
                </TableCell>
                <TableCell style={{ width: 200 }} align="center" component="th" scope="row">
                  {row.password}
                </TableCell>
                <TableCell style={{ width: 200 }} align="center" >
                  {row.role}
                </TableCell>
                
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    );
  }
  else{
    return(
      <>
        <p>You are not logged in. 
            <a href="/login">Kindly log in</a>
        </p>
      </>
    );
  }
}

// import React, {useEffect, useState} from 'react';
// import axios from 'axios';

// import {useSelector, useDispatch } from 'react-redux';

// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

// export default function TableAll(props) {
//   const classes = useStyles();
//   const [getData,setData]=useState([]); 

//   const dispatch=useDispatch()
//   const loginStatus=useSelector((state)=>state.loginStatusReducer);
 
//   async function getAllUser(){
//     await axios.get("https://secure-refuge-14993.herokuapp.com/list_users")
//     .then((res)=>{setData(res.data.data);console.log(res.data.data)});
//   }

//   useEffect(()=>{
//       getAllUser();
//   },[]);

//   if(loginStatus){
//   return (
//       <TableContainer component={Paper}>
//         <Table className={classes.table} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>User Id</TableCell>
//               <TableCell align="right">Password</TableCell>
//               <TableCell align="right">Role</TableCell>
//               <TableCell align="right">Username</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//               {getData.map((row) => (
//                   <TableRow key={row._id}>
//                   <TableCell component="th" scope="row">
//                       {row._id}
//                   </TableCell>
//                   <TableCell align="right">{row.username}</TableCell>
//                   <TableCell align="right">{row.password}</TableCell>
//                   <TableCell align="right">{row.role}</TableCell>
//                   </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   }
//   else{
//     return(
//       <>
//           <p>You are not logged in. 
//               <a href="/login">Kindly log in</a>
//           </p>
//       </>
//     )
//   }
// }
