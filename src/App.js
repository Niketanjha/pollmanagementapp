import './App.css';
import SignIn from './Components/LoginPage';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import TableAll from './Components/Table';
import NavBar from './Components/NavBar';
import CreatePoll from './Components/CreatePoll';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {useSelector} from 'react-redux';
import AllPolls from './Components/AllPolls';

function App(){
  const loginStatus=useSelector((state)=>state.loginStatusReducer);

  return(
    <>
      {loginStatus?<NavBar />:""}
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={loginStatus?Dashboard:SignIn} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/home" component={AllPolls}/>
          <Route exact path="/dashboard/table" component={TableAll} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/dashboard/newpoll" component={CreatePoll} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default App; 