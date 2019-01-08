import React from 'react';
import {connect} from 'react-redux';

import moment from 'moment';//for datePicker
 
import 'fullcalendar/dist/fullcalendar.js';
import 'fullcalendar/dist/fullcalendar.css';
import goodcall from '../goodcall_image.png';

import ShowCalendar from '../components/showcalendar'

import Display from '../components/display';
import Navbar from '../components/navbar';
 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//Actions
import { fetchUsersRequest } from '../actions/actions-users-api';
import
 { fetchBlocksRequest,postBlockRequest,putBlockRequest,deleteBlockRequest } from '../actions/actions-blocks-api';
import { setStartDay, setEndDay } from '../actions/actions-input';
import { formatDate, formatTime, formatFullCalendar } from '../utils/date';



//date stuff
let date = null;

const formatMonthDay = date => moment(date).format("MMMM Do YYYY");
 
//const formatTime = date => moment(date).format("HH:mm a");

export class Dashboard extends React.Component {

  constructor(props) {

    super(props);

  //local state... for user input
  this.state = {

    mode: 'ADD',
    modeMessage: 'Click below to ADD a new time block',
    buttonOneLabel: 'SAVE',
    buttonTwoLabel: 'RESET',
    startDate : new Date(),
    endDate : new Date(),
    captureBlockId: null
     

  }

}

//Initiate getting users & blocks from db
componentDidMount(){

  this.props.dispatch(fetchUsersRequest());
  this.props.dispatch(fetchBlocksRequest());
 
}

componentDidUpdate(prevProps){
// componentWillUpdate(prevProps){
 
  const selectById = this.props.selectedBlock;

  if(selectById === null && this.state.mode === 'EDIT'){

    this.setState({
 
      mode: 'ADD',
      modeMessage: 'Click below to ADD a new time block',
      buttonOneLabel: 'SAVE',
      buttonTwoLabel: 'RESET',
      startDate : null,
      endDate : null,
      captureBlockId: null
    
    })

  }
   
  if(selectById !== null && this.state.mode === 'ADD'){
 
    let justBlockId = selectById.selectedBlock;
 
    let editStartTime;
    let editEndTime;
    let editBlockId;
     
    //what is proper way to do this?
    //for local state to show in selected fields
    const findObject = this.props.blocks.map((block) => {
  
    if(justBlockId === block._id){

      editStartTime = block.startDate;
      editEndTime = block.endDate;
      editBlockId = block._id;

    }
   

  });


  this.setState({

    mode: 'EDIT',
    modeMessage: 'Click below to EDIT the selected time block',
    buttonOneLabel: 'SAVE YOUR EDIT',
    buttonTwoLabel: 'DELETE BLOCK',
    startDate : editStartTime,
    endDate : editEndTime,
    captureBlockId: editBlockId

  })

  }
  
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

  //console.log('state',this.state);

  this.setState({
 
      mode: 'ADD',
      modeMessage: 'Click below to ADD a new time block',
      buttonOneLabel: 'SAVE',
      buttonTwoLabel: 'RESET',
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

 

//DELETE or RESET BLOCK
handleDeleteClicked = () => {

  //RESET
  if(this.state.mode === 'ADD'){

    this.setState({
 
      mode: 'ADD',
      modeMessage: 'Click below to ADD a new time block',
      buttonOneLabel: 'SAVE',
      buttonTwoLabel: 'RESET',
      startDate : null,
      endDate : null,
      captureBlockId: null
    
    })


  }

  //DELETE
  if(this.state.mode === 'EDIT'){

    console.log('delete this',this.state.captureBlockId);
    //need to get Block id...
  
    if(window.confirm('Are you sure?')){
  
      this.props.dispatch(deleteBlockRequest(this.state.captureBlockId));
  
    }


  }

 
   
}

  
  render() {


  //map the blocks stuff to new array fro calendar events....
  let calendarEvents = [];


  //Calendar events
  calendarEvents = this.props.blocks.map((block,index) => {

      if(block.startDate){

        return {

          _id: block._id,
          title: 'Event',
          start: formatFullCalendar(block.startDate),
          end: formatFullCalendar(block.endDate)
  
        }

      }

        return {
 
          title: 'Today!',
          start: formatFullCalendar(new Date()),
          end: formatFullCalendar(new Date())
  
        }

    });



    console.log('state in App.js >>> ',this.state);


    return (

      <div >
        
        <Navbar  />
        <div className = "basic">
 
          <div id= "calendar" className ='adjustCalendar' >
            <ShowCalendar startDate={this.state.startDate} rawEvents = {calendarEvents}/>
          </div>

          <br/>
          <img src={goodcall} alt='goodcall app'/> 
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

        

       <hr />
        
       Select End time for block:
         <DatePicker

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
          
       />
         
       <hr />
       <button onClick={ this.handleSaveButton }>{this.state.buttonOneLabel}</button>
       &nbsp;&nbsp;&nbsp;&nbsp;
       <button onClick={ this.handleDeleteClicked}>{this.state.buttonTwoLabel}</button>
          <br/>
          <br/>
        <hr/>
        
       
      {/* <p>Testing: get all current Users, Blocks & ids...</p>
        
        <Display
         blocks = { this.props.blocks }
         onEdit = { this.handleEditClicked }
         onDelete = { this.handleDeleteClicked }
         users = { this.props.users }
        />   */}

      </div>

    </div> 

    );
  }

}
 
const mapStateToProps = state => {
 
  return {

    users: state.usersReducer.users,
    blocks: state.blocksReducer.blocks,
    userId: state.usersReducer.userId,
    selectedBlock: state.blocksReducer.selectedBlock,
     
  }
 
}
 
export default connect(mapStateToProps)(Dashboard);

 