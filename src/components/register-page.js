import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {postUserRequest} from '../actions/actions-users-api';

export function Registration(props) {


  let firstName, lastName, userName, password;


  return (

    <div className="centerStuff">
    <h2>New User Registration</h2>
    <br/>
    <form className="basic">
      <label htmlFor="firstName">First Name: </label>
        <input 
         ref={input => firstName=input}
         defaultValue='randy' 
         type='text'
        
        />
      <br/>
      <label htmlFor="lastName">Last Name: </label>
        <input
        ref={input => lastName=input}
        defaultValue='lastname'
        type='text'
        />
      <br/>
      <label htmlFor="userName">Username: </label>
        <input
        ref={input => userName=input}
        defaultValue='username'
        type='text'
        />
      <br/>
      <label htmlFor="password">Password: </label>
        <input
        ref={input => password=input}
        defaultValue='password'
        type='password'
        />
      <br/>
      <br/>
      <button onClick={(event) => {
          event.preventDefault();
          
          const user = {

            firstName: firstName.value,
            lastName: lastName.value,
            userName: userName.value,
            password: password.value
 
          }

          props.dispatch(postUserRequest(user))
          
        }}>SUBMIT</button>
        <br/>
        <br/>
        <Link to="/landing"><button >LOG-IN</button></Link>

    </form>
    
    </div>
  );
 
}

const mapStateToProps = state => ({



})

export default connect(mapStateToProps)(Registration);