import React from 'react';
import {connect} from 'react-redux';
import 'fullcalendar/dist/fullcalendar.js';
import 'fullcalendar/dist/fullcalendar.css';
import ShowCalendar from '../components/showcalendar';
import HeaderBar from '../components/header-bar'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { selectBlock } from '../actions/actions-blocks-api';
 
import
 { fetchBlocksRequest,postBlockRequest,putBlockRequest,deleteBlockRequest } from '../actions/actions-blocks-api';

import { formatDate, formatTime, formatFullCalendar } from '../utils/date';
 

export class Dashboard extends React.Component {

  constructor(props) {

    super(props);

  //local state... for user input
  this.state = {

    mode: 'ADD',
    modeMessage: 'ADD TIME BLOCK',
    buttonOneLabel: 'SAVE',
    buttonTwoLabel: 'RESET',
    startDate : new Date(),
    endDate : new Date(),
    captureBlockId: null,
    calendarEvents: []
     
  }

  this.handleEventClick = this.handleEventClick.bind(this);

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
        modeMessage: 'ADD TIME BLOCK',
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
      //const findObject = this.props.blocks.map((block) => {
      this.props.blocks.find((block) => {
    
        if(justBlockId === block._id){
  
          editStartTime = block.startDate;
          editEndTime = block.endDate;
          editBlockId = block._id;
  
        }

        return null;
     
      });
   
  
      this.setState({
  
        mode: 'EDIT',
        modeMessage: 'EDIT TIME BLOCK',
        buttonOneLabel: 'SAVE EDIT',
        buttonTwoLabel: 'DELETE BLOCK',
        startDate : editStartTime,
        endDate : editEndTime,
        captureBlockId: editBlockId 
       
      })
  
    }
   
    
  };
   
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
        modeMessage: 'ADD TIME BLOCK',
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
        modeMessage: 'ADD TIME BLOCK',
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
  
  //On click it puts the event info into the event form
  handleEventClick = event => {
    
    const transfer = {
      
      selectedBlock: event._id
       
    };
  
    this.props.dispatch(selectBlock(transfer));
 
  } 
    
  


 
/* REF

//Initiate getting users & blocks from db
componentDidMount(){

  this.props.dispatch(fetchBlocksRequest());
 
}

componentDidUpdate(prevProps){
  
  const selectById = this.props.selectedBlock;
  console.log('dashboard selectedBlock: ',selectById);

  //change mode back to ADD mode after EDIT is complete
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
   
  //EDIT A BLOCK
  if(selectById !== null && this.state.mode === 'EDIT'){
   
      let justBlockId = selectById.selectedBlock;
   
      let editStartTime;
      let editEndTime;
      let editBlockId;
       
      //for local state to populate selection fields
      this.props.blocks.find(block => {
    
        if(justBlockId === block._id){

            console.log('matching block to edit: ',block);

            editStartTime = block.startDate;
            editEndTime = block.endDate;
            editBlockId = block._id;
        }

        return null;
    
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

//On click it puts the event info into the event form
handleEventClick = event => {
  
  console.log('full event: ', event);
  console.log('event._id: ', event._id);
  console.log('event.startDate: ', event.start);
  console.log('event.endDate: ', event.end);

  this.setState({
    mode: 'EDIT',
    // startDate : event.start,
    // endDate : event.end,
    // modeMessage: 'EDIT A TIME BLOCK',
    // buttonOneLabel: 'SAVE YOUR EDIT',
    // buttonTwoLabel: 'DELETE TIME BLOCK',
    // captureBlockId: event._id
  })
  
  this.props.dispatch(selectBlock(event._id));

};

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

    //console.log('Dashboard --> id to be deleted: ', this.state.captureBlockId);

    console.log('Dashboard --> id to be deleted: ', this.props.selectedBlock);
 
    if(window.confirm('Are you sure?')){
  
      this.props.dispatch(deleteBlockRequest(this.props.selectedBlock));
  
    }

  }
   
}

  


*/


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
            <ShowCalendar handleEventClick ={this.handleEventClick} startDate={this.state.startDate} rawEvents = {transformedEvents}/>
          </div>
    ;
    

   const mainContent = <div className='MainContainer'>{sideBarContent}{calendarContent}</div>;
   
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

 