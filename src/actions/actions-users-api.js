import { API_BASE_URL } from '../config';

//async actions to work with users API
 
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const fetchUsersRequest = () => {

  return(dispatch) => {
    fetch(`${API_BASE_URL}/users/get`)
    .then((response) => {
      
      //console.log('this is it >>> ',response.json());
      return response.json();
      
    })
    .then(data => dispatch(fetchUsersSuccess(data)))
    .catch(error => console.log(error))
 
  }
 
}

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const fetchUsersSuccess = (data) => {

   

  return {

    type: 'FETCH_USERS_SUCCESS',
    data

  }
 
}

export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';
export const fetchUsersError = (error) => {

  return {

    type: 'FETCH_USERS_ERROR',
    error

  }


}