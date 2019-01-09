//
import React from 'react';
import { formatDate, formatTime } from '../utils/date';

 

export default function Display(props) {


//show users -- testing API
const showUsersAndIds = props.users.map((user,index) => {

  if(user.firstName){

    return (

      <li key={index}>
        Users: { user.firstName } ... Id: { user._id }
      </li>
 
    )
 
  }

  return '';

})

const showBlocksAndIds = props.blocks.map((block,index) => {
    
    
      if(block.userRef){

       
      return (

        <li key={index}>
          user id: { block.userRef} <br/>
          block id: { block._id } <br/>
          start date: { formatDate(block.startDate)} <br/>
          end date: { formatDate(block.endDate)} <br/>
          block is from: {formatTime(block.startDate)} - {formatTime(block.endDate)} <br/>
          {/* <button onClick={() => {props.onEdit(block._id)}}>EDIT</button> ... <button onClick={() =>{props.onDelete(block._id)}} >DELETE</button> */}
          <br/>...<br/>
        </li>
  
  
      )
 

      }

      return '';
      
  })



return (
  <div>

    

    <p>Blocks:</p>
    <ul className = 'blocksList'>
      { showBlocksAndIds }
    </ul>

    
    <ul className = 'blocksList'>Users:
     { showUsersAndIds }
    </ul>
    
  </div>

  )
 
}