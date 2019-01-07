import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import goodcall from '../goodcall_image.png';


import Dashboard from '../components/dashboard';

//import LoginForm from './login-form';

export function LandingPage(props) {

return (

  <div className="centerStuff">
    <img src={goodcall} alt='goodcall app'/> 
    <h2>Welcome to GoodCall!</h2>
    <p>A semi-operational app to schedule free time for phone calls.</p>
     
    <br/>
    <Link to="/dashboard">Click here to start</Link>
    <br/>
    ...

  </div>

/* <div className="centerStuff">

<h2>Welcome to GoodCall!</h2>
<br/>
<LoginForm />
<br/>
<Link to="/register">Register</Link>
<br/>
...

</div> */

);


}

const mapStateToProps = state => ({



})

export default connect(mapStateToProps)(LandingPage);


