import React from 'react';
import { formatDate, formatTime } from '../utils/date';
import {connect} from 'react-redux';
 

export class SelectedInput extends React.Component {

  render(){

    return(

      <div>here{this.props.startDate}</div>

    )
 

  }
   
};

const mapStateToProps = state => {

  return {

    

  }

}


export default connect(mapStateToProps)(SelectedInput);