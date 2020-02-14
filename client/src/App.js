import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { JobContext } from './JobProvider';
import './StylesFolder/AppMainStyles.scss';
import './StylesFolder/JobStyles.scss';

import Navbar from './Navbar';
import Signup from './AuthFolder/Signup';
import Login from './AuthFolder/Login';
import JobList from './JobsFolder/JobList';
import ProtectedRoute from './AuthFolder/ProtectedRoute';

function App() {

  const { token } = useContext(JobContext)

  return (
    <div className="appDiv">
      <Navbar />
      <Switch>
        <Route path='/signup' render={() => token ? <Redirect to='/jobs'/> : <Signup />}/>
        <Route path='/login' render={() => token ? <Redirect to='/jobs'/> : <Login />}/> 
        <ProtectedRoute path='/jobs' component={JobList}></ProtectedRoute>
        <Route exact path='/' render={() => <Redirect to='/login'/>}/>

        {/* <Route exact path='/' component={Login}/> */}
        
      </Switch>
    </div>
  );
}

export default App;
