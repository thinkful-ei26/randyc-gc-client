import React from 'react';
import {Route, withRouter, Switch} from 'react-router-dom';

import './App.css';
import Dashboard from './components/dashboard';
import LandingPage from './components/landing-page'; 
import Registration from './components/register-page';

class App extends React.Component {

  render() {

    return (

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/landing" component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/register" component={Registration} />
      </Switch>
      
    );
  }

}
 

export default withRouter ((App));
