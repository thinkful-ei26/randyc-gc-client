import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import goodcall from '../resources/images/goodcall.png';
  
export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
        this.props.history.push('/');
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
               <p className='HeaderBarLogOut'> <button className='HeaderBarButton' onClick={() => this.logOut()}>LOG OUT</button></p>
            );
        }
        return (
            <div className='HeaderBarContainer'>
            <img className='HeaderBarLogoImage' src={goodcall} alt='goodcall app'/> 
            {logOutButton}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(withRouter(HeaderBar));
