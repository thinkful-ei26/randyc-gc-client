import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import goodcall from '../goodcall_image.png';

import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="centerStuff">
            <img src={goodcall} alt='goodcall app'/> 
            <h2>Welcome to GoodCall!</h2>
            <LoginForm />
            <br/>

            <Link to="/register"><button>NEW USER REGISTER HERE</button></Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);

