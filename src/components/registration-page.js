import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import goodcall from '../resources/images/goodcall.png';

import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="LandingPageContainer">
        <img className='logoImage' src={goodcall} alt='goodcall app'/>
            <p><b>Register for GOODCALL</b></p>
            <RegistrationForm />
            <br/>
            <Link to="/"><button className='FormStyle'><b>LOG IN</b> EXISTING USER</button></Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);