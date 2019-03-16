import React from 'react';
import {connect} from 'react-redux';
import 'fullcalendar/dist/fullcalendar.js';
import 'fullcalendar/dist/fullcalendar.css';
import ShowCalendar from '../components/showcalendar';
import HeaderBar from '../components/header-bar'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
 
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
     
    //for local state to show in selected fields
    this.props.blocks.find(block => {
  
      if(justBlockId === block._id){
          editStartTime = block.startDate;
          editEndTime = block.endDate;
          editBlockId = block._id;
      }

      return 'hello'
   
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

    

    if(window.confirm('End time must be after start time...')){

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

    const sideBarContent = 
          <div className='SideBarContainer'>
              <p className='SideBarText'><b>{ this.state.modeMessage }</b></p>
              <ul className='SideBarList'>
                <li >Current user: <b>{this.props.usernameAuth}</b></li>
                <li >Selected day is: <b>{formatDate(this.state.startDate)}</b></li>
                <li >Start time is: <b>{formatTime(this.state.startDate)}</b></li>
                <li >End time is: <b>{formatTime(this.state.endDate)}</b></li>
              </ul>
              <p className='SideBarText'><b>START</b>Month/Day:</p>  
              <div className="DayPickerContainer">
                <DatePicker
                  className='SideBarText'
                  todayButton={'Today'} 
                  selected={this.state.startDate}
                  onChange={this.handleStartSelect}
                  placeholderText='Select a START Day'
                  width={'50px'}
                  dateFormat='MMMM d'
                />
                <p className='SideBarText'><b>START</b> time for block:</p>  
                <DatePicker
                  className='SideBarText'
                  selected={this.state.startDate}
                  onChange={this.handleStartSelect}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  width={'50px'}
                  dateFormat="h:mm aa"
                  timeCaption="Time"
                  placeholderText='Select a START Time'
                />
                <p className='SideBarText'><b>END</b> time for block:</p>  
                <DatePicker
                  className='SideBarText'
                  selected={this.state.endDate}
                  onChange={this.handleEndSelect}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  width={'50px'}
                  dateFormat="h:mm aa"
                  timeCaption="Time"
                  placeholderText='Select an END Time'
                />
                <br/>
              </div>
              <div>
              <br/>
              
              <button className='ButtonStyle' onClick={ this.handleSaveButton }>{this.state.buttonOneLabel}</button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button className='ButtonStyle' onClick={ this.handleDeleteClicked }>{this.state.buttonTwoLabel}</button>
              </div>
              <br/>
              <br/>
            </div>
    ;
     
    const calendarContent = 
          <div id= "calendar" className ='CalendarContainer' >
            <ShowCalendar startDate={this.state.startDate} rawEvents = {transformedEvents}/>
          </div>
    ;
    

   const mainContent = <div className='MainContainer'>{calendarContent}{sideBarContent}</div>;
   
    return (
 
        <div className = "basic">
          <HeaderBar/>
          <div className='MainContainer'>
            {mainContent} 
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

 