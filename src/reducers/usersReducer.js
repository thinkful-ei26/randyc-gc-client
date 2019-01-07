//

import {

  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR
 
} from '../actions/actions-users-api';

const initialState = {

  userId:'1234',
  users: [{

    _id: 'test _id',
    name: 'test User'
 
  }],
  loading:false,
  error: null
 
}

//
//export function usersReducer(state=initialState,action) {

export function usersReducer(state=initialState,action){

  if(action.type === FETCH_USERS_REQUEST){

    return Object.assign({}, state, {

      loading : true

    })

  }

  if(action.type === FETCH_USERS_SUCCESS){
 

    return Object.assign({}, state, {

      users: [...state.users, ...action.data],
      loading : false

    })


  }

  if(action.type === FETCH_USERS_ERROR){

    return Object.assign({}, state, {

      loading : false,
      error : action.error

    })


  }


//Default return state
return state;


}
 