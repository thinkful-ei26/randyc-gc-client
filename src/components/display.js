//
import React from 'react';

export default function Display(props) {

  const showUsers = props.users.map((users,index) => {

    return (

      <li>
        {props.users[index]}
      </li>



    )
 
  })

  return (

    <ul>
      { showUsers }
    </ul>


  )
 
}