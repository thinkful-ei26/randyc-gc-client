import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import goodcall from '../goodcall_image.png';

import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="centerStuff">
        <img src={goodcall} alt='goodcall app'/> 
            <h2>Register for Good Call</h2>
            <RegistrationForm />
            <br/>
            <Link to="/"><button>LOG IN EXISTING USER</button></Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);