import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';//for datePicker

import FullCalendar from 'fullcalendar-reactwrapper';

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
 { fetchBlocksRequest,postBlockRequest,putBlockRequest,deleteBlockRequest } from './actions/actions-blocks-api';
import { setStartDay, setEndDay } from './actions/actions-input';
import { formatDate, formatTime } from './utils/date';



//date stuff
let date = null;

const formatMonthDay = date => moment(date).format("MMMM Do YYYY");
 
//const formatTime = date => moment(date).format("HH:mm a");

class App extends Component {

  //local state... for user input
  state = {

    mode: 'ADD',
    modeMessage: 'Click below to ADD a new time block',
    buttonLabel: 'SAVE',
    startDate : null,
    endDate : null,
    captureBlockId: null
     

  };

  componentDidMount(){

    this.props.dispatch(fetchUsersRequest());
    this.props.dispatch(fetchBlocksRequest());
 
 }

 //set start day & time
 handleStartSelect = day => {
 
     
  this.setState({

    startDate: day,
    endDate: day
     
  })
  
};

//set end day & time
handleEndSelect = day => {

  //has to be a better way...
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

//SAVE BLOCK as new or after EDIT
handleSaveButton = () => {

  console.log('state',this.state);

  this.setState({
 
      mode: 'ADD',
      modeMessage: 'Click below to ADD a new time block',
      buttonLabel: 'SAVE',
      startDate : null,
      endDate : null,
      captureBlockId: null
    
  })

  if(this.state.mode === 'ADD'){

    this.props.dispatch(postBlockRequest({
      
      startDate: this.state.startDate,
      endDate: this.state.endDate
  
    }));

 
  }


  if(this.state.mode === 'EDIT'){

    this.props.dispatch(putBlockRequest({
      
      _id: this.state.captureBlockId,
      startDate: this.state.startDate,
      endDate: this.state.endDate
  
    }));
 
  }

  
 
}

//EDIT BLOCK
handleEditClicked = (blockid) => {

  console.log('edit this',blockid);

  let editStartTime;
  let editEndTime;
  let editBlockId;
  
  //wht is proper way to do this?
  //for local state to show in selected fields
  const findObject = this.props.blocks.map((block) => {
    
    if(blockid === block._id){
 
        editStartTime = block.startDate;
        editEndTime = block.endDate;
        editBlockId = block._id;
         
    }
     

  });
 

  this.setState({

    mode: 'EDIT',
    modeMessage: 'Click below to EDIT the existing current time block',
    buttonLabel: 'SAVE YOUR EDITED BLOCK',
    startDate : editStartTime,
    endDate : editEndTime,
    captureBlockId: editBlockId

  })


}

 
//DELETE BLOCK
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
          <h3> { this.state.modeMessage } </h3>
          
          The current user id is: {this.props.userId }<br/>
          The selected day is { formatDate(this.state.startDate)}<br/>
          The start time is: {formatTime(this.state.startDate)}<br/>
          The end time is: {formatTime(this.state.endDate)}
          <br/>
          

        Select Start Month/Day: 
        <DatePicker
          todayButton={"Today"} 
  
          selected={ this.state.startDate }
          onChange={this.handleStartSelect}
          placeholderText="Select a start Day"

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
 
        />

          
       </div>

       <hr />
       <div className = "centerStuff">
       Select End time for block:
       { <DatePicker

          
          onChange={this.handleEndSelect}
          // placeholderText="Select an end time" not working yet
          selected={this.state.endDate}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          // minTime={this.state.startDate}
          // maxTime={new Date()}
          dateFormat="h:mm aa"
          timeCaption="Time"
          


       ></DatePicker> 
      
      }


       <hr />
       <button onClick= { this.handleSaveButton }>{this.state.buttonLabel}</button>
          <br/>
          <br/>
      <hr/>
       FULL CALENDAR WILL GO HERE TO SHOW THE DAY/HOUR BLOCKS
       {/* <FullCalendar
             id = "your-custom-ID"
            header = {{
            left: 'prev,next today myCustomButton',
            center: 'title',
            right: 'month,basicWeek,basicDay'
            }}
            defaultDate={this.state.startDate}
            navLinks= {true} // can click day/week names to navigate views
            editable= {true}
            eventLimit= {true} // allow "more" link when too many events
            events = {this.state.startDate}	
        >
        </FullCalendar> */}
        <hr /> 


       </div>
       
 
       

      <p>Testing: get all current Users, Blocks & ids...</p>
        
        <Display
         blocks = { this.props.blocks }
         onEdit = { this.handleEditClicked }
         onDelete = { this.handleDeleteClicked }
         users = { this.props.users }
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