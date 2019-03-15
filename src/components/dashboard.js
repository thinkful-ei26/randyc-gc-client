import React from 'react';
import {connect} from 'react-redux';
import 'fullcalendar/dist/fullcalendar.js';
import 'fullcalendar/dist/fullcalendar.css';
import ShowCalendar from '../components/showcalendar';
import HeaderBar from '../components/header-bar'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//Actions
// import { fetchProtectedData } from '../actions/protected-data';
// import { fetchUserRequest } from '../actions/actions-users-api';

import
 { fetchBlocksRequest,postBlockRequest,putBlockRequest,deleteBlockRequest } from '../actions/actions-blocks-api';

import { formatDate, formatTime, formatFullCalendar } from '../utils/date';

  

export class Dashboard extends React.Component {

  constructor(props) {

    super(props);

  //local state... for user input
  this.state = {

    mode: 'ADD',
    modeMessage: 'SET YOUR GOOD TIMES',
    buttonOneLabel: 'SAVE',
    buttonTwoLabel: 'RESET',
    startDate : null,
    endDate : null,
    captureBlockId: null,
    calendarEvents: []
      

  }

}

//Initiate getting users & blocks from db
componentDidMount(){

  this.props.dispatch(fetchBlocksRequest());
 
}

componentDidUpdate(prevProps){
  
const selectById = this.props.selectedBlock;
if(selectById === null && this.state.mode === 'EDIT'){
 
    this.setState({
 
      mode: 'ADD',
      modeMessage: 'ADD A NEW TIME BLOCK',
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
      modeMessage: 'EDIT A TIME BLOCK',
      buttonOneLabel: 'SAVE YOUR EDIT',
      buttonTwoLabel: 'DELETE TIME BLOCK',
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
 

  this.setState({
 
      mode: 'ADD',
      modeMessage: 'ADD A NEW TIME BLOCK',
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
      modeMessage: 'ADD A NEW TIME BLOCK',
      buttonOneLabel: 'SAVE',
      buttonTwoLabel: 'RESET',
      startDate : null,
      endDate : null,
      captureBlockId: null
    
    })


  }

  //DELETE BLOCK
  if(this.state.mode === 'EDIT'){

    if(window.confirm('Are you sure?')){
  
      this.props.dispatch(deleteBlockRequest(this.state.captureBlockId));
  
    }

  }
 
   
}

  
render() {

    //map the blocks stuff to new array for calendar events....
    let transformedEvents = [];
 
    //Calendar events
    transformedEvents = this.props.blocks.map((block,index) => {

      return {

        _id: block._id,
        title: 'Good Time',
        start: formatFullCalendar(block.startDate),
        end: formatFullCalendar(block.endDate)

      }

    });

     
 
    return (
 
        <div className = "basic">
          <HeaderBar/>
          <div className='MainContainer'>
            <div className='SideBarMenu'>
              <div className='SideBarText'>
              <h3> { this.state.modeMessage } </h3>
              <ul>
              <li>The current user: {this.props.usernameAuth}</li>
              <li>The selected day is {formatDate(this.state.startDate)}</li>
              <li>The start time is: {formatTime(this.state.startDate)}</li>
              <li>The end time is: {formatTime(this.state.endDate)}</li>
            </ul>
              <br/>
          
              Select Start Month/Day: 
              <div className="adjustDayPicker">
            <DatePicker
              className={'SideBarText'}
              todayButton={"Today"} 
              selected={ this.state.startDate }
              onChange={this.handleStartSelect}
              placeholderText="Select a start Day"
              width={'50px'}
              dateFormat="MMMM d, yyyy"
              
            />
            </div>
         
              Select Start time for block: 
              <DatePicker
              className={'SideBarText'}
              selected={this.state.startDate}
              onChange={this.handleStartSelect}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              timeCaption="Time"
              />
              <br/> 
              Select End time for block:
              <DatePicker
              className={'SideBarText'}
              onChange={this.handleEndSelect}
              selected={this.state.endDate}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              timeCaption="Time"
              />
         
              <br/>
              <button className='FormStyle' onClick={ this.handleSaveButton }>{this.state.buttonOneLabel}</button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button className='FormStyle' onClick={ this.handleDeleteClicked }>{this.state.buttonTwoLabel}</button>
              <br/>
              <br/>
        
            </div>
            </div>
            <div id= "calendar" className ='CalendarContainer' >
              <ShowCalendar startDate={this.state.startDate} rawEvents = {transformedEvents}/>
            </div>
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
    username: state.usersReducer.username,
    selectedBlock: state.blocksReducer.selectedBlock,
    usernameAuth: state.auth.currentUser.username
     
  }
 
}
 
export default connect(mapStateToProps)(Dashboard);

 