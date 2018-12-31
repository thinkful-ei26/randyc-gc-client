//

import {

  FETCH_DAYS_REQUEST,
  FETCH_DAYS_SUCCESS,
  FETCH_DAYS_ERROR
 
} from '../actions/actions_api';

const initialState = {

  days: [],
  loading:false,
  error: null
 
}

export function daysReducer(state=initialState,action) {

  if(action.type === FETCH_DAYS_REQUEST){

    return Object.assign({}, state, {

      loading : true


    })

  }

  if(action.type === FETCH_DAYS_SUCCESS){

    return Object.assign({}, state, {

      days: action.data.days,
      loading : false

    })


  }

  if(action.type === FETCH_DAYS_ERROR){

    return Object.assign({}, state, {

      loading : false,
      error : action.error

    })


  }


//Default return state
return state;


}

