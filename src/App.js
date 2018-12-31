import React, { Component } from 'react';
import { connect } from 'react-redux';
//import logo from './logo.svg';
import './App.css';
import Display from './components/display';
import { fetchDaysRequest, fetchDaysSuccess, fetchDaysError } from './actions/actions_api';


class App extends Component {

  

  componentDidMount(){

    this.props.dispatch(fetchDaysRequest());
 
 }
  
  render() {
    return (

      <div>
        <h1>Testing...</h1>
        <Display days = { this.props.days }/>

      </div>
      
    );
  }


}
 
//export default App;

const mapStateToProps = state => {

  console.log('state >>> ',state);

  return {

    days: state.days

  }
 
}


export default connect(mapStateToProps)(App);



/* REF

<Display users = { this.state.users }/>

<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>

      */