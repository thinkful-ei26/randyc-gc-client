
//START DAY TIME
export const SET_START_DAY = 'SET_START_DAY';
export const setStartDay = (day) => {

  return {

    type: SET_START_DAY,
    day
 
  }

}

//END DAY TIME
export const SET_END_DAY = 'SET_END_DAY';
export const setEndDay = (day) => {

  return {

    type: SET_END_DAY,
    day
 
  }

}