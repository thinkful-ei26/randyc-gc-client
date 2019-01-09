//

import {

  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  POST_USER_REQUEST,
  POST_USER_SUCCESS,
  POST_USER_ERROR
 
} from '../actions/actions-users-api';

const initialState = {

  userName:null,
  userId:null,
  users: [],
  loading:false,
  error: null
 
}

 

export function usersReducer(state=initialState,action){

  //GET ALL 
  if(action.type === FETCH_USER_REQUEST){

    return Object.assign({}, state, {

      loading : true

    })

  }

  if(action.type === FETCH_USER_SUCCESS){
   
    return Object.assign({}, state, {

      userName: action.data.firstName,
      userId: action.data._id,
      users: [action.data],
      loading : false

    })


  }

  if(action.type === FETCH_USER_ERROR){

    return Object.assign({}, state, {

      loading : false,
      error : action.error

    })


  }

   
  //POST USER 
  if(action.type === POST_USER_REQUEST) {

    return Object.assign({}, state, {

      loading: true


    })




  }

  if(action.type === POST_USER_SUCCESS) {
 
    return Object.assign({}, state, {

      userId: action.data.firstName,  
      users: [...state.users, action.data],
      loading: false


    })


  }

  if(action.type === POST_USER_ERROR) {

    Object.assign({}, state, {

      loading: false,
      error: action.error


    })

  }

//Default return state
return state;


}
 