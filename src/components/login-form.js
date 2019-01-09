import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
//import {login} from '../actions/actions-auth';

export class LoginForm extends React.Component {
 

  render() {

    let userName, password;
 
    return(
 
        <form> 
           <label htmlFor="username">Username: </label>
            <input
              ref={input => userName=input}
              type='text'
            ></input>
            <br/>
           <label htmlFor="password">Password: </label>
            <input
              ref={input => password=input}
              type='text'
            ></input>
            <br/>
            <br/>
            <button 
            onClick={(event) =>{

              event.preventDefault();

              //return this.props.dispatch(login(event.userName, event.password));

            }
 
            }>
            LOG-IN</button>
        </form>
        
    );
    
  }


}

export default reduxForm({

  form: 'login' 

})(LoginForm);