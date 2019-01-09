import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import goodcall from '../goodcall_image.png';


import Dashboard from '../components/dashboard';

import LoginForm from './login-form';

export function LandingPage(props) {

return (

  <div className="centerStuff">
    <img src={goodcall} alt='goodcall app'/> 
    <h2>Welcome to GoodCall!</h2>
    <p>An app to help schedule free time for phone calls</p>
    <br/>
    <LoginForm />
    <br/>
    <Link to="/register"><button>REGISTER</button></Link> 
    <br/>
  </div>

);
 
}

const mapStateToProps = state => ({
 

})

export default connect(mapStateToProps)(LandingPage);


