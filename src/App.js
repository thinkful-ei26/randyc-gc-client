import React, { Component } from 'react';
import moment from 'moment';//for datePicker

import { connect } from 'react-redux';
//import logo from './logo.svg';
import './App.css';
import Display from './components/display';
import DateInput from './components/date-input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//Actions
import { fetchUsersRequest, fetchUsersSuccess, fetchUsersError } from './actions/actions-users-api';
import { fetchBlocksRequest, fetchBlocksSuccess, fetchBlocksError } from './actions/actions-blocks-api';
import { setStartDay, setEndDay } from './actions/actions-input';
 

//date stuff
const formatDate = date => moment(date).format("MMMM Do YYYY, h:mm:ss a");//this gets the date object
const formatMonthDay = date => moment(date).format("MMMM Do YYYY");
const getTheDay = date => date.getDay();

class App extends Component {

  

  componentDidMount(){

    this.props.dispatch(fetchUsersRequest());
    this.props.dispatch(fetchBlocksRequest());
 
 }

 //set start day & time
 handleStartSelect = day => {
 
  //send full date for title
  this.props.dispatch(setStartDay(day));
  
};

//set end day & time
handleEndSelect = day => {
 
  //send full date for title
  this.props.dispatch(setEndDay(day));
  
};

handleSaveButton = () => {

  console.log('submit data');
 
}


  
  render() {

    console.log('current available props >> ', this.props);

    return (

      <div>
        <div className = "centerStuff" >
        <h3>Test... get all current Users & ids...</h3>
        
        <Display
         users = { this.props.users }
         blocks = { this.props.blocks }
         inputDay = { this.props.inputDay }
         dayOfTheWeek = { this.props.dayOfTheWeek }
         inputStartTime = { this.props.inputStartTime }

         />
        Select Start time for block:
        <DatePicker
          todayButton={"Today"} 
  
          // selected={this.props.inputStartDate}
          onChange={this.handleStartSelect}

          //onChange={this.handleDaySelect} //works for both time and date
 
          //onSelect={ this.handleDaySelect } //when day is clicked

          dateFormat="MMMM d, yyyy h:mm aa"
          timeCaption="time"
          showTimeSelect
          timeFormat="HH:mm aa"
          timeIntervals={30}
        />

        {/* {this.props.inputDay} */}
          
       </div>
       <hr />
       <div className = "centerStuff">
       Select End time for block:
       <DatePicker
          todayButton={"Today"} 
          onChange={this.handleEndSelect} 
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          timeCaption="time"
          timeFormat="HH:mm aa"
          timeIntervals={30}

       ></DatePicker>

       </div>
       <hr />
       <div className = "centerStuff">
       The selected Day is: { this.props.dayOfTheWeek } { this.props.inputDay }<br/>
          The start time is: {this.props.inputStartTime}<br/>
          The end time is: {this.props.inputEndTime}
          <br/>
          <button onClick= { this.handleSaveButton }>SAVE</button>
       </div>

      
      </div>
      
    );
  }


}
 
//export default App;

const mapStateToProps = state => {

  //console.log('state in App.js >>> ',state);

  return {

    users: state.usersReducer.users,
    blocks: state.blocksReducer.blocks,
    inputDay: state.inputReducer.inputDay,
    dayOfTheWeek: state.inputReducer.dayOfTheWeek,
    inputStartTime: state.inputReducer.inputStartTime,
    inputEndTime: state.inputReducer.inputEndTime


  }
 
}


export default connect(mapStateToProps)(App);

