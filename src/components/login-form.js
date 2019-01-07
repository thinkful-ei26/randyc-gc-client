import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';

export class LoginForm extends React.Component {

  onSubmit(values) {

    return this.props.dispatch(login)

  }

  render() {

    let error;
    if(this.props.error) {

      error = (

        <div>

          Error message! 

        </div> 


      )


    }

    return(

      <form 
        onSubmit={this.props.ahndleSubmit(values => this.onSubmit(values))}
      >
      { error }
      <label htmlFor="username">User name</label>
      <Field 
        component={Input}
        type="text"
        name="username"
        id="username"
      />
      <label htmlFor="password">Password</label>
      <Field
        component={Input}
        type="password"
        name="password"
        id="password"
      />

      <button disabled={this.props.pristine || this.props.submitting}>
      Log In
      </button>
        

        
      
      >INPUT FORM





      </form>


    )
    
  }


}

export default reduxForm({

  form: 'login' 

})(LoginForm);