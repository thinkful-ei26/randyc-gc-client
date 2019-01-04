//
import React from 'react';
import { formatDate } from '../utils/date';

 

export default function Display(props) {

  //console.log('props in Display... ',props);
  
  // const newDay = props.setDay;

console.log('newDay ? ',props.setDay);


  //show users -- testing API
  const showUsersAndIds = props.users.map((user,index) => {

    return (

      <li>
        Users: { user.name } ... Id: { user._id }
      </li>
 
    )
 
  })

  const showBlocksAndIds = props.blocks.map((block,index) => {

    return (

      <li>
        user id: { block.userRef} <br/>
        block id: { block._id } <br/>
        start date: { formatDate(block.startDate)} <br/>
        end date: { formatDate(block.endDate)} <br/>
        <button onClick={() =>{props.onDelete(block._id)}} >DELETE</button><br/>...<br/>
      </li>


    )


  })



  return (
  <div>

    <ul>
     { showUsersAndIds }
    </ul>

    <h3>Block testing...</h3>
    <ul>
      { showBlocksAndIds }
    </ul>
    
  </div>

  )
 
}