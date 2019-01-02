import { API_BASE_URL } from '../config';

//async actions to work with blocks API

export const FETCH_BLOCKS_REQUEST = 'FETCH_BLOCKS_REQUEST';
export const fetchBlocksRequest = () => {

  return(dispatch) => {
    fetch(`${API_BASE_URL}/blocks/get`)
      .then((response)=>{

        return response.json();
 
      })
      .then(data => dispatch(fetchBlocksSuccess(data)))
      .catch(error => console.log(error))
 
  }



}

export const FETCH_BLOCKS_SUCCESS = 'FETCH_BLOCKS_SUCCESS';
export const fetchBlocksSuccess = (data) => {

  return {

    type: 'FETCH_BLOCKS_SUCCESS',
    data
 
  }
 
}

export const FETCH_BLOCKS_ERROR = 'FETCH_BLOCKS_ERROR';
export const fetchBlocksError = (error) => {

  return {

    type: 'FETCH_BLOCKS_ERROR',
    error
 
  }
 
}