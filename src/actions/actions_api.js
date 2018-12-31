import { API_BASE_URL } from '../config';

//async action that gets days

//FETCH_DAYS_REQUEST

//FETCH_DAYS_SUCCESS

//FETCH_DAYS_ERROR

export const FETCH_DAYS_REQUEST = 'FETCH_DAYS_REQUEST';
export const fetchDaysRequest = () => {

  return(dispatch) => {
    fetch(`${API_BASE_URL}/days`)
    .then(response => response.json())
    .then(data => dispatch(fetchDaysSuccess(data)))
    .catch(error => console.log(error))
 
  }
 
}

export const FETCH_DAYS_SUCCESS = 'FETCH_DAYS_SUCCESS';
export const fetchDaysSuccess = (data) => {

  console.log('>> days >>',data);

  return {

    type: 'FETCH_DAYS_SUCCESS',
    data

  }


}

export const FETCH_DAYS_ERROR = 'FETCH_DAYS_ERROR';
export const fetchDaysError = (error) => {

  return {

    type: 'FETCH_DAYS_ERROR',
    error

  }


}