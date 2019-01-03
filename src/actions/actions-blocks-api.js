import { API_BASE_URL } from '../config';

//async actions to work with blocks API

//GET all blocks -- testing  ******
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



//POST a block ******
export const POST_BLOCK_REQUEST = 'POST_BLOCK_REQUEST';
export const postBlock = () => {

  return(dispatch) => {
    fetch(`${API_BASE_URL}/blocks/post`)
    .then((response)=>{

      return response.json();
 
    })
    .then(data => dispatch(postBlockSuccess(data)))
    .catch(error => console.log(error))


  }


}

export const POST_BLOCK_SUCCESS = 'POST_BLOCK_SUCCESS';
export const postBlockSuccess = (data) => {

  return {

    type: 'POST_BLOCK_SUCCESS',
    data


  }
 
}


export const POST_BLOCK_ERROR = 'POST_BLOCK_ERROR';
export const postBlockError = (error) => {

  return {

    type: 'POST_BLOCK_ERROR',
    error
 
  }
 
}

