import React from 'react';
import {connect} from 'react-redux';

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
        themeSystem= 'bootstrap4'
        defaultDate={this.props.startDate}
        navLinks= {true} // can click day/week names to navigate views
        editable= {false}
        eventLimit= {true} // allow "more" link when too many events
        events = {this.props.rawEvents}
        eventClick = {(e) => {this.handleEventClick(e)}}
        // width= {60}
        // height= {100}
        size= {50} 
        // eventAfterAllRender = {

        //   function(view){
        //     if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //        FullCalendar('changeView', 'agendaDay');
        //     }
        //   }

        // }
         
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