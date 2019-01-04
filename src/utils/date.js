
import moment from 'moment';


export const formatDate = date => moment(date).format("dddd MMMM Do YYYY");//this gets the date object

export const formatTime = date => moment(date).format("h:mm:ss a");// 