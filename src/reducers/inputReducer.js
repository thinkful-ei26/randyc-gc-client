//

import {

  SET_DAY
 
} from '../actions/actions-input';

const initialState = {

  inputDay: 'test date',
  inputStartDate: '',
  inputEndDate: '',
  error: null

}

export function inputReducer(state=initialState,action){
 
  if(action.type === SET_DAY){

    console.log('action set_day in reducer: ', action.day);

    return Object.assign({}, state, {
      
      inputDay: action.day
 
    })

  }

  return state;

}