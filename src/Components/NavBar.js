import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch } from 'react-redux';
import { setLoginStatus } from '../Redux/actions';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const dispatch=useDispatch();
  const history=useHistory();

  function logOut(){
    dispatch(setLoginStatus(false));
    localStorage.removeItem("token");
    history.push('/login');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} onClick={props.logout}>
            Dashboard
          </Typography>
          <a href="/dashboard/table"><Button color="inherit" >Show All Users</Button></a>
          <Button color="inherit" onClick={logOut}>LogOut</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
