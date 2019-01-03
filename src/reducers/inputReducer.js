//


import {

  SET_START_DAY, SET_END_DAY
 
} from '../actions/actions-input';


import moment from 'moment';//for datePicker
const formatMonthDay = date => moment(date).format("MMMM Do YYYY");
const formatTime = date => moment(date).format("HH:mm a");

const initialState = {

  inputDay: 'test date',
  dayOfTheWeek: 'test day of the week',
  inputStartTime: 'test start time',
  inputEndTime: 'test end time',
  error: null

}

export function inputReducer(state=initialState,action){
 
  //SET the start day and time...
  if(action.type === SET_START_DAY){

    const justDay = formatMonthDay(action.day);
    const dayNumber = action.day.getDay();
    let theDay = '';

    const justStartTime = formatTime(action.day);

    // Sunday - Saturday : 0 - 6
    if(dayNumber === 0){ theDay = 'Sunday';}
    if(dayNumber === 1){ theDay = 'Monday';}
    if(dayNumber === 2){ theDay = 'Tuesday';}
    if(dayNumber === 3){ theDay = 'Wednesday';}
    if(dayNumber === 4){ theDay = 'Thursday';}
    if(dayNumber === 5){ theDay = 'Friday';}
    if(dayNumber === 6){ theDay = 'Saturday';}
 

    //console.log('just day: ',justDay);

    //console.log('action set_day in reducer: ', action.day);

    return Object.assign({}, state, {
      
      inputDay: justDay,
      dayOfTheWeek: theDay,
      inputStartTime: justStartTime,
       
    })

  }

  //SET the end time...
  if(action.type === SET_END_DAY){

    const justDay = formatMonthDay(action.day);
    const dayNumber = action.day.getDay();
    let theDay = '';

    const justEndTime = formatTime(action.day);

    // Sunday - Saturday : 0 - 6
    if(dayNumber === 0){ theDay = 'Sunday';}
    if(dayNumber === 1){ theDay = 'Monday';}
    if(dayNumber === 2){ theDay = 'Tuesday';}
    if(dayNumber === 3){ theDay = 'Wednesday';}
    if(dayNumber === 4){ theDay = 'Thursday';}
    if(dayNumber === 5){ theDay = 'Friday';}
    if(dayNumber === 6){ theDay = 'Saturday';}
 

    //console.log('just day: ',justDay);

    //console.log('action set_day in reducer: ', action.day);

    return Object.assign({}, state, {
      
      inputDay: justDay,
      dayOfTheWeek: theDay,
      inputEndTime: justEndTime,
       
    })

  }

  


  return state;

}