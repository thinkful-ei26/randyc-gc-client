import React from 'react';
import {connect} from 'react-redux';

import moment from 'moment';//for datePicker

import 'fullcalendar/dist/fullcalendar.js';
import 'fullcalendar/dist/fullcalendar.css';
import FullCalendar from 'fullcalendar-reactwrapper';
import { selectBlock } from '../actions/actions-blocks-api';
 
export class ShowCalendar extends React.Component {

  
  //On click it puts the event info into the event form
  handleEventClick = event => {
    
    const transfer = {
      
      selectedBlock: event._id
       
    };
 
    console.log('block id', transfer);
     
    this.props.dispatch(selectBlock(transfer));
 
 
  } 

  render() {
    

    return(

      <div id="calendar-component">
        <FullCalendar
         id = "theCalendar"
         header = {{
            left: 'prev,next today myCustomButton',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        }}
        defaultDate={this.props.startDate}
        navLinks= {true} // can click day/week names to navigate views
        editable= {false}
        eventLimit= {true} // allow "more" link when too many events
        events = {this.props.rawEvents}
        eventClick = {(e) => {this.handleEventClick(e)}}
         
      />
      	
        
      </div>
 
    );


  }

}



const mapStateToProps = state => {

  return {

    

  }

}


export default connect(mapStateToProps)(ShowCalendar);