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
            
            <h2>Welcome to GoodCall!</h2>
            <p className='FormStyle'>GoodCall provides a simple way to schedule blocks of time for phone calls.</p>
            <p className='FormStyle'>LOG IN to get started!</p>
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

