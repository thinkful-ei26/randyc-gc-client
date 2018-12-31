//
import React from 'react';

export default function Display(props) {

  const showDays = props.days.map((days,index) => {

    return (

      <li>
        { props.days[index] }
      </li>



    )
 
  })

  return (

    <ul>
      { showDays }
    </ul>


  )
 
}