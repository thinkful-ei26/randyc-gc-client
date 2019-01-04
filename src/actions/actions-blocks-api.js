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
export const postBlockRequest = (obj) => (dispatch,getState) => {

  console.log('post block request!', getState().usersReducer.userId);
 
  obj.userRef = getState().usersReducer.userId;

return fetch(`${API_BASE_URL}/blocks/post`, {

    method: 'POST',
    body: JSON.stringify(obj),
    headers: {

      'content-type' : 'application/json'

    }
 
  })
  .then(res => res.json())
  .then(data => dispatch(postBlockSuccess(data)))
  .catch(error => console.log(error))
   
}//
  
export const POST_BLOCK_SUCCESS = 'POST_BLOCK_SUCCESS';
export const postBlockSuccess = (data) => {

  console.log('post block!');

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


//DELETE a block 
export const DELETE_BLOCK_REQUEST = 'DELETE_BLOCK_REQUEST';
export const deleteBlockRequest = (blockid) => (dispatch) => {

  return fetch(`${API_BASE_URL}/blocks/delete/${blockid}`, {

    method: 'DELETE',
    headers: {

      'content-type' : 'application/json'

    }
     
  })
  .then(() => dispatch(deleteBlockSuccess(blockid)))
  .catch(error => console.log(error))


}//

export const DELETE_BLOCK_SUCCESS = 'DELETE_BLOCK_SUCCESS';
export const deleteBlockSuccess = (blockid) => {

  console.log('delete success');

  return {

    type: 'DELETE_BLOCK_SUCCESS',
    blockid

  }


}


