import React from 'react';

import {Route, withRouter, Switch} from 'react-router-dom';
import moment from 'moment';//for datePicker 
import { connect } from 'react-redux';


//import logo from './logo.svg';
import './App.css';
//import Display from './components/display';
import Dashboard from './components/dashboard';
import LandingPage from './components/landing-page'; 
//import Register from './components/register-page'



//date stuff
let date = null;

const formatMonthDay = date => moment(date).format("MMMM Do YYYY");
 
//const formatTime = date => moment(date).format("HH:mm a");

class App extends React.Component {

  render() {

    return (

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        {/* <Route exact path="/register" component={Register} /> */}
        
      </Switch>
      
    );
  }

}
 
//export default App;

// const mapStateToProps = state => {

//   //console.log('state in App.js >>> ',state);

//   return {

//     // users: state.usersReducer.users,
//     // blocks: state.blocksReducer.blocks,
//     // userId: state.usersReducer.userId

//   }
 
// }

export default withRouter ((App));


// export default withRouter (connect(mapStateToProps)(App));


    // inputDay: state.inputReducer.inputDay,
    // dayOfTheWeek: state.inputReducer.dayOfTheWeek,
    // inputStartTime: state.inputReducer.inputStartTime,
    // inputEndTime: state.inputReducer.inputEndTime