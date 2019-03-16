
import moment from 'moment';


export const formatDate = date => { 
  
  if(date === null){
    
    return "ready to be set";
  
  }

  return moment(date).format("ddd  MMM  Do ");
 

}//this gets the date object

export const formatTime = date => { 
  
  if(date === null){
    
    return "ready to be set";
  
  }

  return moment(date).format("h:mm:ss a");

}// 

export const formatFullCalendar = date => {

  if(date === null){
    
    return "ready to be set";
  
  }

  return moment(date).format("YYYY-MM-DDThh:mm");

}