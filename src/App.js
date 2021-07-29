import './App.css'
import SignIn from './Components/LoginPage'
import Signup from './Components/Signup'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App(){
  return(
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default App; 