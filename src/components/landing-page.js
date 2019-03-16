import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import goodcall from '../resources/images/goodcall.png';
import LoginForm from './login-form';
import OrImage from '../resources/images/OR.png';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="LandingPageContainer">
            <div className='logoContainer'>
                <img className='logoImage' src={goodcall} alt='goodcall app'/> 
            </div>
            <p><b>GOODCALL</b> provides a simple way to share<br/>your schedule for phone calls.</p>
            <p className='FormStyle'><b>*</b>Check it out as <b>username:</b> demo and <b>password:</b> password123</p>
            <LoginForm />
            <br/>
            <img src={OrImage} className='OrImage' alt={'or'}/>
            <br/>
            <Link to="/register"><button className='FormStyle'>REGISTER NEW USER</button></Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);

