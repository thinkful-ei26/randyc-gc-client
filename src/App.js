import React, { Component } from 'react';
import moment from 'moment';//for datePicker

import { connect } from 'react-redux';
//import logo from './logo.svg';
import './App.css';
import Display from './components/display';
import DateInput from './components/date-input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//Actions
import { fetchUsersRequest, fetchUsersSuccess, fetchUsersError } from './actions/actions-users-api';
import { fetchBlocksRequest, fetchBlocksSuccess, fetchBlocksError } from './actions/actions-blocks-api';
import { setDay } from './actions/actions-input';

//date stuff
const formatDate = date => moment(date).format("MMMM Do YYYY, h:mm:ss a");//this gets the date object
const formatMonthDay = date => moment(date).format("MMMM Do YYYY");

class App extends Component {

  componentDidMount(){

    this.props.dispatch(fetchUsersRequest());
    this.props.dispatch(fetchBlocksRequest());
 
 }

 //test day select -- test
 handleDaySelect = day => {
 
  console.log('this is the day selector> ',formatMonthDay(day));

  this.props.dispatch(setDay(formatMonthDay(day)));
   
};
  
  render() {

    console.log('current available props >> ', this.props);

    return (

      <div>
        <div className = "centerStuff" >
        <h3>Test... get all current Users & ids...</h3>
        {/* <div>here: { this.props.users }</div> */}
        
        <Display users = { this.props.users } blocks = { this.props.blocks } inputDay = { this.props.inputDay } />
        {/* <DateInput day = { this.props.blocks }/> */}
        <DatePicker
          todayButton={"Today"} 
          onSelect={ this.handleDaySelect } //when day is clicked
          dateFormat="MMMM d, yyyy h:mm aa"
          timeCaption="time"
        />

        {/* {this.props.inputDay} */}
          
       </div>
      </div>
      
    );
  }


}
 
//export default App;

const mapStateToProps = state => {

  console.log('state in App.js >>> ',state);

  return {

    users: state.usersReducer.users,
    blocks: state.blocksReducer.blocks,
    inputDay: state.inputReducer.inputDay

  }
 
}


export default connect(mapStateToProps)(App);

