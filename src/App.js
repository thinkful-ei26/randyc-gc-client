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
import { fetchBlocksRequest, fetchBlocksSuccess, fetchBlocksError, postBlockRequest } from './actions/actions-blocks-api';
import { setStartDay, setEndDay } from './actions/actions-input';
 

//date stuff
let date = null;
const formatDate = date => moment(date).format("MMMM Do YYYY, h:mm:ss a");//this gets the date object
const formatMonthDay = date => moment(date).format("MMMM Do YYYY");
 
const formatTime = date => moment(date).format("HH:mm a");

class App extends Component {

  state = {

    startDate :null,
    endDate :null,
    dayOfTheWeek: null,
    inputStartTime: null,
    inputEndTime: null

  };

  componentDidMount(){

    this.props.dispatch(fetchUsersRequest());
    this.props.dispatch(fetchBlocksRequest());
 
 }

 //set start day & time
 handleStartSelect = day => {
 
    const justDay = formatMonthDay(day);
    const justDayNumbner = day.getDay();
    let theDay = '';

    const justStartTime = formatTime(day);

    // Sunday - Saturday : 0 - 6
    if(justDayNumbner === 0){ theDay = 'Sunday';}
    if(justDayNumbner === 1){ theDay = 'Monday';}
    if(justDayNumbner === 2){ theDay = 'Tuesday';}
    if(justDayNumbner === 3){ theDay = 'Wednesday';}
    if(justDayNumbner === 4){ theDay = 'Thursday';}
    if(justDayNumbner === 5){ theDay = 'Friday';}
    if(justDayNumbner === 6){ theDay = 'Saturday';}


   
  this.setState({

    inputDay: justDay,
    startDate : day,
    endDate: day,
    dayOfTheWeek : theDay,
    inputStartTime: justStartTime
     
  })
  
};

//set end day & time
handleEndSelect = day => {
 
  const justEndtTime = formatTime(day);  

  this.setState({

    inputEndTime: justEndtTime,
    endDate: day

  })
  
};

handleSaveButton = () => {

  console.log('state',this.state);

  this.props.dispatch(postBlockRequest({

    startDate: this.state.startDate,
    endDate: this.state.endDate

  }));
 
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
        />
        Select Start time for block:
        <DatePicker
          todayButton={"Today"} 
  
          selected={ this.state.startDate }
          onChange={this.handleStartSelect}

          dateFormat="MMMM d, yyyy h:mm aa"
          timeCaption="time"
          showTimeSelect
          timeFormat="HH:mm aa"
          timeIntervals={30}
        />

          
       </div>
       <hr />
       <div className = "centerStuff">
       Select End time for block:
       <DatePicker
          todayButton={"Today"} 

          selected={this.state.endDate}
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
       The current user id is: {this.props.userId }<br/>
       The selected Day is { this.state.dayOfTheWeek } { this.state.inputDay }<br/>
          The start time is: {this.state.inputStartTime}<br/>
          The end time is: {this.state.inputEndTime}
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
    userId: state.usersReducer.userId


  }
 
}


export default connect(mapStateToProps)(App);


    // inputDay: state.inputReducer.inputDay,
    // dayOfTheWeek: state.inputReducer.dayOfTheWeek,
    // inputStartTime: state.inputReducer.inputStartTime,
    // inputEndTime: state.inputReducer.inputEndTime