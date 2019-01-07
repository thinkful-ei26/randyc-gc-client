import React from 'react';
import {Link, Redirect} from 'react-router-dom';

export default function Navbar(props) {

  return(

    <div>
      <Link to="/dashboard"><button >MY SCHEDULE</button></Link>
       
      <button>COMPARE SCHEDULE</button>
      
      <Link to="/"><button>HOME</button></Link>
    </div>
  
  )


}