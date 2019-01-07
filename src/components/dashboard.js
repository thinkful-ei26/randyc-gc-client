import React from 'react';
import {connect} from 'react-redux';

import moment from 'moment';//for datePicker
 
import 'fullcalendar/dist/fullcalendar.js';
import 'fullcalendar/dist/fullcalendar.css';
import goodcall from '../goodcall_image.png';

import { ShowCalendar } from '../components/showcalendar'

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
    buttonLabel: 'SAVE',
    startDate : new Date(),
    endDate : new Date(),
    captureBlockId: null
     

  }

}

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

  //   //map the blocks stuff to new array....

    let calendarEvents = [];

    console.log('blocks',this.props.blocks);

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

  

    return (

      <div >
        
        <div className = 'basic'>

          <Navbar/>

          <div id= "calendar" className ='adjustCalendar' >
            <ShowCalendar 
            
            rawEvents = {calendarEvents}	
            >
            </ShowCalendar>
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
       <button onClick= { this.handleSaveButton }>{this.state.buttonLabel}</button>
          <br/>
          <br/>
        <hr/>
        

       
       
      <p>Testing: get all current Users, Blocks & ids...</p>
        
        <Display
         blocks = { this.props.blocks }
         onEdit = { this.handleEditClicked }
         onDelete = { this.handleDeleteClicked }
         users = { this.props.users }
        />  

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


export default connect(mapStateToProps)(Dashboard);