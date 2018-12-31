import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Display from './components/display';

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {

      names : [

        'User 1',
        'User 2',
        'User 3'
   
      ]


    }
 
  }





  render() {
    return (

      <div>
        <h1>Testing...</h1>
        <Display users = { this.state.names }/>

      </div>
      
    );
  }
}

export default App;


/*

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