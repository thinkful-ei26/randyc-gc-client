import React from 'react';
import {connect} from 'react-redux';

import 'fullcalendar/dist/fullcalendar.js';
import 'fullcalendar/dist/fullcalendar.css';
import FullCalendar from 'fullcalendar-reactwrapper';
  
export class ShowCalendar extends React.Component {
  
  render() {
    
    return(

      // <div id="calendar-component">
        <FullCalendar
         id = "theCalendar"
         header = {{
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          }}
          themeSystem= 'standard'
          defaultDate={this.props.startDate}
          navLinks= {true} // can click day/week names to navigate views
          editable= {false}
          eventLimit= {true} // allow "more" link when too many events
          events = {this.props.rawEvents}
          eventClick = {(e) => {this.props.handleEventClick(e)}}
          eventColor ={'rgb(33, 55, 156)'}
          fontSize={'auto'}
          // size={'auto'}
          // width={'auto'}
          // height={'auto'}
        // height= {550}
        // size= {'50%'} 
        //   eventAfterAllRender = {

        //   function(view){
        //     if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //        FullCalendar('changeView', 'agendaDay');
        //     }
        //   }

        // }
         
      />
      	
        
      // </div>
 
    );


  }

}



const mapStateToProps = state => {

  return {

    

  }

}


export default connect(mapStateToProps)(ShowCalendar);