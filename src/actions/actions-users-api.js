import { API_BASE_URL } from '../config';

//async actions to work with users API
 
//GET ALL USERS -- TESTING
//GET ONE USER BY ID
export const FETCH_USER_REQUEST = 'FETCH_USERS_REQUEST';
export const fetchUserRequest = () => {
 
  return(dispatch,getState) => {

    let id = getState().auth.currentUser.id;

    //console.log(getState().auth.currentUser.id);

    fetch(`${API_BASE_URL}/users/getUser/${id}`)
    .then((response) => {
      
      //console.log('this is it >>> ',response.json());
      return response.json();
      
    })
    .then(data => dispatch(fetchUserSuccess(data)))
    .catch(error => console.log(error))
 
  }
 
}

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const fetchUserSuccess = (data) => {

   

  return {

    type: 'FETCH_USER_SUCCESS',
    data

  }
 
}

export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const fetchUserError = (error) => {

  return {

    type: 'FETCH_USER_ERROR',
    error

  }


}



//POST NEW USER
export const POST_USER_REQUEST ='POST_USER_REQUEST';
export const postUserRequest = (userInfo) => (dispatch,getState) => {

  return fetch(`${API_BASE_URL}/api/users/post`, {

    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {

      'content-type' : 'application/json'

    }
 
  })
  .then(res => res.json())
  // .then(data => console.log('data>>',data,'userinfo>>',userInfo))
  .then(data => dispatch(postUserSuccess(data)))
  .catch(error => console.log(error))


}

export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const postUserSuccess = (data) => {

  console.log('newUser? ',data);

  return {

    type: 'POST_USER_SUCCESS',
    data

  }



}



export const POST_USER_ERROR = 'POST_USER_ERROR';
export const postUserError = (error) => {

  return {

    type: 'POST_USER_ERROR',
    error

  }



}