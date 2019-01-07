import React from 'react';
import {connect} from 'react-redux';

import moment from 'moment';//for datePicker

import 'fullcalendar/dist/fullcalendar.js';
import 'fullcalendar/dist/fullcalendar.css';
import FullCalendar from 'fullcalendar-reactwrapper';
 
export class ShowCalendar extends React.Component {

  constructor(props) {

    super(props);

      this.state = {







      }


    }



  //On click it puts the event info into the event form
  handleEventClick = event => {

    console.log('start time:',event.start);
    console.log('end time:',event.end);
    console.log('id:',event._id);






 
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
        defaultDate={'2019-01-01'}
        navLinks= {true} // can click day/week names to navigate views
        editable= {true}
        eventLimit= {true} // allow "more" link when too many events
        events = {this.props.rawEvents}
        eventClick = {(e) => {this.handleEventClick(e)}}
      />
      	
      </div>
 
    );


  }

}