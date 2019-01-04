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
import { fetchUsersRequest } from './actions/actions-users-api';
import
 { fetchBlocksRequest,postBlockRequest,deleteBlockRequest } from './actions/actions-blocks-api';
import { setStartDay, setEndDay } from './actions/actions-input';
import { formatDate, formatTime } from './utils/date';

//date stuff
let date = null;

const formatMonthDay = date => moment(date).format("MMMM Do YYYY");
 
//const formatTime = date => moment(date).format("HH:mm a");

class App extends Component {

  //local state... for user input
  state = {

    startDate : new Date(),
    endDate : new Date()
     

  };

  componentDidMount(){

    this.props.dispatch(fetchUsersRequest());
    this.props.dispatch(fetchBlocksRequest());
 
 }

 //set start day & time
 handleStartSelect = day => {
 
     
  this.setState({

    startDate: day
     
  })
  
};

//set end day & time
handleEndSelect = day => {

  if(day <= this.state.startDate){

    console.log('end is less than!');

    if(window.confirm('End time cannot be less than start time, re-enter please...')){

      day = this.state.startDate;

    }

  }
  

  this.setState({

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
 

handleDeleteClicked = (blockid) => {

  console.log('delete this',blockid);
  //need to get Block id...

  if(window.confirm('Are you sure?')){

    this.props.dispatch(deleteBlockRequest(blockid));

  }
   
}

  
  render() {

    console.log('current available props >> ', this.props);

    return (

      <div>
        <div className = "centerStuff" >
          <br/>
          The current user id is: {this.props.userId }<br/>
          The selected day is { formatDate(this.state.startDate)}<br/>
          The start time is: {formatTime(this.state.startDate)}<br/>
          The end time is: {formatTime(this.state.endDate)}
          <br/>
          <button onClick= { this.handleSaveButton }>SAVE</button>
          <br/>
          <br/>

        Select Start Month/Day: 
        <DatePicker
          todayButton={"Today"} 
  
          selected={ this.state.startDate }
          onChange={this.handleStartSelect}

          dateFormat="MMMM d, yyyy"
          
        />
        <hr />
        
        Select Start time for block: 
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleStartSelect}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="h:mm aa"
          timeCaption="Time"

          // todayButton={"Today"} 
  
          // selected={ this.state.startDate }
          // onChange={this.handleStartSelect}

          // showTimeSelect
          // dateFormat="MMMM d, yyyy h:mm aa"
          // timeCaption="time"
          // timeFormat="HH:mm aa"
          // timeIntervals={30}
        />

          
       </div>
       <hr />
       <div className = "centerStuff">
       Select End time for block:
       { <DatePicker

          selected={this.state.endDate}
          onChange={this.handleEndSelect}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="h:mm aa"
          timeCaption="Time"
          // todayButton={"Today"} 

          // selected={this.state.endDate}
          // onChange={this.handleEndSelect} 
          // minDate={this.state.startDate}
          // maxDate={this.state.startDate}
          // showTimeSelect
          // dateFormat="MMMM d, yyyy h:mm aa"
          // timeCaption="time"
          // timeFormat="HH:mm aa"
          // timeIntervals={30}



       ></DatePicker> 
      
        
      
      
      
      
      
      
      }

       </div>
       <hr />

       <DatePicker
        inline
        selected={this.state.startDate}
         
        />

      <h3>Test... get all current Users, Blocks & ids...</h3>
        
        <Display
         users = { this.props.users }
         blocks = { this.props.blocks }
         onDelete = { this.handleDeleteClicked }
        />  


        
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